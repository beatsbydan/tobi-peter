import {useState} from 'react'
import ManageContext from './ManageContext'
import useAlert from '../../../../Hooks/useAlert'
import ValidateCoverArt from '../../Pages/Manage/CoverArt/ValidateCoverArt'
// import {Navigate} from 'react-router-dom'
import ValidateUpdateLinks from '../../Pages/Manage/Links/ValidateUpdateLinks'
const ManageContextProvider = (props) => {
    const {setAlert} = useAlert()
    const [dataErrors, setDataErrors] = useState({})
    const [file, setFile] = useState('')
    const [project, setProject] = useState({
        date:'',
        title:''
    })
    const [links, setLinks] = useState({
        appleMusic: '',
        spotify: '',
        audiomack: '',
        youtube: '',
        tidal: '',
        boomPlay: '',
        youtubeMusic: ''
    })
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleLinksChange = (e) => {
        const {name, value} = e.target;
        setLinks(prev=>{
            return {...prev, [name]:value}
        })
    }
    const handleProjectChange = (e) => {
        const {name, value} = e.target;
        setProject(prev=>{
            return {...prev, [name]:value}
        })
    }
    const handleFileSubmit = (e) => {
        e.preventDefault()
        ValidateCoverArt(file)
        .then(res=>{
            if(res.none){
                setAlert('success')
            }
            else{
                setAlert('failure')
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            links: links,
            date:project.date,
            title:project.title
        }
        ValidateUpdateLinks(data)
        .then(res=>{
            setDataErrors(res)
            if(res.none){
                setAlert('success')
                // return <Navigate to={'/admin/home'}/>
            }
            else{
                setAlert('failure')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const value = {
        file: '',
        title:project.title,
        date:project.date,
        links:links,
        dataErrors:dataErrors,
        handleFileChange:handleFileChange,
        handleLinksChange:handleLinksChange,
        handleProjectChange:handleProjectChange,
        handleSubmit:handleSubmit,
        handleFileSubmit:handleFileSubmit
    }
    return ( 
        <ManageContext.Provider value = {value}>
            {props.children}
        </ManageContext.Provider>
    );
}
export default ManageContextProvider;