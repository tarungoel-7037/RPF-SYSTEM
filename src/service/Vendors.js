import axiosInstance from "../utils/axiosInstance.js";
import API from "../constants/ApiConst";

export const getVendors = () => {
  return axiosInstance.get(API.VENDORS_LIST);
};

export const approveVendor = (payload) => {
  return axiosInstance.post(API.APPROVE_VENDOR, payload);
};

export const disapproveVendor = (userId) => {
  return axiosInstance.post(`/vendors/${userId}/disapprove/`);
};

export const getVendorsByCategory = (id) => {
  return axiosInstance.get(`${API.VENDORS_LIST}${id}`);
};


// import axiosInstance from "../utils/axiosInstance.js";
// import API from "../constants/ApiConst";

// export const getVendors = () => {
//   return axiosInstance.get(API.VENDORS_LIST);
// };

// export const approveVendor = (payload) => {

//   return axiosInstance.post(API.APPROVE_VENDOR, payload);
// };

// export const getVendorsByCategory = (id) => {
//   return axiosInstance.get(`${API.VENDORS_LIST}/${id}`);
// };
