
async function signupFormHandler(event) {
  console.log("sign up!");
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();
  console.log(username, email, password);

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      console.log('success');
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }
  }
}

async function loginFormHandler(event) {
  console.log("login");
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('Loggedin')
    } else {
      alert(response.statusText)
    }
  }
}

document.getElementById('signup-form').addEventListener('submit', signupFormHandler);
document.getElementById('login-form').addEventListener('submit', loginFormHandler)




{/* <form class="login-page">
    <div>
        <label for="username-login">Username</label>
        <input type="text" id="username-login" />
    </div>

    <div>
        <label for="password-login">Password</label>
        <input type="text" id="password-login" />
    </div>

    <div>
        <button type="submit">Join Our Cult</button>
    </div>
</form> */}