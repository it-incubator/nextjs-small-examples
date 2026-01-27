'use client'
import axios, {AxiosError} from 'axios';
import styles from "./page.module.css";
import {error} from "next/dist/build/output/log";

const LOGIN_URL = 'https://inctagram.work/api/v1/auth/login';
const PROTECTED_URL = 'https://inctagram.work/api/v1/auth/me';
const REFRESH_URL = 'https://inctagram.work/api/v1/auth/update';

const credentials = {
  "email": "kuzyuberdin@gmail.com",
  "password": "Ex4mple!"
};

// Global variable to store access token
let accessToken: string | null = null;

// Axios instance with interceptors
const axiosInstance = axios.create();

// Request interceptor - add token to every request
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor - handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(REFRESH_URL, {}, {
          withCredentials: true,
        });

        accessToken = refreshResponse.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError: unknown) {
        if ((refreshError as AxiosError).response?.status === 401) {
          alert('KABZDA NEED LOGIN');
        } else {
          alert('reload page');
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default function Home() {

  const loginWithFetch = async () => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      accessToken = data.accessToken;
      console.log('Fetch response:', data);
      console.log('Token saved:', accessToken);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const loginWithAxios = async () => {
    try {
      const response = await axios.post(LOGIN_URL, credentials, {
        withCredentials: true
      });
      accessToken = response.data.accessToken;
      console.log('Axios response:', response.data);
      console.log('Token saved:', accessToken);
    } catch (error) {
      console.error('Axios error:', error);
    }
  };
  const refreshWithAxios = async () => {
    const refreshResponse = await axios.post(REFRESH_URL, {}, {
      withCredentials: true,
    });
  };

  const getProtectedDataWithFetch = async () => {
    try {
      const response = await fetch(PROTECTED_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data)
      }
      console.log('Protected data (Fetch):', data);
    } catch (error) {
      console.error('Protected request error:', error);
    }
  };

  const getProtectedDataWithAxios = async () => {
    try {
      let response = await axios.get(PROTECTED_URL, {
        headers: {
          'authorization': `Bearer ${accessToken}`,
        },
      });
      console.log('Protected data (Axios):', response.data);
    } catch (error: AxiosError) {

      if (error.status === 401) {
        try {
          const refreshResponse = await axios.post(REFRESH_URL, {}, {
            withCredentials: true,
          });

          accessToken = refreshResponse.data.accessToken;
          response = await axios.get(PROTECTED_URL, {
            headers: {
              'authorization': `Bearer ${accessToken}`,
            },
          });
          alert(JSON.stringify(response, null, 2))

        } catch (error: AxiosError) {
          if (error.status === 401) { alert('KABZDA NEED LOGIN')}
          else { alert('reload page')}
        }
      }
      console.error('Protected request error:', error);
    }
  };

  // New example: using axios interceptor for automatic refresh
  const getProtectedDataWithInterceptor = async () => {
    try {
      const response = await axiosInstance.get(PROTECTED_URL);
    } catch(error) {
      console.error('❌  Protected request error:', error);
    }
      console.log('Protected data (Interceptor):', response.data);
      alert(JSON.stringify(response.data, null, 2));
  };

  return (
    <div className={styles.page}>
      <h1>Auth Demo</h1>
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={loginWithFetch}>
            Login with Fetch
          </button>
          <button onClick={loginWithAxios}>
            Login with Axios
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={getProtectedDataWithFetch}>
            Get Protected (Fetch)
          </button>
          <button onClick={getProtectedDataWithAxios}>
            Get Protected (Axios)
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={refreshWithAxios}>
           REFRESH with axios
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={getProtectedDataWithInterceptor}>
            Get Protected (Interceptor)
          </button>
        </div>
      </div>
    </div>
  );
}
