export async function logout() {
    try {
        const res = fetch(`api/auth/logout/`)
        window.location.href = '/'
    } catch (err) {
        console.log('Failed to log out', err)
    }
}