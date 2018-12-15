<template>
  <section>
    <form @submit.prevent="SendSubmit()">
      <div class="form-group">
        ID :
        <input type="text" v-model="author.id" @blur="checkID()" @focus="existsID=false">
        <p v-show="existsID">Taken</p>
      </div>
      <div class="form-group">
        Name :
        <input type="text" v-model="author.name">
      </div>
      <div class="form-group">
        <b>Note: To change password, logout and request new password from login</b>
      </div>
      <div class="form-group">
        <b>
          Note: To delete account, create issue at
          <a
            href="https://github.com/chingu-voyage7/bears-team-25/issues/new?template=delete_account.md"
            target="_blank"
          >Here</a>
        </b>
      </div>
      <div class="form-group">
        <button type="submit" :disabled="btn!='Update'">{{btn}}</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      author: {
        id: "",
        name: ""
      },
      existsID: false,
      btn: "Update"
    };
  },
  methods: {
    SendSubmit() {
      const data = JSON.stringify(this.author);
      this.btn = "Updating";
      fetch("/api/author/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }).then(resp => {
        if (resp.ok) {
          this.btn = "Updated";
          setTimeout(() => {
            this.btn = "Update";
          }, 1500);
        } else {
          // handle other error
        }
      });
    },
    checkID() {
      fetch("/api/author/check-id/" + this.author.id).then(resp => {
        if (resp.ok) {
          this.existsID = true;
        } else if (resp.status == 404) {
          this.existsID = false;
        }
      });
    }
  },
  created() {
    fetch("/api/author/is-logged").then(resp => {
      if (!resp.ok) {
        this.$router.push({ name: "not-found" });
      }
      fetch("/api/author/update")
        .then(resp => {
          if (resp.ok || resp.status == 304) {
            return resp.json();
          } else {
            // need to be implemented
          }
        })
        .then(data => {
          this.author.id = data.author.id;
          this.author.name = data.author.name;
        });
    });
  }
};
</script>

<style>
</style>
