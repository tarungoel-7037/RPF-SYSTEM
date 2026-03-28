import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst";

export const getRfps = () => {
  return axiosInstance.get(API.RFP_LIST);
};

export const closeRfp = (id) => {
  return axiosInstance.get(`${API.CLOSE_RFP}${id}`);
};

export const getRfpQuotes = (id) => {
  return axiosInstance.get(`${API.RFP_QUOTES}${id}`);
};

export const addRpf = (payload) => {
  return axiosInstance.post(API.CREATE_RPF, payload);
};

export const getRfpsByUserId = (id) => {
  return axiosInstance.get(`${API.RFP_BY_USER_ID}${id}`);
};

export const applyForRfp = (id, payload) => {
  return axiosInstance.post(`${API.RFP_APPLY}${id}/`, payload);
};



// import axiosInstance from "../utils/axiosInstance.js";
// import API from "../constants/ApiConst";

// export const getRfps = () => {
//   return axiosInstance.get(API.RFP_LIST);
// };

// export const closeRfp = (id) => {
//   return axiosInstance.get(`${API.CLOSE_RFP}/${id}`);
// };

// export const getRfpQuotes = (id) => {
//   return axiosInstance.get(`${API.RFP_QUOTES}/${id}`);
// };

// export const addRpf = (payload) => {
//   return axiosInstance.post(API.CREATE_RPF, payload);
// };

// export const getRfpsByUserId = (id) => {
//   return axiosInstance.get(`${API.RFP_BY_USER_ID}/${id}`);
// };

// export const applyForRfp = (id,payload) => {
//   return axiosInstance.post(`${API.RFP_APPLY}/${id}`,payload);
// };

