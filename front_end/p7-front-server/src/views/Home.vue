
<style scoped>
.post-container{
background-color: rgb(218, 216, 210);
margin-top: 1em;
height: 100%;
display: flex;
justify-content: center;
}
/* .head-img
{
border-radius: 25px;
display: flex;
} */

.contain-cards
{
background-color: rgb(236, 235, 232);
max-width: 1000px;
padding: 70px;
}

.sec-nav{
width: 97%;
height: 80px;
background-color: white;
margin-left: 0;
position: relative;
margin-top: 20px;
color:black ;
display: flex;
justify-content: center;
    margin-left: 12px;
}
.nav-link {
    display: block;
    padding: 0.5rem 1rem;
    color: #010811;
}


</style>

<template>

 <div>
  
         <b-container class="contain-cards mx-md ">     
     <b-row class="sec-nav p-1 rounded shadow">

            <b-nav fixed="top" >
            
    <!-- <b-nav-item active>Active</b-nav-item> -->
    <b-nav-item>
    <!-- <b-button pill variant="outline-secondary"><router-link to="/add" class="nav-link"><h6>Post Article</h6></router-link></b-button> -->
    </b-nav-item>
    <b-nav-item>
    <!-- <b-button pill variant="outline-secondary"><router-link to="/article" class="nav-link"><h6>Article</h6></router-link></b-button> -->
    </b-nav-item>
    <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
  </b-nav>
       
         </b-row> 
       
            
    <b-row class="row mx-md p-4">       
     <b-col  class="mt-0 p-0 rounded shadow">  
     <b-card header>Title</b-card>
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
     <b-card footer><b-icon icon="chat-left-text" aria-hidden="true"></b-icon></b-card>
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