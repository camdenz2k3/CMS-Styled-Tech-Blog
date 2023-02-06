const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });const loginFormHandler = async (event) => {
        event.preventDefault();
      
        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
      
        if (email && password) {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            window.location.href = "/";
          } else {
            alert('Failed to log in');
          }
        }
      };
      
      document
        .querySelector('.login-form')
        .addEventListener('submit', loginFormHandler);
      
        const signupFormHandler = async (event) => {
          event.preventDefault();
        
          const name = document.querySelector("#name-signup").value.trim();
          const email = document.querySelector("#email-signup").value.trim();
          const password = document.querySelector("#password-signup").value.trim();
          const confirmPassword = document
            .querySelector("#confirmPassword-signup")
            .value.trim();
          let alertMessage = "";
      
          if (!name) {
            alertMessage += "Missing name\n";
          }
          if (!email) {
            alertMessage += "Missing email\n";
          }
          if (!password) {
            alertMessage += "Missing password\n";
          }
          if (password.length < 8) {
            alertMessage += "Password is smaller than 8 characters\n";
          }
          if (!confirmPassword || password !== confirmPassword) {
            alertMessage += "Passwords don't match\n";
          }
        
          if (alertMessage.length !== 0) {
            alert(alertMessage);
          } else  if (name && email && password){
              const response = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
              });
        
              if (response.ok) {
                  window.location.href = "/";
              } else {
                  alert('Failed to sign up');
              }
            }
        };
        
        document
          .querySelector(".signup-form")
          .addEventListener("submit", signupFormHandler);
        
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  