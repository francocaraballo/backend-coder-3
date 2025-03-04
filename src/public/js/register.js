const form = document.querySelector('#register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if(!data.last_name || !data.first_name || !data.email || !data.password || !data.age ){
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)
        form.reset();
        alert('User registered successfully');
        window.location.href = 'http://localhost:8080/api/sessions/login';
        
        
    } catch (error) {
        console.log(error);
        alert('Error registering user. Try again!');
    }

    
})
