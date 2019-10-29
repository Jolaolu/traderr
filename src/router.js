import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

const TradesView = () => import( '@/views/Trades' )
const routes = [
    {
        path: "/",
        name: "home",
        component: TradesView
    },
];
const router = new VueRouter( {
    mode: "history",
    base: process.env.BASE_URL,
    routes
} );

export default router;