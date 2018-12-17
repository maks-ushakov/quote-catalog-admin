import Vue from "vue";
import Router from "vue-router";

// importing components
import HomeComponent from "./components/Home.vue";
import LoginComponent from "./components/login.vue";
import SignUpComponent from "./components/signup.vue";
import NotFoundComponent from "./components/404.vue";
import ResetPasswordComponent from "./components/reset-password.vue";
import DashboardComponent from "./components/user/dashboard.vue";
import SettingComponent from "./components/user/settings.vue";
import RestorePassword from "./components/restore-password.vue";
import AuthorProfileComponent from "./components/author-profile.vue";
import UserQuotesComponent from "./components/user/quotes.vue";
import NewQuoteComponent from "./components/user/new-quote.vue";

Vue.use(Router);
const router = new Router({
	mode: "history",
	routes: [{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/home",
			name: "home",
			caseSensitive: true,
			meta: {
				title: "Home"
			},
			component: HomeComponent
		},
		{
			path: "/login",
			component: LoginComponent,
			caseSensitive: true,
			name: "login",
			meta: {
				title: "Login"
			}
		},
		{
			path: "/signup",
			name: "signup",
			meta: {
				title: "Signup"
			},
			component: SignUpComponent
		},
		{
			path: "/reset-password/:email?",
			component: ResetPasswordComponent,
			caseSensitive: true,
			name: "reset-password",
			meta: {
				title: "Reset Password"
			}
		},
		{
			path: "/user/dashboard",
			component: DashboardComponent,
			caseSensitive: true,
			meta: {
				title: "Dashboard"
			},
			name: "dashboard"
		},
		{
			path: "/user/settings",
			meta: {
				title: "Settings"
			},
			caseSensitive: true,
			component: SettingComponent,
			name: "settings"
		},
		{
			path: "/user/quotes",
			meta: {
				title: "Quotes By User"
			},
			caseSensitive: true,
			name: "user-quotes",
			component: UserQuotesComponent
		},
		{
			path: "/user/quotes/new",
			meta: {
				title: "Add New Quote"
			},
			caseSensitive: true,
			name: "new-quotes",
			component: NewQuoteComponent
		},

		{
			path: "/author/:id",
			meta: {
				title: "Author Profile"
			},
			component: AuthorProfileComponent,
			caseSensitive: true,
			name: "author"
		},
		{
			path: "/restore-password/:token",
			meta: {
				title: "Set New Password"
			},
			name: "restore-password",
			component: RestorePassword
		},
		{
			path: "*",
			component: NotFoundComponent,
			name: "not-found",
			meta: {
				title: "Not Found"
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});
export default router;