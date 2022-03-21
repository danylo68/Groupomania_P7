import axios from 'axios'
import authHeader from './auth-header';


let config = {
    headers: authHeader()
}
// const baseUrl = "http:///192.168.1.26:3000/api"
const baseUrl = "http://localhost:3000/api"

class CommentDataService {
    getAll(article_id) {


        // getAll() {
        return axios.get(`${baseUrl}/comments/?article_id=${article_id}`);

    }

    get(id) {
        return axios.get(`${baseUrl}/comments/${id}`, config);
    }

    create(data) {
        return axios.post(`${baseUrl}/comments/:article_id`, data, config);
    }

    update(id, data) {
        return axios.put(`${baseUrl}/comments/${id}`, data, config);
    }

    delete(id) {
        return axios.delete(`${baseUrl}/comments/${id}`, config);
    }

    deleteAll() {
        return axios.delete(`${baseUrl}/comments/`, config);
    }

    findByTitle(title) {
        return axios.get(`${baseUrl}/comments/?title=${title}`, config);
    }
}

export default new CommentDataService();