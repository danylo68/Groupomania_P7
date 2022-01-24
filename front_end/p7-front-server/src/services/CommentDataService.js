import axios from 'axios'
import authHeader from './auth-header';


let config = {
    headers: authHeader()

}
let baseUrl = "http://localhost:3000/api"


class CommentDataService {
    getAll() {
        return axios.get(`${baseUrl}/comments`)
            .catch(function (error) {
                console.log(error.toJSON());
            });
    }

    get(id) {
        return axios.get(`${baseUrl}/comments/${id}`, config);
    }

    create(data) {
        return axios.post(`${baseUrl}/comments`, data, config);
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