import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/", // your backend URL
  withCredentials: true, // important for cookies
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  
    
  (response) => response, // pass through if success
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try refreshing
    
    if (error.response?.status === 401 && originalRequest._retry===undefined) {

      originalRequest._retry = true;
    console.log("error.response?.status",error.response?.status,"originalRequest._retry",originalRequest._retry);
        
      try {
        // Call refresh token API
    generateRefreshToken()


        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired, logging out...");
        // optional: redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


const generateRefreshToken = async() => {
    try{
       await api.get('users/refresh-token', { withCredentials: true } );
        console.log("response=refresh", response);
       
    }
    catch(error){
        console.log("error",error.response);
    }
}
export default api;
