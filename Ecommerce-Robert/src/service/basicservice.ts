 
import axios from "axios"
 
export const getdata = async <T>(url:string):Promise<T>=> {
    const response = await axios.get<T>(url)
    return response.data
}

export const postdata = async <T>(url:string,payload:any) => {
    const response = await axios.post<T>(url,payload)
    return response.data
}
export const deletedata = async <T>(url:string) => {
    const response = await axios.delete<T>(url)
    return response.data
}
export const patchdata = async <T>(url:string,payload:any) => {
    const response = await axios.patch<T>(url,payload)
    return response.data
}