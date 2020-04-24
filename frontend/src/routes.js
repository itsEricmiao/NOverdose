import  Login from './Components/login.js';
import RegisterPage from './Components/register.js';
import MainPage from './Components/mainPage';
import ProfilePage from './Components/profilePage'
export const ROUTES = [
    { path: '/homePage', component: MainPage },
    { path: '/profile', component: ProfilePage},
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]
