
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => console.log("Logged in"))
    .catch(e => alert(e.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => console.log("Signed up"))
    .catch(e => alert(e.message));
}

function logout() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("shell").style.display = "block";
    document.getElementById("user-email").textContent = user.email;
  } else {
    document.getElementById("auth").style.display = "block";
    document.getElementById("shell").style.display = "none";
  }
});
