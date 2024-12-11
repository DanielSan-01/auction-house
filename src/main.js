import './styles/index.css';
import { LoginPage } from "./pages/Login.js";
import { RegisterPage } from './pages/Register.js';
import { logout } from "./components/logout.js";
import { HomePage } from './pages/Home.js';
import { SingleListing } from './pages/SingleListing.js';

function isLoggedIn() {
  return localStorage.getItem('accessToken') && localStorage.getItem('apiKey');
}

function updateNav() {
  const login = document.querySelector('#login');
  if(isLoggedIn()) {
    login.textContent = "Logout";
    login.href = "/logout";
    login.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  } else {
    login.textContent = "Login";
    login.href = "/login";
    login.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("/login");
    });
  }
}
export { updateNav };


function router(route) {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  function parseRoute(route) {
    const match = route.match(/^\/listings\/([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  }

  if (route === '/login') {
    LoginPage();
  } else if (route === '/register') {
    RegisterPage();
  } else if (route === '/') {
    HomePage();
  } else if (route === "/profile") {
    app.innerHTML = "<h1>Profile Page</h1>";
  } else if (route.startsWith('/listings/')) {
    const id = parseRoute(route);
    if (id) {
      SingleListing(id);
    } else {
      app.innerHTML = '<h1>404 - Listing Not Found</h1>';
    }
  } else {
    app.innerHTML = '<h1>404 - Page Not Found</h1>';
  }

  updateNav();
}

export function navigate(route) {
  history.pushState({}, '', route);
  router(route);
}

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.getAttribute("href");
    navigate(route);
  });
});

window.addEventListener('popstate', () => {
  router(window.location.pathname); 
});

router(window.location.pathname);