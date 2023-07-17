import Context from './Context'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ValidateWhatsNew from '../Components/Pages/WhatsNew/ValidateWhatsNew'

const ContextProvider = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = ValidateWhatsNew(email)
        setError(error)
        if(error === ""){
            await axios.post('./data.json.vip')
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    // useEffect(()=>{
    //     axios.get('./data.json')
    //     .then(res=>{
    //         console.log(res)
    //     })
    // },[])
    const value = {
        email:email,
        error:error,
        handleChange:handleChange,
        handleSubmit:handleSubmit
    }
    return ( 
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider;