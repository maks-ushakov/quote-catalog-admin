import Vue from 'vue'
import Router from 'vue-router'

// importing components
import HomeComponent from './components/Home.vue'
import LoginComponent from './components/login.vue'
import SignUpComponent from './components/signup.vue'
import NotFoundComponent from './components/404.vue'
import ResetPasswordComponent from './components/reset-password.vue'
Vue.use(Router)
const router = new Router({
  mode: "hash",
  routes: [{
      path: '/',
      redirect: "/home"
    }, {
      path: "/home",
      name: "home",
      meta: {
        title: "Home"
      },
      component: HomeComponent
    }, {
      path: '/login',
      component: LoginComponent,
      name: 'login',
      meta: {
        title: 'Login'
      }
    }, {
      path: "/signup",
      name: "signup",
      meta: {
        title: "Signup"
      },
      component: SignUpComponent
    }, {
      path: '/reset-password/:email',
      component: ResetPasswordComponent,
      name: 'reset-password',
      meta: {
        title: 'Reset Password'
      }
    },
    {
      path: "*",
      component: NotFoundComponent,
      name: 'not-found',
      meta: {
        title: 'Not Found'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})
export default router;