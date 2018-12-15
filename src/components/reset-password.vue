<template>
  <section>
    <form action @submit.prevent="sendSubmit()">
      <div v-show="success">Reset Password Email Sent. Do check your inbox or spam folder</div>
      <input type="text" v-model="email" @focus="iemail=false">
      <p v-show="iemail">Invalid Email</p>
      <button type="submit">Send Reset Link</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      iemail: false,
      success: false
    };
  },
  methods: {
    sendSubmit() {
      // validate
      this.iemail =
        this.email == "" ||
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        ) == false;
      if (this.iemail) return;

      // send email
      fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email: this.email }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => {
        if (!resp.ok && resp.status == 404) {
          alert(`Not Found: ${this.email}`);
        } else {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        }
      });
    }
  },
  created() {
    fetch("/api/author/is-logged")
      .then(resp => {
        if (resp.ok) this.$router.push({ name: "not-found" });
      })
      .catch(alert);
    this.email =
      this.$route.params.email !== "" || this.$route.params.email !== undefined
        ? this.$route.params.email
        : "";
  }
};
</script>

<style>
</style>
