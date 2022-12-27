export const sidebar = (navigate) => ({
    navigateToLogs(state) {
        navigate('/logs', state)
    },
    navigateToChest(state) {
        navigate('/chest', state)
    },
    navigateToRotations(state) {
        navigate('/rotations', state)
    },
    navigateToDashboard(state) {
        navigate('/dashboard', state)
    }
})