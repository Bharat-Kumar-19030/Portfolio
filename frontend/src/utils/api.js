import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 120000, // 2 minutes - enough for Render free tier to wake up
});

// Retry logic for failed requests (Render cold start)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Retry once if connection closed/timeout and not already retried
    if (!config._retry && (
      error.code === 'ERR_NETWORK' || 
      error.code === 'ECONNABORTED' ||
      error.message.includes('timeout') ||
      error.message.includes('Network Error')
    )) {
      config._retry = true;
      config.timeout = 150000; // 2.5 minutes on retry
      return API(config);
    }
    
    return Promise.reject(error);
  }
);

export default API;
