import axiosInstance from "../utils/axiosInstance.util"

export const createShortUrl = async (url) => {
    const dataUrl = await axiosInstance.post("/api/create", { url })
    console.log(dataUrl);
    const finalIrl = dataUrl.config.baseURL +"/"+ dataUrl.data;
    return finalIrl
}