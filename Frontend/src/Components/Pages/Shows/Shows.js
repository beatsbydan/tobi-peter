import './Shows.css'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'

const Shows = () => {
    return ( 
        <div className="shows">
            <div className="actionsBlock">
                <a href="https://www.">BOOK TOBI PETER</a>
                <a href="https://www.">DOWNLOAD EPK</a>
            </div>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    <li className='show'>
                        <div className='left'>
                            <div className='date'>
                                <small className='month'>AUG</small>
                                <h5 className='day'>23</h5>
                            </div>
                            <h5 className='desc'>DJ</h5>
                            <div className='location'>
                                <h5 className='title'>COACHELLA</h5>
                                <small className='venue'>The Oasis Valley, Los Angeles, USA</small>
                            </div>    
                        </div>
                        <a href='https://www.'>
                            <BsTicketPerforated className={'ticket'} size={30}/>
                            <BiRightArrowAlt className={'myArrow'}/>
                            <span>GET TICKETS</span>
                        </a>
                    </li>
                    <li className='show'>
                        <div className='left'>
                            <div className='date'>
                                <small className='month'>APR</small>
                                <h5 className='day'>15</h5>
                            </div>
                            <h5 className='desc'>DJ</h5>
                            <div className='location'>
                                <h5 className='title'>ULTRA MUSIC FEST</h5>
                                <small className='venue'>Romo ria, Archies, Belgium</small>
                            </div>    
                        </div>
                        <a href='https://www.'>
                            <BsTicketPerforated className={'ticket'} size={30}/>
                            <BiRightArrowAlt className={'myArrow'}/>
                            <span>GET TICKETS</span>
                        </a>
                    </li>
                    <li className='show'>
                        <div className='left'>
                            <div className='date'>
                                <small className='month'>SEP</small>
                                <h5 className='day'>24</h5>
                            </div>
                            <h5 className='desc'>DJ</h5>
                            <div className='location'>
                                <h5 className='title'>ACTIVITY FEST</h5>
                                <small className='venue'>The Good Beach</small>
                            </div>    
                        </div>
                        <a href='https://www.'>
                            <BsTicketPerforated className={'ticket'} size={30}/>
                            <BiRightArrowAlt className={'myArrow'}/>
                            <span>GET TICKETS</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pastShows">
                <h5>PAST SHOWS</h5>
                <ul className='showsList'>
                    <li className='show'>
                        <div className='left'>
                            <div className='date'>
                                <small className='month'>AUG</small>
                                <h5 className='day'>23</h5>
                            </div>
                            <h5 className='desc'>DJ</h5>
                            <div className='location'>
                                <h5 className='title'>COACHELLA</h5>
                                <small className='venue'>The Oasis Valley, Los Angeles, USA</small>
                            </div>    
                        </div>
                    </li>
                </ul>
                <button>SEE MORE</button>
            </div>
        </div>
    );
}
export default Shows;