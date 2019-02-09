<template>
  <section class="home">
    <div class="notepaper">
      <figure class="quote">
        <blockquote class="curly-quotes" v-cloak>{{text}}</blockquote>
        <figcaption class="quote-by" v-cloak>— {{name}}</figcaption>
      </figure>
    </div>
    <p class="text-right">
      <i class="fas fa-sync-alt fa-sm fa-fw r" @click="random()"></i>
    </p>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      text: ""
    };
  },
  methods: {
    random() {
      fetch("/api/quotes/random")
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else if (!resp.ok && resp.status === 404) {
            throw new Error("Not Found");
          } else if (!resp.ok && resp.status === 406) {
            throw new Error("Invalid Input");
          } else if (!resp.ok && resp.status === 503) {
            throw new Error("Something Went Wrong");
          }
        })
        .then(data => {
          console.log(data);
          (this.text = data.quote.text), (this.name = data.quote.author);
        })
        .catch(err => {
          alert(err.message);
        });
    }
  },
  created() {
    this.random();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notepaper {
  position: relative;
  transition: 0.3s;
  margin: 30px auto;
  padding: 29px 20px 20px 45px;
  width: 350px;
  line-height: 30px;
  color: #6a5f49;
  text-shadow: 0 1px 1px white;
  background-color: #f2f6c1;
  background-image: -webkit-radial-gradient(
      center,
      farthest-corner,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.1) 90%
    ),
    -webkit-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(
            239,
            207,
            173,
            0.7
          )
          29px, rgba(239, 207, 173, 0.7) 30px);
  /* background-image: -moz-radial-gradient(center, farthest-corner, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 90%), -moz-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(239, 207, 173, 0.7) 29px, rgba(239, 207, 173, 0.7) 30px); */
  /* background-image: -o-radial-gradient(center, farthest-corner, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 90%), -o-repeating-linear-gradient(top, transparent 0%, transparent 29px, rgba(239, 207, 173, 0.7) 29px, rgba(239, 207, 173, 0.7) 30px); */
  border: 1px solid #c3baaa;
  border-color: rgba(195, 186, 170, 0.9);
}

.notepaper:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
}

.notepaper:before {
  left: 28px;
  width: 4px;
  border: solid #efcfad;
  border-color: rgba(239, 207, 173, 0.9);
  border-width: 0 1px;
}

.quote {
  font-size: 15px;
  margin-bottom: 0;
}

.curly-quotes:before,
.curly-quotes:after {
  display: inline-block;
  font-family: Georgia, serif;
  vertical-align: top;
  height: 30px;
  line-height: 48px;
  font-size: 50px;
  opacity: 0.8;
}

.curly-quotes:before {
  content: "\201C";
  margin-right: 4px;
  margin-left: -8px;
}

.curly-quotes:after {
  content: "\201D";
  margin-left: 4px;
  margin-right: -8px;
}

.quote-by {
  display: block;
  padding-right: 10px;
  text-align: right;
  font-size: 13px;
  font-style: italic;
  color: #84775c;
}

.lt-ie8 .notepaper {
  padding: 15px 25px;
}

blockquote {
  margin-bottom: 0px;
}

@media screen and (max-width: 767px) {
  .notepaper {
    width: 100%;
  }
}
.r {
  cursor: pointer;
}
</style>
