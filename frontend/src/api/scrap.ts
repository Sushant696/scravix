import axios from "axios";
import apiUrls from "@/utils/apiUrls";

const scrapReq = async (formData: any) => {
  try {
    const response = await axios.post(apiUrls.scrap.scrapReq, { formData });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};

export const scrapAction = { scrapReq };
