import axios from 'axios';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://52.72.57.160/backend', // Your base API URL
  timeout: 10000, // Optional: Set a timeout for requests
});

// Request interceptor to add headers (like authorization) dynamically based on the endpoint
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token if available
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle server-side errors (e.g., 500, 404)
      console.error('Error response:', error.response);
    } else if (error.request) {
      // Handle network errors
      console.error('Error request:', error.request);
    } else {
      // Handle any other error
      console.error('Error message:', error.message);
    }

    return Promise.reject(error);
  }
);

// Method to make API calls with dynamic endpoint
const makeRequest = (endpoint, method = 'GET', data = null) => {
  const dynamicURL = `/user/${endpoint}`;  // Dynamically append the endpoint to the base URL

  return axiosInstance({
    url: dynamicURL,  // Use the dynamic URL here
    method: method,   // Default to GET method
    data: data,       // Send data for POST/PUT requests
  });
};

export { axiosInstance, makeRequest };
