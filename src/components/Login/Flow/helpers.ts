export enum LoginFlowState {
	guest = 'guest',
	authorized = 'authorized'
}

export const getLoginState = (authorized: boolean): LoginFlowState => {
	if (!authorized) {
		return LoginFlowState.guest
	}

	return LoginFlowState.authorized
}
