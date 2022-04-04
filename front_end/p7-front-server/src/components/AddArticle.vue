<style scoped>

.form-control
{

width: 300px;
}

.form-group {
max-width:500px;
display: flex;
justify-content: center;
margin-right: 0rem;
margin-bottom: 1rem;
    margin-top: 1rem;

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

    <div v-if="!submitted">
    
      <b-input-group class="form-group p-3">  
      
       <b-input-group-prepend  is-text>
       <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
      </b-input-group-prepend>
        <b-form-input
          type="text"    
           placeholder="Title"         
          class="form-control"
          ref="article_title"
          id="title"        
          required
          v-model="article.title"
          name="title"
        ></b-form-input>
      </b-input-group>
      
    <b-input-group class="form-group p-3">
      
<b-input-group-prepend is-text>
<b-icon icon="pencil-fill" aria-hidden="true"></b-icon>

</b-input-group-prepend>
        <b-form-input
         type="text" 
          class="form-control"
          ref="article_description"
          id="description"
          placeholder="Description"
          required
          v-model="article.description"
          name="description"
        ></b-form-input>
      </b-input-group>
      
    <b-input-group class="form-group p-3">
    <b-input-group-prepend>

    </b-input-group-prepend>
    
      <b-form-file
      placeholder="Upload your file"
      class="form-control"
      ref="article_image"
      type="file"
      accept="image/*"
      name="imagesArray" 
      @change="onChange" ></b-form-file>
      <!-- <div id="preview"> -->
   
   <b-input-group-append>
     <b-button @click="saveArticle" variant="success"  p-3>Submit </b-button>
   </b-input-group-append>
 
</b-input-group>
    </div>

   <b-form class="add-succes" v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newArticle">Add</button>
    </b-form>
   
    
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
      user_id:"",
    },  
    };
  },
  
  methods: {
      onChange (event) {
        this.imagesArray = event.target.files[0]
      },
      fortmatResponse(res) {
      return JSON.stringify(res, null, 2);
    },
    
  saveArticle() {
  const formData = new FormData();
  formData.append('image', this.imagesArray)
  formData.append('title', this.article.title)
  formData.append('description', this.article.description)
  

      ArticleDataService.create(formData)
        .then(response => {
        console.log(response)
        this.article = response.data.id
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

