import Vue from 'vue'
import Router from 'vue-router'

// importing components
import HomeComponent from './components/Home.vue'
import LoginComponent from './components/login.vue'
import SignUpComponent from './components/signup.vue'
import NotFoundComponent from './components/404.vue'
import ResetPasswordComponent from './components/reset-password.vue'
import DashboardComponent from './components/user/dashboard.vue'
import SettingComponent from './components/user/settings.vue'
Vue.use(Router)
const router = new Router({
	mode: 'hash',
	routes: [{
			path: '/',
			redirect: '/home'
		}, {
			path: '/home',
			name: 'home',
			caseSensitive: true,
			meta: {
				title: 'Home'
			},
			component: HomeComponent
		}, {
			path: '/login',
			component: LoginComponent,
			caseSensitive: true,
			name: 'login',
			meta: {
				title: 'Login'
			}
		}, {
			path: '/signup',
			name: 'signup',
			meta: {
				title: 'Signup'
			},
			component: SignUpComponent
		}, {
			path: '/reset-password/:email',
			component: ResetPasswordComponent,
			caseSensitive: true,
			name: 'reset-password',
			meta: {
				title: 'Reset Password'
			}
		},
		{
			path: '/user/:id/dashboard',
			component: DashboardComponent,
			caseSensitive: true,
			meta: {
				title: 'Dashboard'
			},
			name: 'dashboard'
		},
		{
			path: '/user/:id/settings',
			meta: {
				title: 'Settings'
			},
			caseSensitive: true,
			component: SettingComponent,
			name: 'settings'
		},
		{
			path: '*',
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