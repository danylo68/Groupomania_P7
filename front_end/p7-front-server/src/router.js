import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ArticlesList from './components/ArticlesList.vue';


Vue.use(Router);


export const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/home',
        //     component: Home
        // },
        {
            path: '/login',
            component: Login,
            meta: {

                title: 'Login'

            }
        },
        {
            path: '/register',
            component: Register,
            meta: {

                title: 'Register'

            }
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue'),
            meta: {

                title: 'profile'

            }
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue'),
            meta: {

                title: 'admin'

            }

        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () => import('./views/BoardModerator.vue'),
            meta: {

                title: 'moderator'

            }
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () => import('./views/BoardUser.vue'),
            meta: {

                title: 'user'

            }
        },

        //////////////////// Article /////////////////////////
        {
            path: "/",
            alias: "/articles",
            name: "articles",
            component: ArticlesList,
            meta: { requiresAuth: true }, // Meta Field , you can name it ,

        },
        {
            path: "/articles/:id",
            name: "article-details",
            component: () => import("./components/Article.vue")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddArticle.vue")
        },
        /////////////////////   Comment /////////////////////////////
        {
            path: "/:article_id",
            alias: "/comments",
            name: "comments",
            component: () => import("./components/CommentsList.vue")
        },
        {
            path: "/comments/",
            name: "comment-details",
            component: () => import("./components/Comment.vue"),
            meta: {

                title: 'comments'

            }
        },

    ]

});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/articleList'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});
