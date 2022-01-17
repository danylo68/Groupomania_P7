import http from "../http-common";

class CommentDataService {
    getAll() {
        return http.get("/comments");
    }

    get(id) {
        return http.get(`/comments/${id}`);
    }

    create(data) {
        return http.post("/comments", data);
    }

    update(id, data) {
        return http.put(`/comments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/comments/${id}`);
    }

    deleteAll() {
        return http.delete(`/comments`);
    }

    findByTitle(title) {
        return http.get(`/comments?title=${title}`);
    }
}

export default new CommentDataService();