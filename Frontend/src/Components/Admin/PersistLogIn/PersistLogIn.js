import React from 'react'
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useRefreshToken from '../../../Hooks/useRefreshToken'
import useAuth from '../../../Hooks/useAuth'
import Loading from '../../../Components/UI/Loading/Loading'
const PersistLogIn = () => {
  const [isPending, setIsPending] = useState(true)
  const refresh = useRefreshToken()
  const {authDetails} = useAuth()
  useEffect(()=>{
    const validateRefreshToken = async () => {
      try{
        await refresh()
      }
      catch(err){
        console.log(err)
      }
      finally{
        setIsPending(false)
      }

    }
    authDetails.accessToken === "" ?
    setTimeout(()=>{
      validateRefreshToken()
    },3000)
    : setIsPending(false)
  },[authDetails.accessToken, refresh])
  return(
    <>
      {isPending ? <Loading isPending={isPending}/> : <Outlet/>}
    </>
  )
}

export default PersistLogIn