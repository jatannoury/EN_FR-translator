import axios from "axios";

class Axios {
  constructor() {
    this.axios_object = axios.create({
      baseURL: "http://localhost:8000", // Replace with your desired base URL
    });
  }
  ping() {
    this.axios_object
      .get("/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async register(formData) {
    return this.axios_object
      .post("/users/register", formData)
      .then((response) => {
        if (response.status === 201) {
          return 201;
        } else {
          return response.status;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async sign_in(formData) {
    console.log("formData", formData);
    return this.axios_object
      .post("/users/login", formData)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async translate(request_data) {
    return this.axios_object
      .post(`/translate/en_fr`, request_data)
      .then((response) => {
        console.log(response)
        if (response.status !== 201) {
          return 500;
        }
        return response;
      })
      .catch((error) => {
        return 500;
      });
  }
  async save_translation(translation_id){
    return this.axios_object
      .post(`/translate/save_translation?translation_id=${translation_id}`)
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          return 500;
        }
        return response;
      })
      .catch((error) => {
        return 500;
      });
  }
}
const axiosInstance = new Axios();

export default axiosInstance;
