
import axios from 'axios'
import authHeader from './auth-header';

// const baseUrl = "http:///192.168.1.26:3000/api"

const baseUrl = "http://localhost:3000/api"

class ArticleDataService {

    getAll() {
        return axios.get(`${baseUrl}/articles`, { headers: authHeader() })
    }

    get(id) {
        return axios.get(`${baseUrl}/articles/${id}`, { headers: authHeader() });
    }

    create(data) {
        return axios.post(`${baseUrl}/articles/`, data, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(`${baseUrl}/articles/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(`${baseUrl}/articles/${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(`${baseUrl}/articles/`, { headers: authHeader() });
    }

    findByTitle(title) {
        return axios.get(`${baseUrl}/articles/?title=${title}`);
    }
}

export default new ArticleDataService();