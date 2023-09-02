import HomeContext from './HomeContext'
import {useState, useEffect} from 'react'
import axios from 'axios'
import useAuth from '../../../../Hooks/useAuth'

const HomeContextProvider = (props) => {
    const {authDetails} = useAuth()

    // SUBSCRIBERS

    const [subscribers, setSubscribers] = useState([])
    useEffect(()=>{        
        authDetails.isLoggedIn && axios.get(`${process.env.REACT_APP_BASE_URL}/subscribe/`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                setSubscribers(res.data.allSubscribers)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[authDetails.isLoggedIn, authDetails.accessToken])
    
    // CONTEXT VALUE
    
    const value = {
        subscribers:subscribers,
    }
    return ( 
        <HomeContext.Provider value={value}>
            {props.children}
        </HomeContext.Provider>
    );
}
export default HomeContextProvider;