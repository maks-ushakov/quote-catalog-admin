<template>
  <section>
    <div class="row">
      <form @submit.prevent="sendSubmit()">
        <div class="form-group">
          <label for="txt">Quote</label>
          <input type="text" id="txt" v-model="qtxt">
        </div>
        <div class="form-group">
          <input type="checkbox" id="u" @change="q=!q">
          <label for="u">
            Original
            <small>(i created it)</small>
          </label>
        </div>
        <div class="form-group" v-show="!q">
          <label for="txt">Original Author</label>
          <input type="text" id="txt" v-model="author">
        </div>
        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return { q: false, author: "", qtext: "" };
  },
  methods: {
    sendSubmit() {
    if(this.q)
      let data = { text: this.qtext, author:"" };

    }
  },
  created() {
    fetch("/api/author/is-logged").then(resp => {
      if (!resp.ok) this.$router.push({ name: "login" });
    });
  }
};
</script>

<style>
</style>
