const authContainer = document.getElementById('auth-container');
const authForm = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');

let isLogin = false;


function toggleAuthMode() {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Login' : 'Register';
    submitBtn.textContent = isLogin ? 'Login' : 'Register';
}

function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        messageDiv.textContent = 'User already exists. Please login.';
        return;
    }

    users.push({ username, email, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    messageDiv.textContent = 'Registration successful. You can now log in.';
    toggleAuthMode();
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        messageDiv.textContent = 'Invalid email or password.';
        return;
    }

    messageDiv.textContent = `Welcome, ${user.username}!`;

    if (user.role === 'admin') {
        messageDiv.textContent += ' You have admin privileges.';
    }
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageDiv.textContent = '';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        loginUser(email, password);
    } else {
        registerUser(username, email, password);
    }

    authForm.reset();
});

const switchModeDiv = document.createElement('div');
switchModeDiv.style.textAlign = 'center';
switchModeDiv.style.marginTop = '10px';
const switchModeLink = document.createElement('a');
switchModeLink.href = '#';
switchModeLink.textContent = 'Already have an account? Login';
switchModeLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
    switchModeLink.textContent = isLogin ? "Don't have an account? Register" : 'Already have an account? Login';
});
switchModeDiv.appendChild(switchModeLink);
authContainer.appendChild(switchModeDiv);