import axios from 'axios'
import {useState} from 'react'

export const useAuthGetAxios = async (api) => {
    const [data, setData] = useState()
    await axios.get(api,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer`
        }
    })
    .then(res=>{
        if(res.status === 200){
            setData(res.data)
        }
    })
    .catch(err=>{
        console.log(err)
    })
    return data;
}
export const useAuthPostAxios = async (api, details) => {
    const [data, setData] = useState()
    await axios.post(api,{...details},{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer`
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}
