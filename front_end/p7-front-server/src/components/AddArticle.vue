<style scoped>

.form-control
{
/* display: flex; */

width: 300px;
}

/* .btn-success{
margin-left: 10px;
;
} */
.form-group {
max-width:500px;
display: flex;
justify-content: center;
margin-right: 0rem;


}
b-form-input
{
border-radius: 10px ;
}
.add-succes
{
padding: 4px;
height: 6rem;
}

</style>


<template>
 <div class="col-md-8"> 
  <!-- <b-container class="add_article" > -->
  <!-- <h4>Postez votre article</h4> -->
    <div v-if="!submitted">
    
      <b-input-group class="form-group p-3">  
      
       <b-input-group-prepend is-text>
     <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-file-earmark-text"
  viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
</svg>
      </b-input-group-prepend>
        <b-form-input
          type="text"    
           placeholder="Title"         
          class="form-control"
          id="title"        
          required
          v-model="article.title"
          name="title"
        ></b-form-input>
        
      </b-input-group>
      
      

    <b-input-group class="form-group p-3">
      
<b-input-group-prepend is-text>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-journal-text"
  viewBox="0 0 16 16">
  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg>
</b-input-group-prepend>
        <b-form-input
         type="text" 
          class="form-control"
          id="description"
          placeholder="Description"
          required
          v-model="article.description"
          name="description"
        ></b-form-input>
        
      </b-input-group>
      
    <b-input-group class="form-group p-3">
    
    <b-input-group-prepend>
   <!-- <span class="input-group-file" id="upload-file">Photo</span> -->
    </b-input-group-prepend>
    
      <b-form-file
      placeholder="Upload your file"
      type="file"
      accept="image/*"
      name="imagesArray" 
      @change="onChange" ></b-form-file>
      <!-- <div id="preview"> -->
   
   
   <b-input-group-append>
     <b-button @click="saveArticle" variant="success"  p-3>Submit </b-button>
   </b-input-group-append>
    <!-- </div> -->
      <!-- <b-button>Button</b-button> -->
</b-input-group>
    </div>

   <b-form class="add-succes" v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newArticle">Add</button>
    </b-form>
    <!-- </b-container> -->
    
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
        this.submitted = true;
        // this.$refs['formData'].resetFields();

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

