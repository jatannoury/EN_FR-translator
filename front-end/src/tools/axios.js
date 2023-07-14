import axios from "axios";

class Axios {
  constructor() {
        this.axios_object = axios.create({
    baseURL: "http://localhost:8000", // Replace with your desired base URL
    });

  }
  ping(){
    this.axios_object
      .get("/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  register(formData){
    this.axios_object
      .post("/register", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
const axiosInstance = new Axios();

export default axiosInstance;