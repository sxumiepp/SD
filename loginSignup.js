
const form = document.getElementById('form');
const name_input = document.getElementById('name-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const passwordRepeat_input = document.getElementById('passwordRepeat-input');
const error_message = document.getElementById('error-message');




form.addEventListener('submit', (e) => {
    let errors = [];

    
    [name_input, email_input, password_input, passwordRepeat_input].forEach(input => {
        if(input) input.parentElement.classList.remove('Incorrect');
    });

    if (name_input) {
        
        errors = getSignupFormErrors(name_input.value, email_input.value, password_input.value, passwordRepeat_input.value);
    } else {
       
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        e.preventDefault(); 
        error_message.innerText = errors.join(". ");
    }
});

function getSignupFormErrors(name, email, password, repeatPassword) {
    let errors = [];

    if (!name) {
        errors.push('Name is required');
        name_input.parentElement.classList.add('Incorrect');
    }
    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('Incorrect');
    }
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
        password_input.parentElement.classList.add('Incorrect');
    }
    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        passwordRepeat_input.parentElement.classList.add('Incorrect');
    }

    return errors;
}


const allInputs = [name_input, email_input, password_input, passwordRepeat_input].filter(input => input != null);

allInputs.forEach(input => {

    if (input) {
        input.addEventListener('input', () => {

            if (input.parentElement.classList.contains('Incorrect')) {
                input.parentElement.classList.remove('Incorrect');
                error_message.innerText = "";
            }
        });
    }
});

function getLoginFormErrors(email, password){
    let errors = []

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('Incorrect');
    }
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
        password_input.parentElement.classList.add('Incorrect');
    }

    return errors;
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get the list of users from localStorage, or an empty list if none exist
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (name_input) {
        // --- SIGNUP LOGIC ---
        const newUser = {
            name: name_input.value,
            email: email_input.value,
            password: password_input.value
        };

        // Check if email already exists
        if (users.some(u => u.email === newUser.email)) {
            error_message.innerText = "Email already registered!";
            return;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Account created! Please login.");
        window.location.href = "login.html";

    } else {
        // --- LOGIN LOGIC ---
        const userFound = users.find(u => u.email === email_input.value && u.password === password_input.value);

        if (userFound) {
            // Save which user is currently logged in so the Dashboard knows who they are
            localStorage.setItem('currentUser', JSON.stringify(userFound));
            window.location.href = "dashboard.html";
        } else {
            error_message.innerText = "Invalid email or password.";
        }
    }
});

// Select all eye icons
const togglePasswordIcons = document.querySelectorAll('.toggle-pass');

togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');

        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});
