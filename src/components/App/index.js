import { Component } from 'preact';
import { Router, route } from 'preact-router';
import queryString from 'query-string';
import { initializeLivechat } from '../../api';
import history from '../../history';
import { loadConfig } from '../../lib/main';
import CustomFields from '../../lib/customFields';
import Triggers from '../../lib/triggers';
import Hooks from '../../lib/hooks';
import { parentCall } from '../../lib/parentCall';
import userPresence from '../../lib/userPresence';
import Chat from '../../routes/Chat';
import LeaveMessage from '../../routes/LeaveMessage';
import ChatFinished from '../../routes/ChatFinished';
import SwitchDepartment from '../../routes/SwitchDepartment';
import GDPRAgreement from '../../routes/GDPRAgreement';
import Register from '../../routes/Register';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';


export class App extends Component {

	state = {
		initialized: false,
		windowed: false,
	}

	handleRoute = async() => {
		const {
			config: {
				settings: {
					registrationForm,
					nameFieldRegistrationForm,
					emailFieldRegistrationForm,
					forceAcceptDataProcessingConsent: gdprRequired,
				},
				online,
			},
			gdpr: {
				accepted: gdprAccepted,
			},
			triggered,
			user,
		} = this.props;

		if (gdprRequired && !gdprAccepted) {
			return route('/gdpr');
		}

		if (!online) {
			return route('/leave-message');
		}

		const showRegistrationForm = (
			(registrationForm && (nameFieldRegistrationForm || emailFieldRegistrationForm)) &&
			!triggered &&
			!(user && user.token)
		);

		if (showRegistrationForm) {
			return route('/register');
		}
	}

	handleTriggers() {
		const { config: { online, enabled } } = this.props;

		Triggers.enabled = online && enabled;

		if (online && enabled) {
			Triggers.init();
		}
	}

	handleEnableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: true } });
	}

	handleDisableNotifications = () => {
		const { dispatch, sound = {} } = this.props;
		dispatch({ sound: { ...sound, enabled: false } });
	}

	handleMinimize = () => {
		parentCall('minimizeWindow');
		const { dispatch } = this.props;
		dispatch({ minimized: true });
	}

	handleRestore = () => {
		parentCall('restoreWindow');
		const { dispatch } = this.props;
		dispatch({ minimized: false, undocked: false });
	}

	handleOpenWindow = () => {
		parentCall('openPopout');
		const { dispatch } = this.props;
		dispatch({ undocked: true });
	}

	handleDismissAlert = (id) => {
		const { dispatch, alerts = [] } = this.props;
		dispatch({ alerts: alerts.filter((alert) => alert.id !== id) });
	}

	async initialize() {
		const {
			serverUrl = process.env.NODE_ENV === 'development' && 'http://localhost:3000',
		} = queryString.parse(window.location.search);

		await initializeLivechat({ host: serverUrl, protocol: 'ddp' });
		await loadConfig();
		this.handleTriggers();
		CustomFields.init();
		Hooks.init();
		userPresence.init();

		this.setState({ initialized: true });
		parentCall('ready');

		const { minimized } = this.props;
		parentCall(minimized ? 'minimizeWindow' : 'restoreWindow');
	}

	async finalize() {
		CustomFields.reset();
		userPresence.reset();
	}

	componentWillMount() {
		const windowed = queryString.parse(window.location.search).mode === 'popout';
		this.setState({ windowed });
	}

	componentDidMount() {
		this.initialize();
	}

	componentWillUnmount() {
		this.finalize();
	}

	render = ({
		sound,
		undocked,
		minimized,
		alerts,
		modal,
	}, { initialized, windowed }) => {
		if (!initialized) {
			return null;
		}

		const screenProps = {
			notificationsEnabled: sound && sound.enabled,
			minimized: !windowed && (minimized || undocked),
			windowed,
			sound,
			alerts,
			modal,
			onEnableNotifications: this.handleEnableNotifications,
			onDisableNotifications: this.handleDisableNotifications,
			onMinimize: this.handleMinimize,
			onRestore: this.handleRestore,
			onOpenWindow: this.handleOpenWindow,
			onDismissAlert: this.handleDismissAlert,
		};

		return (
			<Router history={history} onChange={this.handleRoute}>
				<Chat default path="/" {...screenProps} />
				<Register path="/register" {...screenProps} />
				<LeaveMessage path="/leave-message" {...screenProps} />
				<GDPRAgreement path="/gdpr" {...screenProps} />
				<ChatFinished path="/chat-finished" {...screenProps} />
				<SwitchDepartment path="/switch-department" {...screenProps} />
			</Router>
		);
	}
}

const AppConnector = () => (
	<StoreProvider>
		<div id="app">
			<StoreConsumer>
				{({
					config,
					user,
					triggered,
					gdpr,
					sound,
					undocked,
					minimized = true,
					alerts,
					modal,
					dispatch,
				}) => (
					<App
						config={config}
						gdpr={gdpr}
						triggered={triggered}
						user={user}
						sound={sound}
						undocked={undocked}
						minimized={minimized}
						alerts={alerts}
						modal={modal}
						dispatch={dispatch}
					/>
				)}
			</StoreConsumer>
		</div>
	</StoreProvider>
);

export default AppConnector;
