import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:4032/api/v1',
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
