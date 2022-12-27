export const auth = (navigate) => ({
    navigateToRegister(state) {
        navigate('/auth?view=register', state);
    },
    navigateToLogin(state) {
        navigate('/auth?view=login', state)
    },
    navigateToLoggedArea(state) {
        navigate('/logs', state);
    }
})