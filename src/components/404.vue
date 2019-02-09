<template>
  <section>
    <div class="jumbotron">
      <div class="text-center">
        <i class="fa fa-5x fa-frown-o" style="color:#d9534f;"></i>
      </div>
      <h1 class="text-center">404 Not Found</h1>
      <h1 class="text-center">
        <i class="fas fa-frown fa-lg fa-fw"></i>
      </h1>
      <p class="text-center">Try pressing the back button or clicking on this button.</p>
      <p class="text-center">
        <router-link :to="{name:'home'}" class="btn btn-primary">
          <i class="fa fa-home">&nbsp;&nbsp;</i>Take Me Home
        </router-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Not Found",
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.url = window.location.href;
  }
};
</script>

<style>
</style>
