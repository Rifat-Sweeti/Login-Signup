document.getElementById('show-signup').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.getElementById('signup-btn').addEventListener('click', function() {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;

    if (username === '' || email === '' || password === '') {
        Swal.fire('Error', 'All fields are required', 'error');
        return;
    }

    if (!emailRegex.test(email)) {
        Swal.fire('Error', 'Invalid email format', 'error');
        return;
    }

    if (!passwordRegex.test(password)) {
        Swal.fire('Error', 'Password must be at least 6 characters, include one number and one uppercase letter', 'error');
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some(user => user.username === username);

    if (userExists) {
        Swal.fire('Error', 'User already exists', 'error');
    } else {
        const newUser = { username, email, password };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        Swal.fire('Success', 'Registration Successful! Please login.', 'success');
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    }
});

document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username === '' || password === '') {
        Swal.fire('Error', 'Both fields are required', 'error');
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.username === username);

    if (user) {
        if (user.password === password) {
            Swal.fire('Success', 'Login successful!', 'success');
        } else {
            Swal.fire('Error', 'Incorrect password', 'error');
        }
    } else {
        Swal.fire('Error', 'User not found', 'error');
    }
});
