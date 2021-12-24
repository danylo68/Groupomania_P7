<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="article.content"
          name="content"
        />
      </div>
      
       <!-- <div id="app">
    <div class="container" style="width:600px">
      <div class="my-4">
        <h3>bezkoder.com</h3>
        <h4>Vue.js upload Image with Preview</h4>
      </div>

      <upload-image></upload-image>
    </div>
  </div> -->
      
      

      <button @click="saveArticle" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newArticle">Add</button>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";
// import UploadImage from "./components/UploadImage";

export default {

// name: "App",
//   components: {
//     UploadImage
//   },


  name: "add-article",
  data() {
    return {
      article: {
     username: "",
        title: "",
        content: "",
        article_id:"",
        updated_at:"",
        created_at:"",
        
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveArticle() {
      var data = {
        title: this.article.title,
        content: this.article.content
      };

      ArticleDataService.create(data)
        .then(response => {
          this.article.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newArticle() {
      this.submitted = false;
      this.article = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>