import Login from './Components/login';
import RegisterPage from './Components/register';
import MainPage  from './Components/mainPage';
import Search from './Components/search';
import ProfilePage from './Components/profilePage';
import DrugForm from "./Components/newDrugPage";

export const ROUTES = [
    { path: '/search/:id', component: Search },
    { path: '/dashboard/:id', component: MainPage },
    { path: '/profile/:id', component: ProfilePage},
    { path: '/register', component: RegisterPage },
    { path: '/update/:id/:drugId', component: DrugForm },
    { path: '/', component: Login }
]