<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="comment.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="comment.description"
          name="description"
        />
      </div>

      <button @click="saveComment" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newComment">Add</button>
    </div>
  </div>
</template>

<script>
import CommentDataService from "../services/CommentDataService";

export default {
  name: "add-comment",
  data() {
    return {
     comment: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveComment() {
      var data = {
        title: this.comment.title,
        description: this.comment.description
      };

     CommentDataService.create(data)
        .then(response => {
          this.comment.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newComment() {
      this.submitted = false;
      this.comment = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>