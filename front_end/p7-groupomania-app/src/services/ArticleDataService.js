import http from "../http-common";
import authHeader from './auth-header';

class ArticleDataService {
    getAll() {
        return http.get(`/articles`);
    }

    get(id) {
        return http.get(`/articles/${id}`, { headers: authHeader() });
    }

    create(data) {
        return http.post(`/articles`, data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`/articles/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(`/articles/${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return http.delete(`/articles`, { headers: authHeader() });
    }

    findByTitle(title) {
        return http.get(`/articles?title=${title}`);
    }
}

export default new ArticleDataService();