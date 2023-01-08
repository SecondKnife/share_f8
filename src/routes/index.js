import Home from '~/pages/Home';
import Learning from '~/pages/Learning';
import Courses from '~/pages/Courses';
import Blog from '~/pages/Blog';
import Login from '~/layouts/components/Login';
import Register from '~/layouts/components/Register';
import Profile from '~/pages/Profile/Profile';
import Settings from '~/pages/Settings';
import Tracks from '~/pages/Tracks';
import NewPost from '~/pages/NewPost';
import Posts from '~/pages/Posts';
import LearningRoute from '~/pages/Learning/LearningRoute';
import Search from '~/pages/Search';
import NotFound from '~/pages/NotFound';

// Public router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/learning', component: Learning },
    { path: '/learning/:slug', component: LearningRoute },
    { path: '/courses', component: Courses },
    { path: '/courses/:slug', component: Tracks, layout: null },
    { path: '/blog', component: Blog },
    { path: '/blog/:slug', component: Posts },
    { path: '/new-post', component: NewPost, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/@:username', component: Profile },
    { path: '/settings', component: Settings },
    { path: '/search', component: Search },
    { path: '/search/:slug', component: Search },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
