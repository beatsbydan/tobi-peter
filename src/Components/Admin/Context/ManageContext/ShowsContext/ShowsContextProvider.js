import ShowsContext from './ShowsContext'
import {useCallback, useState} from 'react'
import ValidateShows from '../../../Pages/Manage/Shows/ValidateShows'
import useAlert from '../../../../../Hooks/useAlert'
import useAuth from '../../../../../Hooks/useAuth'
import axios from 'axios'
import useIsProcessing from '../../../../../Hooks/useIsProcessing'

const ShowsContextProvider = (props) => {
    const {setProcessing} = useIsProcessing()
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()

    // HELPER FUNCTIONS

    const getFormattedDate = (date) => {
        const myDate = new Date(date)
        const year = myDate.toLocaleString("default", { year: "numeric" });
        const month = myDate.toLocaleString("default", { month: "2-digit" });
        const day = myDate.toLocaleString("default", { day: "2-digit" });
        const formattedDate = year + "-" + month + "-" + day;
        return formattedDate
    }

    
    // SHOWS
    const [createData, setCreateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })

    const [updateData, setUpdateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })

    const [createErrors, setCreateErrors] = useState({})
    
    const [updateErrors, setUpdateErrors] = useState({})
    
    const handleCreateChange = (e) => {
        const {id, value} = e.target;
        setCreateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    
    const handleUpdateChange = (e) => {
        const {id, value} = e.target;
        setUpdateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    
    const handleCreateSubmit = async () => {
        setProcessing(true)
        let success = {}
        const data = {
            title: createData.title,
            venue: createData.venue,
            date: createData.date,
            ticketLink: createData.ticketLink,
            type: 'create'
        }
        await ValidateShows(data, authDetails.accessToken)
        .then(res=>{
            setCreateErrors(res)
            if(res.none){
                success.yes = true
                setProcessing(false)
                setCreateData({
                    title: '',
                    venue: '',
                    date: '',
                    ticketLink: ''
                })
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
            }
        })
        return success
    }
    
    const handleUpdateSubmit = async () => {
        setProcessing(true)
        let success = {}
        const data = {
            title: updateData.title,
            venue: updateData.venue,
            date: updateData.date,
            ticketLink: updateData.ticketLink,
            type: 'update'
        }
        await ValidateShows(data, authDetails.accessToken, show._id)
        .then(res=>{
            setUpdateErrors(res)
            if(res.none){
                success.yes = true
                setProcessing(false)
                setUpdateData({
                    title: '',
                    venue: '',
                    date: '',
                    ticketLink: ''
                })
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
            }
        })
        return success
    }
    
    const [show, setShow] = useState({})
    
    const getShow = useCallback((id) => {
        setProcessing(true)
        setTimeout(async()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/show/${id}`)
            .then(res=>{
                if(res.status === 200){
                    setProcessing(false)
                    setShow(res.data.show)
                    setUpdateData({
                        title: res.data.show.title,
                        venue: res.data.show.venue,
                        date: getFormattedDate(res.data.show.date),
                        ticketLink: res.data.show.ticketLink
                    })
                }
            })
            .catch(err=>{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Something went wrong!')
                return err
            })
        },3000)
    }, [setAlert, setProcessing])
    
    const deleteShow = async (id) => {
        setProcessing(true)
        let success = {}
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/show/delete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                setProcessing(false)
                success.yes = true
                setAlert('success', 'Show Deleted!')
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            success.yes = false
            setAlert('failure', 'Something went wrong!')
        })
        return success
    }
    
    const completeShow = async (id) => {
        setProcessing(true)
        let success = {}
        await axios.get(`${process.env.REACT_APP_BASE_URL}/show/complete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                setProcessing(false)
                setAlert('success', 'Show Completed!')
                
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            success.yes = false
            setAlert('failure', 'Something went wrong!')
            return err
        })
        return success
    }

    // CONTEXT VALUE
    const value = {
        createData: createData,
        updateData: updateData,
        createErrors:createErrors,
        updateErrors:updateErrors,
        show:show,
        getShow: getShow,
        deleteShow:deleteShow,
        completeShow:completeShow,
        handleCreateChange:handleCreateChange,
        handleUpdateChange:handleUpdateChange,
        handleCreateSubmit: handleCreateSubmit,
        handleUpdateSubmit: handleUpdateSubmit
    }
    
    return ( 
        <ShowsContext.Provider value = {value}>
            {props.children}
        </ShowsContext.Provider>
    );
}
export default ShowsContextProvider;