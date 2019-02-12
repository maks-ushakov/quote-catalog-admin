<template>
  <section class="main" id="app">
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
            >Profile</a>
            <div class="dropdown-menu dropdown-menu-right">
              <router-link :to="{name:'dashboard'}" class="dropdown-item">
                <i class="fas fa-user-circle">&nbsp;&nbsp;</i>Dashboard
              </router-link>
              <router-link :to="{name:'settings'}" class="dropdown-item">
                <i class="fas fa-cog">&nbsp;&nbsp;</i>Settings
              </router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href @click.prevent="logout()">
                <i class="fas fa-sign-out-alt">&nbsp;&nbsp;</i>Logout
              </a>
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
  },
  methods: {
    logout() {
      fetch("/api/auth/logout")
        .then(resp => {
          if (!resp.ok && resp.status === 404) {
            this.$router.push({ name: "not-found" });
          } else if (!resp.ok && resp.status === 406) {
            throw new Error("Invalid Input");
          } else if (!resp.ok && resp.status === 503) {
            throw new Error("Something Went Wrong");
          } else {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    fetch("/api/author/is-logged")
      .then(resp => {
        this.logged = resp.ok;
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeUpdate() {
    fetch("/api/author/is-logged")
      .then(resp => {
        this.logged = resp.ok;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
section.main {
  height: auto;
  min-height: 140vh;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
section.main nav {
  flex: 1 0 100%;
}
</style>
