<template>
    <section>reset {{email}}</section>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  created() {
    this.email = this.$route.params.email;
  }
};
</script>

<style>
</style>
