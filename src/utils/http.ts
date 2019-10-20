import axios from 'axios'

declare const API_BASE_URL: string

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export interface ApiErrorResponse {
  response?: {
    data: {
      message: string,
      data: any
    }
    status?: number
  },
}
