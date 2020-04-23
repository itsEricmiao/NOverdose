import  Login from './Componets/login.js';
import RegisterPage from './Componets/register.js';
import  Home  from './Componets/homePage.js';

export const ROUTES = [
    { path: '/homePage', component: Home },
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]