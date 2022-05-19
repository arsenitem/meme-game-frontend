import store from '../store';
export default {
    beforeEnter(to: any, from: any, next: Function) {
        console.log(from);
        console.log(to);
        if (store.getters['user'].name) {
            return next();
        }

        return next(`/?id=${to.params.id}`);
    },
    enterUsernameInput(to: any, from: any, next: Function) {
        if (store.getters['user'].name) {
            return next('/rooms');
        }
        return next();
    }
}