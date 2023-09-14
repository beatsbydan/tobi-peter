import React from 'react'
import './RadioButton.css'

const RadioButton = (props) => {
    return (
        <div className="radioButton">
            <div className='circle'>
                <div className='innerCircle'></div>
            </div>
            <div className='radioInput'>{props.radioInput} || XXXXXX</div>
        </div>
    )
}

export default RadioButton