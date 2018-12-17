<template>
  <section>
    <div class="row">
      <div class="col-10">
        <h1>RECENT QUOTES</h1>
      </div>
      <div class="col-2">
        <button class="btn btn-info" @click="r()">
          <i class="fas fa-plus-square fa-fw">&nbsp;&nbsp;</i>Add New
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    r() {
      console.log(1);
      this.$router.push({ name: "new-quotes" });
      console.log(2);
    }
  },
  created() {
    fetch("/api/author/is-logged")
      .then(resp => {
        if (!resp.ok) {
          this.$router.push({ name: "not-found" });
        }
      })
      .catch(alert);
  },
  beforeMount() {}
};
</script>

<style>
</style>
