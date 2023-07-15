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
    return this.axios_object
      .post("/users/login", formData)
      .then((response) => {
        console.log(response);
        return response.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async translate(input_text) {
    return this.axios_object
      .get(`/translate/en_fr?text=${input_text}`)
      .then((response) => {
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
