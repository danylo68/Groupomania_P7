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
      
      <input type="file" accept="image/*" name="imagesArray" @change="onChange" />
      <div id="preview">
   
    </div>
      
      <button @click="saveArticle" class="btn btn-success">Submit</button>
    </b-form-group>

    <b-form v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newArticle">Add</button>
    </b-form>
    </b-container>
    
  </div>
  
</template>


<script>



import ArticleDataService from "../services/ArticleDataService";


  export default {
  name: "add-article",
  
  data() {
    return {
   
    submitted: false,

    article: {
      id: null,
      title: "",       
      image: String,
     
      description: "",    
      published: false,
      imagesArray: null,
    },  
    };
  },
  
  methods: {
      onChange (event) {
        this.imagesArray = event.target.files[0]
      },

  saveArticle() {
    
    const formData = new FormData();
  
    formData.append('image', this.imagesArray)
    formData.append('title', this.article.title)
    formData.append('description', this.article.description)
        
      
      ArticleDataService.create(formData)
        .then(response => {
        console.log(response)
        // this.article.id = response.data.id;
        // this.image = response.data.image

        // console.log(response.data);
        // this.submitted = true;
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

