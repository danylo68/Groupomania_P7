<template>
  <div class="list row">
    <!-- <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div> -->
    <div class="col-md-6">
      <h4>Comments List</h4>
      <ul class="list-group">
        <li class="list-group-item"
        
        
          :class="{ active: index == currentIndex }"
          v-for="(comment, index) in comments"
          :key="index"
          @click="setActiveComment(comment, index)"
        >
          {{ comment.title }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllComments">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentComment">
        <h4>Comment</h4>
    
        <div>
          <label><strong>Description:</strong></label> {{ currentComment.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentComment.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/comments/' + currentComment.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Comment...</p>
      </div>
    </div>
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
      title: ""
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