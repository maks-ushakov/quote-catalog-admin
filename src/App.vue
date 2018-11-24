<template>
	<section>
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<router-link :to="{name:'home'}" class="navbar-brand">Quote</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarCollapse"
				aria-controls="navbarCollapse"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="fas fa-bars"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarCollapse">
				<ul class="navbar-nav ml-auto">
					<router-link
						:to="{name:'home'}"
						class="nav-link"
						:exact="true"
						exact-active-class="active"
					>Home</router-link>
					<router-link
						:to="{name:'login'}"
						exact
						exact-active-class="active"
						v-show="!logged"
						class="nav-link"
					>Login</router-link>
					<li class="nav-item dropdown" v-show="logged">
						<a
							class="nav-link dropdown-toggle"
							data-toggle="dropdown"
							href="#"
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>Dropdown</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="#">Action</a>
							<a class="dropdown-item" href="#">Another action</a>
							<a class="dropdown-item" href="#">Something else here</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Separated link</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<router-view></router-view>
		</div>
	</section>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      logged: false
    };
  }
};
</script>
<style scoped>
</style>
