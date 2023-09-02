import React from 'react'
import './IsProcessing.css'

const IsProcessing = (props) => {
    return (
        <div className={props.isProcessing === true ? "isProcessing true" : props.isProcessing === false ? "isProcessing false" : "isProcessing"}>
            <small>Processing</small>
            <div className="loadingBar">
                <div className="bar"></div>
            </div>
        </div> 
    )
}

export default IsProcessing