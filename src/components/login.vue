<template>
    <section class="mt-2">
        <div class="row">
            <div class="col-5">
                <h3 class="text-center">Enter Login Details</h3>
                <form action="" @submit.prevent="sendSubmit()">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            autocomplete="off"
                            type="email"
                            id="email"
                            autofocus
                            class="form-control"
                            v-model="email"
                            @keypress="hideHelp(0)"
                        >
                        <small
                            id="passwordHelpBlock"
                            class="form-text text-muted"
                            v-show="helpEmail"
                        >Invalid Email</small>
                    </div>
                    <div class="form-group">
                        <label for="pass">Password</label>
                        <input
                            type="password"
                            id="pass"
                            autofocus
                            class="form-control"
                            v-model="password"
                            @keypress="hideHelp(1)"
                        >
                    </div>
                    <small
                        id="passwordHelpBlock"
                        class="form-text text-muted"
                        v-show="helpPassword"
                    >Invalid Password</small>
                    <div class="form-group text-right">
                        <router-link :to="'/reset-password/'+email">Forgot Password</router-link>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-block btn-success">
                            <i class="fas fa-sign-in-alt">&nbsp;&nbsp;</i>Login
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-7 text-center mt-auto mb-auto">New to the community ?
                <router-link :to="{name:'signup'}">Create Account</router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      helpEmail: false,
      helpPassword: false,
      showingPass: false
    };
  },
  methods: {
    sendSubmit() {
      if (
        this.email == "" ||
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        ) == false
      ) {
        this.helpEmail = true;
      }

      if (this.password.length < 8) {
        this.helpPassword = true;
      }
    },
    hideHelp(s) {
      if (s == 0 && this.helpEmail) {
        this.helpEmail = false;
      }
      if (s == 1 && this.helpPassword) {
        this.helpPassword = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
