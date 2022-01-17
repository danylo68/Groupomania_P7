
import axios from "axios";
// import authHeader from './auth-header';

let baseUrl = "http://localhost:3000/api"


class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        let config = {
            headers: {
                "x-access-token": "token-value",
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        }
        return axios.post(`${baseUrl}/upload`, formData, config
        );
    }

    getFiles() {
        return axios.get(`${baseUrl}/files, config`,)
            .then(response => (this.file = response.files))
            .catch(error => console.log(error))
    }
}

export default new UploadFilesService();