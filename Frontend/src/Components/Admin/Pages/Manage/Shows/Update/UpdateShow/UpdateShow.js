import React from "react";
import  ReactDOM  from "react-dom";
import './UpdateShow.css'
const Backdrop = (props) => {
    return ( 
        <div onClick={props.cancel} className="backdrop"></div>
    );
}
const UpdateBlock = (props) => {
    return(
        <div className="deleteModal">
            <h3>Are you sure you want to {props.type} this show?</h3>
            <div className="modalActions">
                <button onClick={props.cancel} className="cancel">NO</button>
                <button onClick={props.type === 'complete' ? props.completePrompt: props.deletePrompt} className={props.type === "delete" ? "prompt": "accept"}>YES</button>
            </div>
        </div>
    )
}
const UpdateShow = (props) => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop cancel={props.cancel}/>,document.getElementById('backdrop_root')
            )}
            {ReactDOM.createPortal(
                <UpdateBlock
                    type={props.type} 
                    cancel={props.cancel}
                    completePrompt={props.completePrompt}
                    deletePrompt={props.deletePrompt}
                />, document.getElementById('overlay_root')
            )}
        </React.Fragment>
    )
}
export default UpdateShow;