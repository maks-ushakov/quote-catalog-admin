<template>
    <section class="mt-4">
        <div class="row">
            <div class="col-6 offset-3">
                <h3 class="text-center">User Registeration Form</h3>
                <form action="" @submit.prevent="sendSubmit()">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            autocomplete="off"
                            v-model="name"
                        >
                        <small class="form-text text-muted" v-show="help.name">Name can't be empty</small>
                    </div>
                    <div class="form-group">
                        <label for="dname">Display Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="dname"
                            @focus="showMe=true"
                            @blur="showMe=false"
                            autocomplete="off"
                            v-model="dname"
                        >
                        <small
                            class="form-text text-muted"
                            v-show="showMe"
                        >White spaces are not allowed, use '-' instead</small>
                        <small
                            class="form-text text-muted"
                            v-show="help.dname1"
                        >Display name can't be empty</small>
                        <small
                            class="form-text text-muted"
                            v-show="help.dname2"
                        >Display name has been taken</small>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="email"
                            autocomplete="off"
                            v-model="email"
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
                        <small
                            class="form-text text-muted"
                            v-show="help.cpass"
                        >Password did not match</small>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-block btn-success" type="submit">Register</button>
                    </div>
                </form>
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
      email: ""
    };
  },
  methods: {
    sendSubmit() {
      // validating
      this.help.name = this.name.length == 0;
      this.help.cpass = !(this.pass == this.cpass);
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
      console.log("Submit");
    }
  }
};
</script>

<style>
</style>
