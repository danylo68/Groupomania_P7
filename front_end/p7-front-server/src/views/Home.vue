
<style scoped>
.post-container{
/* background-color: rgb(218, 216, 210); */
margin-top: 1em;
height: 100%;
display: flex;
justify-content: center;

}
.head-img
{
border-radius: 25px;
display: flex;

}

.card {
border-radius: 1,25rem;    
        
}
</style>




<template>

  <div class="post-container">

      <b-container class="w-75 mx-md  pt-3">

     
              
              
               <b-row class="head-img ml-5"  >

                <b-col cols="6" md="3">
              
                <b-img  src="https://picsum.photos/id/668/200/200" class="shadow" rounded alt="Rounded image"></b-img>
              
                </b-col>
                
                
                

                <b-col cols="6" md="">
              
                <b-img  src="https://picsum.photos/id/998/200/200" class="shadow" rounded alt="Rounded image"></b-img>
              
                </b-col>
                
                
                <b-col cols="6" md="3">
            
                <b-img src="https://picsum.photos/id/674/200/200" class="shadow" rounded alt="Rounded image"></b-img>
                      
                </b-col>
                
                
                <b-col cols="6" md="3" >
            
                <b-img src="https://picsum.photos/id/598/200/200" class="shadow" rounded alt="Rounded image "></b-img>
              
                </b-col>
                
          
         </b-row> 
       
              
       
              
  
    <b-row class="row mx-md p-4">
            
     <b-col  class="mt-0 p-0 rounded shadow">
     
     <b-card header>Header</b-card>
     <b-card
      title="Card title that wraps to a new line"
      img-src="https://picsum.photos/id/948/1200/200"
     rounded alt="Rounded image"
      img-top 
    >
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
          This is a wider card with supporting text below as a natural lead-in to additional content.
      
      </b-card-text>
    </b-card>
     <b-card footer>footer</b-card>
     </b-col>
  
  </b-row>
  
  
  
   <b-row class="row mx-md p-4">
   <b-col  class="mt-0 p-0 rounded shadow">
       <b-card header bg-transparent>Header</b-card>
         <b-card
          title="Card title that wraps to a new line"
          img-src="https://picsum.photos/id/798/1200/200"
         rounded alt="Rounded image"
          img-top 
        >
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
              This is a wider card with supporting text below as a natural lead-in to additional content.
          </b-card-text>
        </b-card>
          <b-card footer>footer</b-card>
         </b-col>
         </b-row>
     
     
     <b-row class="row mx-md p-4">
           <b-col  class="mt-0 p-0 rounded shadow">
           <b-card header bg-transparent>Header</b-card>
           <b-card 
           mt-3
            title="Card title that wraps to a new line"
            img-src="https://picsum.photos/id/802/1200/200"
           rounded alt="Rounded image"
            img-top
          >
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
                This is a wider card with supporting text below as a natural lead-in to additional content.
          
            </b-card-text>
          </b-card>
            <b-card footer>footer</b-card>   
           </b-col>
           </b-row>
           
           
           
           
     
        <b-row class="row mx-md p-4">
            <b-col  class="mt-0 p-0 rounded shadow">
            <b-card header bg-transparent>Header</b-card>
           <b-card
           mt-3
            title="Card title that wraps to a new line"
            img-src="https://picsum.photos/id/237/1200/200"
           rounded alt="Rounded image"
            img-top
          >
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
                This is a wider card with supporting text below as a natural lead-in to additional content.
            </b-card-text>
          </b-card> 
           <b-card footer>footer</b-card>
           </b-col>
           </b-row>
      
   
</b-container>
    
  </div>
</template>


<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>