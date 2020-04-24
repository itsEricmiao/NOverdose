import  Login from './Component/login.js';
import RegisterPage from './Component/register.js';
import MainPage from './Component/mainPage';

export const ROUTES = [
    { path: '/homePage', component: MainPage },
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]