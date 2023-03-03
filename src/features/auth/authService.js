import customFetch from "../../utils/axios"

 const login=async(url,userData)=>{
    const response=await customFetch.post(url,userData)
    if(response.status===200 || response.data){
        localStorage.setItem('token',JSON.stringify(response.data))
    }
    return response.data
 }

const authService={
    login
}
export default authService;