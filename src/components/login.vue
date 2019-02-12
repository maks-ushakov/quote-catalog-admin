<template>
  <section class="mt-2">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <form action @submit.prevent="sendSubmit()">
          <h3 class="text-center">Enter Login Details</h3>
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
            <router-link :to="'/reset-password/'+email" class="s">Forgot Password</router-link>
          </div>
          <div class="form-group" v-show="!success">
            <button type="submit" class="btn btn-block btn-success">
              <i class="fas fa-sign-in-alt">&nbsp;&nbsp;</i>Login
            </button>
          </div>
          <div class="form-group" v-show="success">
            <button type="submit" class="btn btn-block btn-success" disabled>
              <i class="fas fa-sign-in-alt">&nbsp;&nbsp;</i>
              {{sdata}}
            </button>
          </div>
        </form>
        <span class="help-text">New to the community ?
          <router-link :to="{name:'signup'}" class="font-weight-bold s">Create Account</router-link>
        </span>
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
      showingPass: false,
      sdata: "Logging",
      success: false
    };
  },
  methods: {
    sendSubmit() {
      // validate
      this.helpEmail =
        this.email == "" /*||
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        ) == false*/;
      this.helpPassword = this.password.length < 1;

      if (this.helpEmail || this.helpPassword) return;

      // builing data
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      });
      this.success = true;
      fetch("/api/auth/login", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          console.log(resp);
          if (!resp.ok && resp.status === 404) {
            this.success = false;
            throw new Error("Invalid Email/Password");
          } else if (!resp.ok && resp.status === 406) {
            this.success = false;
            throw new Error("Invalid Input");
          } else if (!resp.ok && resp.status === 503) {
            this.success = false;
            throw new Error("Something Went Wrong");
          } else {
            this.sdata = "Logged In";
            this.$router.push({ name: "dashboard" });
          }
        })
        .catch(alert);
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

<style scoped lang="scss">
h3 {
  color: #333;
}
form {
  background: #fff;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 20px 30px;
  transition: 0.3s;
  a {
    color: #333;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
  .btn {
    background-image: linear-gradient(to bottom, #a5b8da, #7089b3);
    transition: 0.3s;
    border: none;
    &:hover,
    &:focus,
    &:active {
      background-image: linear-gradient(to bottom, #819bcb, #536f9d);
      box-shadow: none;
      transition: 0.3s;
    }
  }
}
span.help-text {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
  a {
    color: #333;
    font-weight: 500;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
}
@media screen and (max-width: 767px) {
  h3 {
    font-size: 1.3rem;
  }
}

.s {
  text-decoration: underline;
  text-decoration-style: dotted;
}
</style>
