// import { defineAsyncComponent  } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import AllCoaches from './pages/coaches/AllCoaches.vue';
// import CoachDetails from './pages/coaches/CoachDetails.vue';
// import RegisterCoach from './pages/coaches/RegisterCoach.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import AllRequests from './pages/requests/AllRequests.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const RegisterCoach = () => import('./pages/coaches/RegisterCoach.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const AllRequests = () => import('./pages/requests/AllRequests.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: AllCoaches },
        { 
            path: '/coaches/:id', 
            component: CoachDetails, 
            props: true,
            children: [
                { path: 'contact', component: ContactCoach } // /coaches/c1/contact
            ]
        },
        { path: '/register', component: RegisterCoach, meta: { requiresAuth: true } },
        { path: '/requests', component: AllRequests, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ],
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth &&  !store.getters.isAuthenticated) {
        next('/auth');
    } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;