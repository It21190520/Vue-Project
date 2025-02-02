import Vue from "vue";
import axios from "axios";

// URL for pond status API
const POND_STATUS_URL = "https://www.waternet.lk/apps/watawala/api/summary/pond-status";

// Create an Axios instance for API requests
const ApiPondStatus = axios.create({
  baseURL: POND_STATUS_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch pond status data
const fetchPondStatus = async () => {
  try {
    const response = await ApiPondStatus.get();
    console.log("Pond Status Data:", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching pond status:", error?.message || error);
    throw error;
  }
};

// Assign function to Vue prototype for global access
Vue.prototype.$pondStatus = fetchPondStatus;

// Exporting Axios instance and function for reuse
export { fetchPondStatus, ApiPondStatus };
