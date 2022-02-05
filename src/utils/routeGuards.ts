export default {
    beforeEnter(to: any, from: any, next: Function) {
        if (localStorage.getItem('userName')) {
            next();
        } else {
            next('/')
        }
    }
}