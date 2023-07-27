import './Loading.css'
const Loading = (props) => {
    if(props.isPending){
        return ( 
            <div className="loader">
                <h2 className = "loadingText">Alright chill..</h2>
                <svg viewBox = "0 0 100 100">
                    <circle cx="50" cy="50" r="30"/>
                </svg>
            </div> 
        );
    }
    else{
        return
    }
}
export default Loading;