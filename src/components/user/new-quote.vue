<template>
  <section>
    <div class="row">
      <form @submit.prevent="sendSubmit">
        <div class="form-group">
          <label for="txt">Quote</label>
          <input type="text" id="txt" v-model="qtext">
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
    return {
      q: false,
      author: "",
      qtext: "",
      success: false
    };
  },
  methods: {
    sendSubmit() {

      const data = JSON.stringify({
        author: this.author,
        text: this.qtext
      });
      this.success = true;

      fetch('/api/quotes/', {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
        if (!resp.ok && resp.status === 404) {
          this.success = false;
          throw new Error("Something Went Wrong");
        } else {

        }
      })
      .catch(alert);



    // if(this.q){
    //   let data = { text: this.qtext, author:"" };
    // }

    },
    // test(){
    //   const data = JSON.stringify({
    //     author: this.author,
    //     text: this.qtext
    //   });
    //   this.success = true;
    //   fetch('/api/quotes/',{
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }).then((res) => console.log(res))
    // }
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
