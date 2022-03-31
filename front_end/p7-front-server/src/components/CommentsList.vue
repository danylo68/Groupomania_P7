<style scoped>
.list-group-item {
  background-color: #e7f3ec;
  /* display: flex; */
box-shadow: 2px 3px 10px 6px lightgrey;

  height: auto;
  border-radius: 8px 8px 8px 8px;
  margin-top: 1rem;
  height: 180px;
  
}
.footer-card
{
display: flex;
font-size: 12px;
/* align-content: flex-end; */
justify-content: space-between;
border-radius: 12px 12px 12px 12px;
margin-bottom: 3rem;
}

</style>

<template>
  <div class="list row">
    <div class="col-md-12">
    
    
      <b-card
          class="list-group-item"
          v-for="comment in comments"
          :key="comment.id">
          
          <b-card-header>
        
          </b-card-header>  
          
          
          <b-card-body>
          <h6>{{ comment.content }}</h6>
          </b-card-body>
          
          <b-card-footer  class="footer-card">
         
          <p> comment id {{ comment.comment_id }}
          / article id: {{ comment.article_id }}</p>
          
      <b-button pill variant="outline-danger" size="sm"
      @click="deleteComment(comment.comment_id)" >
    <b-icon icon="trash" aria-hidden="true"></b-icon>
    </b-button>
         </b-card-footer>
         
      </b-card>
    </div>
   
  </div>
</template>

<script>
import CommentDataService from '../services/CommentDataService'

export default {
  name: 'comments-list',
  
   props: {
    article_id: {
      type: Number,
      default: null
    },
    // comment_id: {
    //   type: Number,
    //   default: null
    // }
   
  },
 
  data () {
    return {
      comments: [],
      articles: [],
      currentComment: null,
      currentIndex: -1,
      index: '',
      comment: '',
      article: '',
      filterData: '',
      parameters: '',
      data: '',
      user_id: "",
      comment_id: ""
    }
  },

  methods: {
    retrieveComments () {
      CommentDataService.getAll(this.article_id)
        .then(response => {
          this.comments = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    refreshList () {
      this.retrieveComments()
      this.currentComment = null
      this.currentIndex = -1
    },

    setActiveComment (comment, index) {
      this.currentComment = comment
      this.currentIndex = index
    },

      deleteComment(comment_id) {
     this.comment_id = this.comment.comment_id
     console.log(comment_id)
      CommentDataService.delete(comment_id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Comments" });
          this.refreshList()
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    
    
    searchTitle () {
      CommentDataService.findByTitle(this.title)
        .then(response => {
          this.comments = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  
  mounted () {
    this.retrieveComments()
     console.log('COMMENTS')
    console.log(this.article_id)
  }
}

</script>
