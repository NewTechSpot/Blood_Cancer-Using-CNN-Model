/*
// Registration form handling
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (email === '' || password === '') {
                showError('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.textContent = 'Logging In...';
            loginBtn.disabled = true;
            
            // Redirect to detection page
            setTimeout(() => {
                window.location.href = 'detection.html';
            }, 1500);
        });
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                showError('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            // Simulate registration
            const registerBtn = document.querySelector('.login-btn');
            registerBtn.textContent = 'Registering...';
            registerBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login
            }, 2000);
        });
    }
    
    // Update login link in registration page
    const loginLink = document.getElementById('login');
    if (loginLink) {
        loginLink.href = 'login.html';
    }
    
    // Update registration link in login page
    const registerLink = document.getElementById('register');
    if (registerLink) {
        registerLink.href = 'register.html';
    }
    
    // Image upload functionality for detection page
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const browseBtn = document.getElementById('browseBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultDiv = document.getElementById('result');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.style.borderColor = '#4b44ee';
        dropArea.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.4)';
    }

    function unhighlight() {
        dropArea.style.borderColor = '#6c63ff';
        dropArea.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            fileInput.files = files;
            handleFiles(files);
        }
    }

    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });

    function handleFiles(files) {
        const file = files[0];
        
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                dropArea.querySelector('.drop-area__message').style.display = 'none';
            }
            
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file');
        }
    }

    analyzeBtn.addEventListener('click', () => {
        if (preview.src) {
            // Mock analysis function - replace with actual image processing
            analyzeImage();
        } else {
            alert('Please upload an image first');
        }
    });

    async function analyzeImage() {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        
        // Simulate image analysis
        await new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
        
        // Show results
        const riskLevel = Math.random() > 0.6 ? 
            (Math.random() > 0.5 ? 'high' : 'medium') : 'low';
        
        let resultText = '';
        let resultTitle = '';
        
        switch(riskLevel) {
            case 'high':
                resultTitle = 'High Risk Detected';
                resultText = 'Significant markers detected. Please consult a doctor immediately for further examination.';
                break;
            case 'medium':
                resultTitle = 'Moderate Risk';
                resultText = 'Some abnormal markers detected. Consider medical consultation for further evaluation.';
                break;
            default:
                resultTitle = 'Low Risk';
                resultText = 'No significant risk markers detected. Maintain regular check-ups for continued health.';
        }

        // Display result
        resultDiv.innerHTML = `
            <div class="result-header">
                <i class="fas fa-${riskLevel === 'high' ? 'exclamation-triangle' : 'check-circle'}"></i>
                <h3>${resultTitle}</h3>
            </div>
            <p>${resultText}</p>
            <p class="recommendation">For accurate diagnosis, always consult with medical professionals.</p>
        `;
        
        resultDiv.className = `result ${riskLevel}-risk`;
        resultDiv.style.display = "block";
        
        // Reset button
        setTimeout(() => {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Image';
        }, 1500);
    }

    // Helper function to show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message below the form
        if (loginForm) {
            loginForm.appendChild(errorDiv);
        } else if (registerForm) {
            registerForm.appendChild(errorDiv);
        }
        
        // Show error message with animation
        setTimeout(() => {
            errorDiv.style.display = 'block';
            errorDiv.style.animation = 'fadeIn 0.5s ease';
        }, 10);
        
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                // Redirect to the login page
                window.location.href = 'login.html';
            });
        }
    });
});
*/


// Separate the login and registration form handling from the detection page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (email === '' || password === '') {
                showError('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.textContent = 'Logging In...';
            loginBtn.disabled = true;
            
            // Redirect to detection page
            setTimeout(() => {
                window.location.href = 'detection.html';
            }, 1500);
        });
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                showError('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            // Simulate registration
            const registerBtn = document.querySelector('.login-btn');
            registerBtn.textContent = 'Registering...';
            registerBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login
            }, 2000);
        });
    }
    
    // Update login link in registration page
    const loginLink = document.getElementById('login');
    if (loginLink) {
        loginLink.href = 'login.html';
    }
    
    // Update registration link in login page
    const registerLink = document.getElementById('register');
    if (registerLink) {
        registerLink.href = 'register.html';
    }

    // Image upload functionality for detection page
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const browseBtn = document.getElementById('browseBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultDiv = document.getElementById('result');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.style.borderColor = '#4b44ee';
        dropArea.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.4)';
    }

    function unhighlight() {
        dropArea.style.borderColor = '#6c63ff';
        dropArea.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            fileInput.files = files;
            handleFiles(files);
        }
    }

    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });

    function handleFiles(files) {
        const file = files[0];
        
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                dropArea.querySelector('.drop-area__message').style.display = 'none';
            }
            
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file');
        }
    }

    analyzeBtn.addEventListener('click', () => {
        if (preview.src) {
            analyzeImage();
        } else {
            alert('Please upload an image first');
        }
    });

    async function analyzeImage() {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        
        await new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
        
        const riskLevel = Math.random() > 0.6 ? 
            (Math.random() > 0.5 ? 'high' : 'medium') : 'low';
        
        let resultText = '';
        let resultTitle = '';
        
        switch(riskLevel) {
            case 'high':
                resultTitle = 'High Risk Detected';
                resultText = 'Significant markers detected. Please consult a doctor immediately for further examination.';
                break;
            case 'medium':
                resultTitle = 'Moderate Risk';
                resultText = 'Some abnormal markers detected. Consider medical consultation for further evaluation.';
                break;
            default:
                resultTitle = 'Low Risk';
                resultText = 'No significant risk markers detected. Maintain regular check-ups for continued health.';
        }

        resultDiv.innerHTML = `
            <div class="result-header">
                <i class="fas fa-${riskLevel === 'high' ? 'exclamation-triangle' : 'check-circle'}"></i>
                <h3>${resultTitle}</h3>
            </div>
            <p>${resultText}</p>
            <p class="recommendation">For accurate diagnosis, always consult with medical professionals.</p>
        `;
        
        resultDiv.className = `result ${riskLevel}-risk`;
        resultDiv.style.display = "block";
        
        setTimeout(() => {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Image';
        }, 1500);
    }

    // Helper function to show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message below the form
        if (loginForm) {
            loginForm.appendChild(errorDiv);
        } else if (registerForm) {
            registerForm.appendChild(errorDiv);
        }
        
        // Show error message with animation
        setTimeout(() => {
            errorDiv.style.display = 'block';
            errorDiv.style.animation = 'fadeIn 0.5s ease';
        }, 10);
        
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
});


