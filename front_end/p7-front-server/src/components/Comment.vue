<template>
  <div v-if="currentComment" class="edit-form">
    <h4>Comment</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentComment.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentComment.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentComment.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentComment.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteComment"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateComment"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Comment...</p>
  </div>
</template>

<script>
import CommentDataService from "../services/CommentDataService";

export default {
  name: "Comment",
  data() {
    return {
      currentComment: null,
      message: ''
    };
  },
  methods: {
    getComment(id) {
      CommentDataService.get(id)
        .then(response => {
          this.currentComment = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentComment.id,
        title: this.currentComment.title,
        description: this.currentComment.description,
        published: status
      };

      CommentDataService.update(this.currentComment.id, data)
        .then(response => {
          this.currentComment.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateComment() {
      CommentDataService.update(this.currentComment.id, this.currentComment)
        .then(response => {
          console.log(response.data);
          this.message = 'The Comment was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteComment() {
      CommentDataService.delete(this.currentComment.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Comments" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getComment(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>