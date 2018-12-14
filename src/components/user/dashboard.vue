<template>
  <section></section>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    fetch("/api/author/is-logged")
      .then(resp => {
        if (!resp.ok) {
          this.$router.push({ name: "not-found" });
        }
      })
      .catch();
  },
  beforeMount() {}
};
</script>

<style>
</style>
