import axios from "axios";
const BASE_URL = "http://localhost:4000/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const fetchAsigurari = async (userId: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${BASE_URL}asigurari/${userId}`,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const asigurareNoua = async (
  formData: object
) => {
  try {
    await axios.post(
      `${BASE_URL}asigurari/create`,
      {
        formData
      }
    );
  } catch (err) {
    console.log(err);
  }
};