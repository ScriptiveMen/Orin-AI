import axios from "axios";

const instance = axios.create({
    baseURL: "https://orin-ai.onrender.com",
});

export default instance;
