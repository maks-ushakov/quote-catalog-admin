<template>
  <section>
    <form action @submit.prevent="sendSubmit()">
      <input type="text" v-model="email">
      <button type="submit">Send Reset Link</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    sendSubmit() {}
  },
  created() {
    this.email =
      this.$route.params.email !== "" || this.$route.params.email !== undefined
        ? this.$route.params.email
        : "";
  }
};
</script>

<style>
</style>
