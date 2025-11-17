const sigupForm = document.getElementById('signup-form')
const errorMessage = document.getElementById('error-message')

sigupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('signup-name').value.trim()
    const email = document.getElementById('signup-email').value.trim()
    const userName = document.getElementById('signup-username').value.trim()
    const password = document.getElementById('signup-password').value.trim()
    const submitBtn = sigupForm.querySelector('button')

    // console.log(name, email, userName, password)      
    
    errorMessage.textContent = ''
    submitBtn.disabled = true

    try {
        const res = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, userName, password })
        })

        const data = await res.json()
        if (res.ok) {
            window.location.href = '/'
        } else {
            errorMessage.textContent = data.error || "Registration failed. Please try again."
        }
    } catch(error) {
        console.error('Network error: ', error)
        errorMessage.textContent = 'Unable to connect. Please try again.'
    } finally {
        submitBtn.disabled = false
    }
})