import './Loading.css'
import logo from '../../../Assets/logo.png'
const Loading = () => {
    return ( 
        <div className="loader">
            <div className="chillBlock">
                <img src={logo} alt={'logo'}/>
                <h2 className = "loadingText">Alright chill..</h2>    
            </div>
            <svg viewBox = "0 0 100 100">
                <circle cx="50" cy="50" r="30"/>
            </svg>
        </div> 
    );
}
export default Loading;