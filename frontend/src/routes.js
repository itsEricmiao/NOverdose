import Login from './componets/login.js';
import RegisterPage from './componets/register.js';
import Home  from './componets/homePage.js';
import Search from './componets/search';

export const ROUTES = [
    { path: '/search', component: Search },
    { path: '/homePage/:id', component: Home },
    { path: '/register', component: RegisterPage },
    { path: '/', component: Login }
]