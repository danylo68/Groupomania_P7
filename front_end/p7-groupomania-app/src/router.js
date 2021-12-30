import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")


const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
    },
    {
        path: "/admin",
        name: "admin",
        // lazy-loaded
        component: BoardAdmin,
    },
    {
        path: "/mod",
        name: "moderator",
        // lazy-loaded
        component: BoardModerator,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },

    {
        path: "/",
        alias: "/articles",
        name: "articles",
        component: () => import("./components/ArticlesList")
    },
    {
        path: "/articles/:id",
        name: "article-details",
        component: () => import("./components/Article")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddArticle")
    },



];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

