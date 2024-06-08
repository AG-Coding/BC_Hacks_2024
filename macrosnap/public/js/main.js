document.getElementById('hamburger-menu').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show');
});

document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'flex';
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        alert('Login successful!');
        document.getElementById('login-modal').style.display = 'none';
    } else {
        alert('Login failed!');
    }
});
