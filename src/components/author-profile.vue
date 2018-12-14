<template>
  <section>
    <div class="alert alert-warning" v-show="showNL" v-cloak>Login To View Profile of '{{id}}'</div>
    <div class="alert alert-info" v-show="showNF" v-cloak>Author Not Found</div>
    <div v-show="!showNL && !showNF" v-cloak>
      <p>Name : {{author.name}}</p>
      <p>Email : {{author.email}}</p>
      <p>Registered : {{author.joined}}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      showNL: false,
      showNF: false,
      author: {}
    };
  },
  methods: {
    showProfile() {
      fetch("/api/author/" + this.id)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else if (!resp.ok && resp.status == 405) {
            this.showNL = true;
          } else if (!resp.ok && resp.status == 404) {
            this.showNF = true;
          } else if (!resp.ok && resp.status == 503) {
            alert("Something Went Wrong");
          }
        })
        .then(data => {
          this.author = data.author;
          document.title = `Author : ${this.author.name}`;
        });
    }
  },
  created() {
    this.showProfile();
  },
  updated() {}
};
</script>

<style>
</style>
