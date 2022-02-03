<style scoped>
.submit-form {
  margin-bottom: 10em;
  margin: auto;
   z-index: 10;
     box-shadow: 0px 13px 34px rgba(0, 0, 0, 0.3);
     border: 1px solid rgb(196, 189, 189);
     height: 350px;
     bottom: 55em;
     width: 350px;
     display: flex;
     justify-content: center;
     align-content: center;
     position: relative;
}

.form-control
{
display: flex;
justify-content: center;
width: 300px;
}

.img {
height: 50px;
width: auto;
}
.btn-success{
margin-left: 10px;
}
.form-group {
max-width:750px;
display: flex;
justify-content: center;
}
.post_article{
display: flex;


}

</style>



<template>
 <div class="col-md-12"> 
 <!-- <b-img :src="require(`@/assets/icon-left-black.png`)" alt="Responsive image"></b-img> --> 
  <!-- <div class="submit-form rounded "> -->
  <b-container class="post_article" >
  <h4>Post d'Article</h4>
    <b-form-group v-if="!submitted">
    
    
      <div class="form-group p-3">
        <label for="title">Title</label>
        <b-form-input 
          type="text"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
        />
      </div>

      <div class="form-group p-3">
        <label for="description">Description</label>
        <b-form-textarea p-3
          class="form-control"
          id="description"
          required
          v-model="article.description"
          name="description"
        />
      </div>
      
      <button @click="saveArticle" class="btn btn-success">Submit</button>
    </b-form-group>

    <b-form v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newArticle">Add</button>
    </b-form>
    </b-container>
  </div>
  
  <!-- </div> -->
  
</template>


<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "add-article",
  data() {
    return {
      article: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  

  methods: {
    saveArticle() {
      var data = {
        title: this.article.title,
        description: this.article.description
      };
      console.log("toto")
      ArticleDataService.create(data)
        .then(response => {
          this.article.id = response.data.id;
          // Upload image
          // url/artciles/ this.article.id  / uploa
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

