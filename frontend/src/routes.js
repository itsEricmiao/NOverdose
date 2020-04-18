import Login from './componets/login.js';
import RegisterPage from'./componets/register.js';
import HomePage from './componets/homePage.js';

export const ROUTES = [
    { path: '/home', component: HomePage },
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]