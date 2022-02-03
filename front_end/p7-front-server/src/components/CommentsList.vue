<template>
  <div class="list row">
   
    <div class="col-md-6">
     
      <ul class="list-group">
        <li class="list-group-item"
        
          :class="{ active: index == currentIndex }"
          v-for="(comment, index) in comments"
          :key="index"
          @click="setActiveComment(comment, index)">
        
         <span>{{ comment.user.username }}: </span>
            <h5>{{ comment.content }}</h5>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllComments">
        Remove
      </button>
        </li>
      </ul>
      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeComments">
        Remove
      </button> -->
    </div>
    
    
    
   
   
       <!-- <b-card bg-variant="light" header="Light" class="text-center">
        <h4>Comment</h4>
    
       <b-card-text>
          <label><strong>Content:</strong></label> {{ currentComment.content }}
        </b-card-text>
        
         <b-card>
          <label><strong>Status:</strong></label> {{ currentComment.published ? "Published" : "Pending" }}
         </b-card>b-card-text>

        <a class="badge badge-warning"
          :href="'/comments/' + currentComment.id"
        >
          Edit
        </a>
    </div>   
  </b-card> -->
  </div>
</template>

<script>
import CommentDataService from "../services/CommentDataService";

export default {
  name: "comments-list",
  data() {
    return {
      comments: [],
      currentComment: null,
      currentIndex: -1,
     
    };
  },
  methods: {
    retrieveComments() {
     CommentDataService.getAll()
        .then(response => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveComments();
      this.currentComment = null;
      this.currentIndex = -1;
    },

    setActiveComment(comment, index) {
      this.currentComment = comment;
      this.currentIndex = index;
    },

    removeAllComments() {
     CommentDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      CommentDataService.findByTitle(this.title)
        .then(response => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveComments();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

</style>