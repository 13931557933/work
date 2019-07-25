import Axios from 'axios'

export const service = Axios.create({
    baseURl:'http://localhost:8080/login',
    timeout:100000
})