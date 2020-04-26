import Login from './Components/login';
import RegisterPage from './Components/register';
import MainPage  from './Components/mainPage';
import Search from './Components/search';
import ProfilePage from './Components/profilePage';

export const ROUTES = [
    { path: '/search', component: Search },
    { path: '/mainPage/:id', component: MainPage },
    { path: '/profile/:id', component: ProfilePage},
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]