import React from 'react'
import './RadioButton.css'

const RadioButton = (props) => {
    return (
        <div className="radioButton">
            <div onClick={props.onClick} className={props.error ? 'errorField circle' : 'circle'}>
                <div className={props.isClicked ? 'innerCircle active' :'innerCircle'}></div>
            </div>
            <p className='radioInput'>{props.radioInput}</p>
        </div>
    )
}

export default RadioButton