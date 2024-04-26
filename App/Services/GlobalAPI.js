import axios from "axios";

const BASE_URL = "http://192.168.1.2:1337/api";

const API_KEY =
    "9c6562f38df7a9a15465ea91eafbe37c722306a73b4693cd1fca98006b92b10c4e97e561f56aca264783c2e6ce2cd3543e1c7b7ffd728bdbc5ae240852d5e364afa4056a309d12a982ca2c9ffca93981ca98018527e2862cdcefc7b2290d27016612458aa93967624610fe4285b4bc5841f3e60754077bb3a1fbe59c077f7105";

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: "Bearer" + API_KEY,
    },
});

const getSlider = () => AxiosInstance.get("/sliders?populate=*");

const getCategories = () => AxiosInstance.get("/categories?populate=*");

const getPremiumHospitals = () =>
    AxiosInstance.get("/hospitals?filters[Premium][$eq]=true&populate=*");

const getHospitalsByCategory = (category) =>
    AxiosInstance.get(
        "hospitals?filters[Categories][Name][$in]=" + category + "&populate=*"
    );

export default {
    getSlider,
    getCategories,
    getPremiumHospitals,
    getHospitalsByCategory,
};
