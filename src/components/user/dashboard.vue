<template>
    <section>
        <div v-show="found">{{id}}</div>
        <not-found v-show="!found"></not-found>
    </section>
</template>

<script>
import NF from "../404.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      found: false
    };
  },
  components: {
    notFound: NF
  },
  beforeMount() {
    if (this.id == 123) {
      this.found = false;
      document.title = "Not Found";
    } else {
      this.found = true;
    }
  }
};
</script>

<style>
</style>
