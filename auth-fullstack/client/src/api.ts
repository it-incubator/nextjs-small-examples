import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

export const api = {
  register(email: string, password: string) {
    return axiosInstance.post('/register', { email, password })
  },
  verifyEmail(email: string, code: string) {
    return axiosInstance.post('/verify-email', { email, code })
  },
  resendCode(email: string) {
    return axiosInstance.post('/resend-code', { email })
  },
}
