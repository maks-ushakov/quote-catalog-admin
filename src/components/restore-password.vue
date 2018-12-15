<template>
  <section>
    <div v-show="!valid">Invalid Token</div>
    <div v-show="succ">Password Changed. Redirecting to login in 2 secs</div>
    <form action @submit.prevent="submit()" v-show="valid">
      <input placeholder="new password" v-model="pass">
      <input placeholder="confirm new password" v-model="vpass">
      <p v-show="ne">Password Doesn't Match</p>
      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.params.token,
      valid: true,
      pass: "",
      vpass: "",
      ne: false,
      succ: false
    };
  },
  methods: {
    submit() {
      this.ne = !(this.pass == this.vpass);
      if (this.ne) return;

      fetch("/api/auth/restore-password/" + this.token, {
        method: "POST",
        body: JSON.stringify({ password: this.pass }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.succ = true;
            this.$router.push({ name: "login" });
          }, 2000);
        }
      });
    }
  },
  created() {
    // here we will check if token exists or not ?
    fetch("/api/author/is-logged").then(resp => {
      if (resp.ok) {
        this.$router.push({ name: "not-found" });
      } else {
        fetch("/api/auth/restore-password/" + this.token).then(resp => {
          this.valid = resp.ok;
        });
      }
    });
  }
};
</script>

<style scoped>
</style>
