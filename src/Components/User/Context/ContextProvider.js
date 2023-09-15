import Context from './Context'
import {useState, useEffect, useReducer, useCallback} from 'react'
import ValidateWhatsNew from '../Pages/WhatsNew/ValidateWhatsNew'
import axios from 'axios'
import useAlert from '../../../Hooks/useAlert'
import useIsProcessing from '../../../Hooks/useIsProcessing'
import ValidateBooks from '../Pages/Shows/Book/ValidateBooks'

const ContextProvider = (props) => {
    const {setAlert} = useAlert()
    
    const {setProcessing} = useIsProcessing()

    // PEND STATE

    const initialPendState = {
        isPending: false   
    }

    const pendReducer = (state,action) =>{
        if(action.type === 'PENDING'){
            return{
                isPending: true
            }
        }
        if(action.type === 'COMPLETED'){
            return{
                isPending: false
            }
        }
    }

    const [pending, dispatchPending] = useReducer(pendReducer, initialPendState)
    
    // SHOWS
    
    const initialShows = {
        myShows:{
            upcomingShows: [],
            pastShows: []
        },
        upcomingShows: [],
        pastShows: []
    }
    
    const showsReducer = (state,action) => {
        if(action.type === "SET_ALL_SHOWS"){
            return{
                myShows: action.value,
                upcomingShows: state.upcomingShows,
                pastShows: state.pastShows
            }
        }
        if(action.type === "SET_UPCOMING_SHOWS"){
            return{
                myShows: state.myShows,
                upcomingShows: [...action.value],
                pastShows: state.pastShows
            }
        }
        if(action.type === "SET_PAST_SHOWS"){
            return{
                myShows: state.myShows,
                upcomingShows: state.upcomingShows,
                pastShows: [...action.value]
            }
        }
    }
    
    const [shows, dispatchShows] = useReducer(showsReducer, initialShows)
    
    const getShows = useCallback(() =>{
        dispatchPending({type: 'PENDING'})
        setTimeout( async ()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/show/`)
            .then(res=>{
                if(res.status === 200){
                    const allShows = {
                        upcomingShows: res.data.pendingShows,
                        pastShows: res.data.completedShows
                    }
                    const myUpcomingShows = filterShows(res.data.pendingShows)
                    const myPastShows = filterShows(res.data.completedShows)
                    dispatchShows({type:"SET_ALL_SHOWS", value:{...allShows}})
                    dispatchShows({type:"SET_UPCOMING_SHOWS", value: myUpcomingShows})
                    dispatchShows({type:"SET_PAST_SHOWS", value: myPastShows})
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err
            })
        },3000)
    },[])

    useEffect(()=>{
        getShows()
    },[getShows])
    
    const filterShows = (shows) => {
        if(shows.length > 0){
            return shows.slice(0, 3)
        }
        else{
            return []
        }
    }

    // SUBSCRIBERS
    
    const [email, setEmail] = useState('')
    
    const [error, setError] = useState({})
    
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handleSubmit = (e) => {
        setProcessing(true)
        e.preventDefault()
        ValidateWhatsNew(email)
        .then((res)=>{
            setError(res)
            if(res.none){
                setEmail('');
                setProcessing(false)
                setAlert('success', 'Subscription Successful!')
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                }, 1000)
                setAlert('failure', 'Something went wrong!')
            }
        })
    }

    // RECENT SONG
    
    const [song, setSong] = useState({})
    
    const getSong = async () =>{
        dispatchPending({type: 'PENDING'})
        setTimeout( async ()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/song/recent`,{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then(res=>{
                if(res.status === 200){
                    setSong(res.data.recentSong)
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err;
            })
        },3000)
    }
    
    useEffect(()=>{
        getSong()
    },[])

    // BLOGS
    
    const [blogs, setBlogs] = useState([])
    
    const getBlogs = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout(async ()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/blog/`)
            .then(res=>{
                if(res.status === 200){
                    setBlogs(res.data.AllBlogs)
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err
            })
        },3000)
        
    }

    useEffect(()=>{
        getBlogs()
    },[])

    // BIO-IMAGES
    
    const [images, setImages] = useState([])
    
    const getImages = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout( async ()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/album`)
            .then(res=>{
                if(res.status === 200){
                    setImages(res.data.album)
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err
            })
        },3000)
    }
    useEffect(()=>{
        getImages()
    },[])

    // BOOK TOBI PETER
    
    const [bookFieldsRegular, setBookFieldsRegular] = useState({
        name: '',
        eventName: '',
        email: '',
        companyName: '',
        date: '',
        location: '',
    })

    const [bookFieldsSpecifics, setBookFieldsSpecifics] = useState({
        type: '',
        expectedGuests: '',
        description: ''
    })
    const [bookFieldsErrors, setBookFieldsErrors] = useState({})
    
    const handleBookFieldsChange = (e) => {
        const {id, value} = e.target
        setBookFieldsRegular(prev=>{
            return {...prev, [id]: value}
        })
    }

    const setShowType = (showType) => {
        setBookFieldsSpecifics({
            type: showType,
            expectedGuests: bookFieldsSpecifics.expectedGuests,
            description: bookFieldsSpecifics.description
        })
    }
    const setShowGuests = (guests) => {
        setBookFieldsSpecifics({
            type: bookFieldsSpecifics.type,
            expectedGuests: guests,
            description: bookFieldsSpecifics.description
        })
    }
    const setShowDescription = (desc) => {
        setBookFieldsSpecifics({
            type: bookFieldsSpecifics.type,
            expectedGuests: bookFieldsSpecifics.expectedGuests,
            description: desc
        })
    }
    
    const handleBookFieldsSubmit = async () => {
        setProcessing(true)
        let success = {}
        const bookFields = {
            name:bookFieldsRegular.name ,
            eventName:bookFieldsRegular.eventName ,
            email:bookFieldsRegular.email ,
            companyName:bookFieldsRegular.companyName ,
            date:bookFieldsRegular.date ,
            location:bookFieldsRegular.location,
            type: bookFieldsSpecifics.type, 
            expectedGuests: bookFieldsSpecifics.expectedGuests, 
            description: bookFieldsSpecifics.description
        }
        console.log(bookFields)
        await ValidateBooks(bookFields)
        .then(res=>{
            setBookFieldsErrors(res)
            if(res.none){
                success.yes = true
                setProcessing(false)
            }
            else{
                success.yes = false
                setAlert('failure', 'Something went wrong!')
                setProcessing(false)
            }
        })
        return success
    }

    // CONTEXT VALUES
    
    const value = {
        email:email,
        error:error,
        shows:shows,
        song:song,
        blogs: blogs,
        images:images,
        pending:pending,
        bookFieldsRegular: bookFieldsRegular,
        bookFieldsSpecifics: bookFieldsSpecifics,
        bookFieldsErrors: bookFieldsErrors,
        getShows:getShows,
        getImages:getImages,
        getBlogs: getBlogs,
        getSong:getSong,
        handleChange:handleChange,
        setShowType: setShowType,
        setShowGuests: setShowGuests,
        setShowDescription: setShowDescription,
        handleBookFieldsChange:handleBookFieldsChange,
        handleBookFieldsSubmit:handleBookFieldsSubmit,
        handleSubmit:handleSubmit,
    }

    return ( 
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider;