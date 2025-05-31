const fileSystem = {
  '/': {
    type: 'dir',
    children: {
      home: {
        type: 'dir',
        children: {
          user: {
            type: 'dir',
            children: {
              'readme.txt': {
                type: 'file',
                content: 'Welcome to ShellCoach!'
              }
            }
          }
        }
      },
      bin: { type: 'dir', children: {} },
      etc: { type: 'dir', children: {} },
      tmp: { type: 'dir', children: {} }
    }
  }
};
let currentPath = ['/'];

function getCurrentDirectory() {
  return currentPath.join('/') || '/';
}
function getNode(pathArray) {
  let node = fileSystem['/'];
  for (let i = 1; i < pathArray.length; i++) {
    if (!node.children[pathArray[i]]) return null;
    node = node.children[pathArray[i]];
  }
  return node;
}

function changeDirectory(dirName) {
  if (dirName === '..') {
    if (currentPath.length > 1) currentPath.pop();
    return;
  }
  const newPath = [...currentPath, dirName];
  const node = getNode(newPath);
  if (node && node.type === 'dir') {
    currentPath = newPath;
  } else {
    appendToTerminal(`No such directory: ${dirName}`);
  }
}

function listDirectory() {
  const node = getNode(currentPath);
  return Object.keys(node.children).join('  ');
}

function createDirectory(name) {
  const node = getNode(currentPath);
  if (node.children[name]) {
    return 'Directory already exists';
  }
  node.children[name] = { type: 'dir', children: {} };
  return `Directory created: ${name}`;
}

function createFile(name, content = '') {
  const node = getNode(currentPath);
  node.children[name] = { type: 'file', content };
  return `File created: ${name}`;
}
function runCommand(input) {
  const [cmd, ...args] = input.trim().split(' ');

  switch (cmd) {
    case 'pwd':
      appendToTerminal(getCurrentDirectory());
      break;
    case 'ls':
      appendToTerminal(listDirectory());
      break;
    case 'cd':
      changeDirectory(args[0]);
      break;
    case 'mkdir':
      appendToTerminal(createDirectory(args[0]));
      break;
    case 'touch':
      appendToTerminal(createFile(args[0]));
      break;
    default:
      appendToTerminal(`Command not found: ${cmd}`);
  }
}

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
