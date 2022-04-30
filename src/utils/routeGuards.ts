import store from '../store';
export default {
    beforeEnter(to: any, from: any, next: Function) {
        if (store.getters['user'].name) {
            return next();
        }
        return next('/');
    }
}