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
    <table class="table"
          
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Author</th>
          <th scope="col">Text</th>
          <th scope="col">Posted</th>
          <th class='quote-delete' scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quote, index) in allQuotes" :key="index" >
          <th scope="row">{{index+1}}</th>
          <td>{{quote.author}}</td>
          <td>
            <div class="textarea-wrap">
              <textarea-autosize
                      placeholder="Type something here..."
                      v-bind:value="quote.text"
                      :min-height="30"
                      :max-height="350"
                      @input="writeQuote($event)"
                      @input.native="showCheck(quote._id)"


              ></textarea-autosize>

                <i class="confirm fas fa-check-circle"
                   :class="{highlight: quote._id === selected}"
                   @click="quoteUpdate(quote._id)"
                ></i>

            </div>

          </td>
          <td>{{quote.postedOn}}</td>
          <td class='quote-delete'
          @click="quoteDelete(quote._id)"
          ><i class="fas fa-trash-alt"></i></td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
export default {
  data() {
    return {
      allQuotes: [],
      quoteToChange: '',
      selected: undefined,
    };
  },
  methods: {
    r() {
      this.$router.push({ name: "new-quotes" });
    },
    getQuotes() {
      fetch("/api/quotes/")
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(data => {
        this.allQuotes = data.quotes;
        
        for(var i=0; i < this.allQuotes.length; i++){
          var date = new Date(this.allQuotes[i].postedOn);
          var day = date.getDate();
          var month = date.getMonth();
          var year = date.getFullYear();
          this.allQuotes[i].postedOn = year + '-' + month + '-' + day
        }
        
      })
      .catch(err => {
        alert(err.message);
      });
    },
    quoteDelete(i){
       fetch('/api/quotes/'+ i, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
        if (!resp.ok && resp.status === 404) {
          this.success = false;
          throw new Error("Something Went Wrong");
        } else {
           this.getQuotes()
        }
      })
      .catch(alert);
    },
    quoteUpdate(id) {
      const data = JSON.stringify({
        text: this.quoteToChange
      });
      this.success = true;

      fetch('/api/quotes/'+id, {
        method: "PUT",
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
                  this.getQuotes();
                }
              })
              .catch(alert);
    },
    writeQuote(data){

      this.quoteToChange = data;

    },
    showCheck(id){
      this.selected = id
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

      this.getQuotes()
  },

  beforeMount() {}
};

</script>

<style scoped>
  .table {
    font-size: 20px;
    background-color: #ffffff4d;
    box-shadow: 0px 16px 20px 10px rgba(82, 82, 183, 0.75);
  }
   thead{
      background-color: #4516a729;
    }
  .table thead th {
    border-top: 1px solid rgba(82, 82, 183, 0.75);
    border-bottom: 2px solid rgba(82, 82, 183, 0.75);
  }
  table td, table th{
    vertical-align: middle;
    cursor: default;
  }
  .quote-delete{
    text-align: center;
    cursor: pointer;
  }
  td.quote-delete:hover{
    background: #070cff8a;;
    cursor: pointer;
    color: #fff;
  }
  tbody tr:hover {
    background: #848fe45c;
  }
  .textarea-wrap{
    display: flex;
  }
  textarea {
    width: 100%;
    padding-right: 40px;
    background: inherit;
    border: none;
    outline: none;
  }
  .confirm {
    visibility: hidden;
    width: 50px;
    padding: 0;
    margin: 0;
  }
  .confirm.highlight {
    visibility: visible;
    margin: auto 0;
    font-size: 25px;
    color: #04ab6fcc;
    cursor: pointer;
  }
  .confirm.highlight:hover{
    font-size: 28px;
    transition: .15s;
  }
  .fa-check-circle{
    color: green;
  }
</style>
