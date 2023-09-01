import './InputComponent.css'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {useState} from 'react'

const InputComponent = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const handleVisibility = () => {
        setIsVisible(!isVisible)
    }
    return ( 
        <div className="formElement">
            <label htmlFor="">
                {props.label}
                <small className="error">{props.error}</small>
            </label>
            {
                props.type === "password" ?
                    <div className="passwordBlock">
                        <input
                            id={props.id}  
                            className={props.error ? "errorField" : ""}
                            type={!isVisible ? "password":"text"} 
                            placeholder={props.placeholder} 
                            value={props.value} 
                            onChange={props.onChange}
                        />
                        {!isVisible ? <AiFillEye size={27} color={"#1D3557"} cursor='pointer' className='visibility' onClick={handleVisibility}/>:<AiFillEyeInvisible size={27} color={"#1D3557"} cursor='pointer' className='visibility' onClick={handleVisibility}/>}
                    </div>
                :
                props.type === "textarea" ?
                    <textarea
                        id={props.id}
                        className={props.error ? "errorField": ""}
                        placeholder={props.placeholder} 
                        value={props.value} 
                        onChange={props.onChange}
                    />
                :
                    <input 
                        id={props.id}
                        className={props.error ? "errorField": ""} 
                        type={props.type} 
                        placeholder={props.placeholder} 
                        value={props.value} 
                        onChange={props.onChange}
                    />
            }
        </div>
   );
}
export default InputComponent;