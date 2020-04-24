import  Login from './Component/login.js';
import RegisterPage from './Component/register.js';
import MainPage from './Component/mainPage';
import ProfilePage from './Component/profilePage'
export const ROUTES = [
    { path: '/homePage', component: MainPage },
    { path: '/profile', component: ProfilePage},
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]