import  Login from './componets/login.js';
import RegisterPage from './componets/register.js';
import  Home  from './componets/homePage.js';

export const ROUTES = [
    { path: '/homePage', component: Home },
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]