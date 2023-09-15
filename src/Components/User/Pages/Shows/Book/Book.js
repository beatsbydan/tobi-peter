import {useContext, useState} from 'react'
import InputComponent from '../../../../UI/InputComponent/InputComponent'
import Dropdown from '../../../../UI/Dropdown/Dropdown'
import RadioButton from '../../../../UI/RadioButton/RadioButton'
import './Book.css'
import Context from '../../../Context/Context'
import useAlert from '../../../../../Hooks/useAlert'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

const Book = () => {
    const ctx = useContext(Context)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const showTypes = ['Free', 'Ticketed']
    const [isClicked, setIsClicked] = useState(
        new Array(showTypes.length).fill(false)
    )
    const handleTypeClick = (indexPosition, showType) => {
        for (let i = 0; i < showTypes.length; i++){
            if(indexPosition === i){
                isClicked[i] = true
                setIsClicked(isClicked) 
            }
            else{
                isClicked[i] = false
                setIsClicked(isClicked) 
            }
        }
        ctx.setShowType(showType)
    }
    const guestsList = [
        '0-200',
        '200-500',
        '500-1000',
        '1000-10000',
    ]
    const descriptions = [
        'Pool party',
        'Festival',
        'Project launch',
        'Corporate event',
        'Rave',
        'Fashion show',
        'Dance battle event',
        'Birthday party',
        'Normal party',
        'Themed party',
        'Wedding',
        'Tour appearance',
        'Others',
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleBookFieldsSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Successful')
                navigate('/shows')
            }
        })
    }
    return (
        <motion.div 
            className="book"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <form action="" onSubmit={handleSubmit}>
                <InputComponent
                    id={"name"}
                    label={"Name"}
                    error={ctx.bookFieldsErrors.name}
                    type={"text"}
                    placeholder={"Enter your name"}
                    value={ctx.bookFieldsRegular.name}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"eventName"}
                    label={"Event's name"}
                    error={ctx.bookFieldsErrors.eventName}
                    type={"text"}
                    placeholder={"Enter event's name"}
                    value={ctx.bookFieldsRegular.eventName}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"email"}
                    label={"Email"}
                    error={ctx.bookFieldsErrors.email}
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={ctx.bookFieldsRegular.email}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"company"}
                    label={"Company's name"}
                    error={ctx.bookFieldsErrors.companyName}
                    type={"text"}
                    placeholder={"Enter your company's name"}
                    value={ctx.bookFieldsRegular.companyName}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"location"}
                    label={"Location"}
                    error={ctx.bookFieldsErrors.location}
                    type={"text"}
                    placeholder={"Enter event's location"}
                    value={ctx.bookFieldsRegular.location}
                    onChange={ctx.handleBookFieldsChange}
                />
                <div className='innerFlex'>
                    <InputComponent
                        id={"date"}
                        label={"Date"}
                        error={ctx.bookFieldsErrors.date}
                        type={"date"}
                        placeholder={"Enter Date"}
                        value={ctx.bookFieldsRegular.date}
                        onChange={ctx.handleBookFieldsChange}
                    />
                    <div className="innerFormElement">
                        <label htmlFor="radio">
                            Type:
                            <small className = "error">{ctx.bookFieldsErrors.type}</small>
                        </label>
                        <div className="showTypes">
                            {showTypes.map((showType, id)=>{
                                return (
                                        <RadioButton
                                            key={id}
                                            myId={id}
                                            error={ctx.bookFieldsErrors.type}
                                            radioInput={showType}
                                            isClicked={isClicked[id]}
                                            onClick={()=>handleTypeClick(id, showType)}
                                        />
                                    )
                            })}                            
                        </div>
                    </div>
                </div>
                <div className="dropdowns">
                    <div className="formElement">
                        <label htmlFor="description">
                            Description:
                            <small className = "error">{ctx.bookFieldsErrors.description}</small>
                        </label>
                        <Dropdown
                            error={ctx.bookFieldsErrors.description}
                            list={descriptions}
                            onClick={ctx.setShowDescription}
                        />
                    </div>
                    <div className="formElement">
                        <label htmlFor="guests">
                            Guests:
                            <small className = "error">{ctx.bookFieldsErrors.guests}</small>
                        </label>
                        <Dropdown
                            error={ctx.bookFieldsErrors.guests}
                            list={guestsList}
                            onClick={ctx.setShowGuests}
                        />
                    </div> 
                </div>
                <div className="formActions">
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </motion.div>
    )
}

export default Book