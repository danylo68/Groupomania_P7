import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);



export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue')
        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () => import('./views/BoardModerator.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () => import('./views/BoardUser.vue')
        },

        //////////////////// Article /////////////////////////
        {
            path: "/",
            alias: "/articles",
            name: "articles",
            component: () => import("./components/ArticlesList.vue")
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
            path: "/",
            alias: "/comments",
            name: "comments",
            component: () => import("./components/CommentsList.vue")
        },
        {
            path: "/comments/:id",
            name: "comment-details",
            component: () => import("./components/Comment.vue")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddComment.vue")
        }

    ]

});

