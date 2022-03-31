import axios from 'axios'
import authHeader from './auth-header';


// const baseUrl = "http:///192.168.1.26:3000/api"
const baseUrl = "http://localhost:3000/api"

class CommentDataService {
    getAll(article_id) {
        return axios.get(`${baseUrl}/comments/?article_id=${article_id}`);
    }

    get(id) {
        return axios.get(`${baseUrl}/comments/${id}`, { headers: authHeader() });
    }

    create(data) {
        return axios.post(`${baseUrl}/comments/:article_id`, data, { headers: authHeader() });
    }

    update(article_id, data) {
        return axios.put(`${baseUrl}/comments/?article_id=${article_id}`, data, { headers: authHeader() });
    }

    delete(article_id) {
        return axios.delete(`${baseUrl}/comments/?article_id=${article_id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(`${baseUrl}/comments/`, { headers: authHeader() });
    }

    findByTitle(title) {
        return axios.get(`${baseUrl}/comments/?title=${title}`);
    }
}

export default new CommentDataService();