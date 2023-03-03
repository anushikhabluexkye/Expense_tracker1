import axios from 'axios'

const customFetch=axios.create({
    baseURL:"http://localhost:5197"
})

customFetch.interceptors.request.use((request)=>{
    const token=localStorage.getItem('token')
    if(token){
        request.headers['Authorization']='Bearer '+token
    }
    console.log(request)
    return request;
})

export default customFetch;