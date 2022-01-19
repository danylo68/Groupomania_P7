
import axios from 'axios'
import authHeader from './auth-header';


let config = {
    headers: authHeader()

}
let baseUrl = "http://localhost:3000/api"


class ArticleDataService {
    getAll() {
        return axios.get(`${baseUrl}/articles`)
            .catch(function (error) {
                console.log(error.toJSON());
            });
    }

    get(id) {
        return axios.get(`${baseUrl}/articles/${id}`, config);
    }

    create(data) {
        return axios.post(`${baseUrl}/articles`, data, config);
    }

    update(id, data) {
        return axios.put(`${baseUrl}/articles/${id}`, data, config);
    }

    delete(id) {
        return axios.delete(`${baseUrl}/articles/${id}`, config);
    }

    deleteAll() {
        return axios.delete(`${baseUrl}/articles/`, config);
    }

    findByTitle(title) {
        return axios.get(`${baseUrl}/articles/?title=${title}`, config);
    }
}

export default new ArticleDataService();