import './Animation.css'
import {BiRightArrowAlt} from 'react-icons/bi'

const Animation = () => {
    return ( 
        <div className="animation">
            <div className="bioBlock">
                <h3>BIO</h3>
                <p>Yeah I make animations as well.</p>
                <p>Check out some of my previous projects/client work.</p>
                <div className="portfolioBlock">
                    <div>
                        <h5>VIEW PORTFOLIO</h5>
                        <a href='https://www.'>
                            BEHANCE
                            <BiRightArrowAlt/>
                        </a>
                    </div>
                    <div>
                        <h5>ANIMATION</h5>
                        <a href='https://www.'>
                            MAKE REQUEST
                            <BiRightArrowAlt/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="clients">
                <h3>CLIENTS</h3>
                <div className="individuals">
                    <p>INDIVIDUALS</p>
                    <ul className="clientsList">
                        <li><p>LADY DONLI</p></li>
                        <li><p>DAVIDO</p></li>
                        <li><p>DARKOVIBES</p></li>
                        <li><p>BEGHO</p></li>
                        <li><p>SHALOM DUBAS</p></li>
                        <li><p>JAMIE BLACK</p></li>
                        <li><p>ENZO PESO</p></li>
                        <li><p>NESSA</p></li>
                        <li><p>TOYIN ORES</p></li>
                    </ul>
                </div>
                <div className="organizations">
                    <p>ORGANIZATIONS</p>
                    <ul className="clientsList">
                        <li><p>MONEY AFRICA</p></li>
                        <li><p>ROOST FOUNDATION</p></li>
                        <li><p>TRYBE ONE</p></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Animation;