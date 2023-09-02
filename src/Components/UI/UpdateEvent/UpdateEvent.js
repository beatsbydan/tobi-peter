import React from "react";
import  ReactDOM  from "react-dom";
import './UpdateEvent.css'
const Backdrop = (props) => {
    return ( 
        <div onClick={props.cancel} className="backdrop"></div>
    );
}
const UpdateBlock = (props) => {
    return(
        <div className="updateModal">
            <p>Are you sure you want to <span>{props.type}</span> this <span>{props.event}</span> ?</p>
            <div className="modalActions">
                <button onClick={props.cancel} className="cancel">NO</button>
                <button onClick={props.type === 'COMPLETE' ? props.completePrompt : props.deletePrompt} className={props.type === "COMPLETE" ? "accept": "prompt"}>YES</button>
            </div>
        </div>
    )
}
const UpdateEvent = (props) => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop cancel={props.cancel}/>,document.getElementById('backdrop_root')
            )}
            {ReactDOM.createPortal(
                <UpdateBlock
                    type={props.type}
                    event={props.event} 
                    cancel={props.cancel}
                    completePrompt={props.completePrompt}
                    deletePrompt={props.deletePrompt}
                />, document.getElementById('overlay_root')
            )}
        </React.Fragment>
    )
}
export default UpdateEvent;