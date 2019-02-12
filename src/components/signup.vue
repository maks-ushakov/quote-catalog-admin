<template>
  <section class="mt-2">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <form action @submit.prevent="sendSubmit()">
          <h3 class="text-center">User Registeration Form</h3>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" autocomplete="off" v-model="name">
            <small class="form-text text-muted" v-show="help.name">Name can't be empty</small>
          </div>
          <div class="form-group">
            <label for="dname">Display Name</label>
            <input
              type="text"
              class="form-control"
              id="dname"
              @focus="showMe=true"
              @blur="showMe=false;checkAvailability()"
              autocomplete="off"
              v-model="dname"
            >
            <small
              class="form-text text-muted"
              v-show="showMe"
            >White spaces are not allowed, use '-' instead</small>
            <small class="form-text text-muted" v-show="help.dname1">Display name can't be empty</small>
            <small class="form-text text-muted" v-show="help.dname2">Display name has been taken</small>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              autocomplete="off"
              v-model="email"
              @blur="checkEmail()"
            >
            <small class="form-text text-muted" v-show="help.email1">Invalid Email</small>
            <small class="form-text text-muted" v-show="help.email2">Already Registed.</small>
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" class="form-control" id="pass" v-model="pass">
            <small class="form-text text-muted" v-show="help.password">Invalid password</small>
          </div>
          <div class="form-group">
            <label for="cpass">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="cpass"
              autocomplete="off"
              v-model="cpass"
            >
            <small class="form-text text-muted" v-show="help.cpass">Password did not match</small>
          </div>
          <div class="form-group" v-show="!success">
            <button class="btn btn-block btn-success" type="submit">Register</button>
          </div>
          <div class="form-group" v-show="success">
            <button class="btn btn-block btn-info" type="submit" disabled>{{sdata}}</button>
          </div>
        </form>
        <span class="help-text">Already have an account ?
          <router-link :to="{name:'login'}" class="font-weight-bold s">Login</router-link>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      help: {
        name: false,
        password: false,
        cpass: false,
        dname1: false,
        dname2: false,
        email1: false,
        email2: false
      },
      showMe: false,
      name: "",
      dname: "",
      pass: "",
      cpass: "",
      email: "",
      davail: true,
      dnavail: true,
      success: false,
      sdata: "Submitting"
    };
  },
  methods: {
    sendSubmit() {
      // validating
      this.help.name = this.name.length == 0;
      this.help.cpass = !(this.pass == this.cpass);
      this.help.email1 =
        this.email == "" /*||
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
         this.email
        ) == false*/ ;

      // preventing unconditional signup
      if (
        this.help.name ||
        this.help.cpass ||
        this.help.dname1 ||
        this.help.dname2 ||
        this.help.email1 ||
        this.help.email2 ||
        this.help.password
      ) {
        return;
      }

      // animate
      this.success = true;

      // building data
      const data = JSON.stringify({
        id: this.dname,
        name: this.name,
        email: this.email,
        password: this.pass
      });

      // sending post request
      fetch("/api/author/register", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          if (!resp.ok && resp.status === 404) {
            this.$router.push({ name: "not-found" });
          } else if (!resp.ok && resp.status === 406) {
            throw new Error("Invalid Input");
          } else if (!resp.ok && resp.status === 503) {
            throw new Error("Something Went Wrong");
          } else {
            this.sdata = "Registered Successfully";
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 2000);
          }
        })
        .catch(alert);
    },
    checkAvailability() {
      fetch(`/api/author/check-id/${this.dname}`)
        .then(resp => {
          this.help.dname2 = resp.ok;
        })
        .catch(alert);
    },
    checkEmail() {
      fetch(`/api/author/check-email/${this.email}`)
        .then(resp => {
          this.help.email2 = resp.ok;
        })
        .catch(alert);
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
