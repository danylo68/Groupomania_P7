
import axios from "axios";
// import authHeader from './auth-header';
const baseUrl = "http://localhost:3000/api";

class UploadFilesService {
    upload(file, onUploadProgress) {
        const formData = new FormData();
        formData.append("file", file);

        let config = {
            headers: {
                "Content-Type": "multipart/form-data, application/json"
            },
            onUploadProgress
        }
        return axios.post(`${baseUrl}/articles`, formData, config
            // return axios.post(`${baseUrl}/upload/article/,article_id`, formData, config
        );
    }

    getFiles() {
        // return axios.get(`${baseUrl}/files, config`,)
        return axios.get(`${baseUrl}/files`);
        // .then(response => (this.file = response.files))
        // .catch(error => console.log(error))
    }
}

export default new UploadFilesService();