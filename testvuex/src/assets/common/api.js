import {service} from './axios'

export const message = (data) => (
    service({
        method:'post',
        data:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    })
)