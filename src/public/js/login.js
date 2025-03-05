const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    if(!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        alert(data.message);
        window.location.href = '/api/products';

    } catch (e) {
        console.log(e);
        alert(data.error);
    }
})