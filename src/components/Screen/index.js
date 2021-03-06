import { Component } from 'preact';
import Alert from '../Alert';
import Avatar from '../Avatar';
import ChatButton from '../ChatButton';
import Header from '../Header';
import Footer from '../Footer';
import Tooltip from '../Tooltip';
import { createClassName } from '../helpers';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import styles from './styles';
import { PopoverContainer } from '../Popover';


class ScreenHeader extends Component {
	handleRef = (ref) => {
		this.headerRef = ref;
	}

	largeHeader = () => {
		const { agent } = this.props;
		return !!(agent && agent.email && agent.phone);
	}

	render = ({
		theme,
		alerts,
		agent,
		title,
		notificationsEnabled,
		minimized,
		expanded,
		windowed,
		onDismissAlert,
		onEnableNotifications,
		onDisableNotifications,
		onMinimize,
		onRestore,
		onOpenWindow,
	}) => (
		<Header
			ref={this.handleRef}
			theme={theme}
			post={
				<Header.Post headerRef={this.headerRef}>
					{alerts && alerts.map((alert) => <Alert {...alert} onDismiss={onDismissAlert}>{alert.children}</Alert>)}
				</Header.Post>
			}
			large={this.largeHeader()}
		>
			{agent && agent.avatar && (
				<Header.Picture>
					<Avatar
						src={agent.avatar.src}
						description={agent.avatar.description}
						status={agent.status}
						large={this.largeHeader()}
						statusBorderColor={theme.color || '#175CC4'} // TODO: remove this hardcoded color code
					/>
				</Header.Picture>
			)}

			<Header.Content>
				<Header.Title>{agent ? agent.name : title}</Header.Title>
				{agent && (
					<Header.SubTitle>{agent.email}</Header.SubTitle>
				)}
				{agent && agent.phone && (
					<Header.CustomField>{agent.phone}</Header.CustomField>
				)}
			</Header.Content>
			<Tooltip.Container>
				<Header.Actions>
					<Header.Action
						aria-label={notificationsEnabled ? I18n.t('Disable notifications') : I18n.t('Enable notifications')}
						onClick={notificationsEnabled ? onDisableNotifications : onEnableNotifications}
					>
						<Tooltip.Trigger content={notificationsEnabled ? I18n.t('Sound is on') : I18n.t('Sound is off')}>
							{notificationsEnabled ?
								<NotificationsEnabledIcon width={20} /> :
								<NotificationsDisabledIcon width={20} />
							}
						</Tooltip.Trigger>
					</Header.Action>
					{(expanded || !windowed) && (
						<Header.Action
							aria-label={minimized ? I18n.t('Restore') : I18n.t('Minimize')}
							onClick={minimized ? onRestore : onMinimize}
						>
							<Tooltip.Trigger content={I18n.t('Minimize chat')}>
								{minimized ?
									<RestoreIcon width={20} /> :
									<MinimizeIcon width={20} />
								}
							</Tooltip.Trigger>
						</Header.Action>
					)}
					{(!expanded && !windowed) && (
						<Header.Action aria-label={I18n.t('Open in a new window')} onClick={onOpenWindow}>
							<Tooltip.Trigger content={I18n.t('Expand chat')}>
								<OpenWindowIcon width={20} />
							</Tooltip.Trigger>
						</Header.Action>
					)}
				</Header.Actions>
			</Tooltip.Container>
		</Header>
	)
}


const ScreenFooter = ({
	footer,
	options,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
	<Footer>
		{footer && (
			<Footer.Content>
				{footer}
			</Footer.Content>
		)}
		<Footer.Content>
			{options && (
				<Footer.Options
					onChangeDepartment={onChangeDepartment}
					onFinishChat={onFinishChat}
					onRemoveUserData={onRemoveUserData}
				/>
			)}
			<Footer.PoweredBy />
		</Footer.Content>
	</Footer>
);


const ScreenInner = ({
	theme,
	agent,
	title,
	notificationsEnabled,
	minimized,
	expanded,
	windowed,
	nopadding,
	children,
	footer,
	options,
	className,
	alerts,
	modal,
	onDismissAlert,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
	<div className={createClassName(styles, 'screen__inner', {}, [className])}>
		<PopoverContainer>
			<ScreenHeader
				theme={theme}
				alerts={alerts}
				agent={agent}
				title={title}
				notificationsEnabled={notificationsEnabled}
				minimized={minimized}
				expanded={expanded}
				windowed={windowed}
				onDismissAlert={onDismissAlert}
				onEnableNotifications={onEnableNotifications}
				onDisableNotifications={onDisableNotifications}
				onMinimize={onMinimize}
				onRestore={onRestore}
				onOpenWindow={onOpenWindow}
			/>

			<main className={createClassName(styles, 'screen__main', { nopadding })}>
				{children}
			</main>

			{modal}

			<ScreenFooter
				footer={footer}
				options={options}
				onChangeDepartment={onChangeDepartment}
				onFinishChat={onFinishChat}
				onRemoveUserData={onRemoveUserData}
			/>
		</PopoverContainer>
	</div>
);


export const Screen = ({
	theme = {},
	agent,
	title,
	notificationsEnabled,
	minimized = false,
	expanded = false,
	windowed = false,
	nopadding = false,
	children,
	footer,
	options,
	className,
	alerts,
	modal,
	onDismissAlert,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	onChangeDepartment,
	onFinishChat,
	onRemoveUserData,
}) => (
	<div className={createClassName(styles, 'screen', { minimized, expanded, windowed })}>
		<ScreenInner
			theme={theme}
			agent={agent}
			title={title}
			notificationsEnabled={notificationsEnabled}
			minimized={minimized}
			expanded={expanded}
			windowed={windowed}
			nopadding={nopadding}
			children={children}
			footer={footer}
			options={options}
			className={className}
			alerts={alerts}
			modal={modal}
			onDismissAlert={onDismissAlert}
			onEnableNotifications={onEnableNotifications}
			onDisableNotifications={onDisableNotifications}
			onMinimize={onMinimize}
			onRestore={onRestore}
			onOpenWindow={onOpenWindow}
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
		/>

		<ChatButton
			open={!minimized}
			theme={theme}
			onClick={minimized ? onRestore : onMinimize}
			className={createClassName(styles, 'screen__chat-button')}
		/>
	</div>
);


export default Screen;
