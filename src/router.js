import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import Catalog from './views/catalog.vue';
import Main from './views/main.vue';
import Account from './views/account.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: Catalog,
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        }
    ]
})