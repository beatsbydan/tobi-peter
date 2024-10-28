import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShows } from '../../../../Store/StateSlices/UserSlices/ShowsSlice'
import LazyImage from '../../../UI/LazyImage/LazyImage'
import epk from '../../../../Assets/EPK/epk.svg'
import interswitch from '../../../../Assets/EPK/interswitch.svg'
import infinix from '../../../../Assets/EPK/infinix.svg'
import bbc from '../../../../Assets/EPK/bbc.svg'
import hennessy from '../../../../Assets/EPK/hennessy.svg'
import goodBeach from '../../../../Assets/EPK/the-good-beach.svg'
import redBull from '../../../../Assets/EPK/red-bull.svg'
import beefeater from '../../../../Assets/EPK/beefeater.svg'
import lagos from '../../../../Assets/EPK/lagos.svg'
import monkeyShoulder from '../../../../Assets/EPK/monkey-shoulder.svg'
import ashluxe from '../../../../Assets/EPK/ashluxe.svg'
import mavin from '../../../../Assets/EPK/mavin.svg'
import gamr from '../../../../Assets/EPK/gamr.svg'
import landmark from '../../../../Assets/EPK/landmark.svg'
import pulse from '../../../../Assets/EPK/pulse.svg'
import flyingFish from '../../../../Assets/EPK/flying-fish.svg'
import BulletPoint from '../../../UI/BulletPoint/BulletPoint'
import VideoPlayer from '../../../UI/Video/VideoPlayer'
import './Epk.css'

const Epk = () => {
    const {status, shows} = useSelector(state => state.shows)
    const [showsStats, setShowStats] = useState({
        allTimeShows: 0,
        showsThisYear: 0
    })
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.all === "idle"){
            dispatch(fetchShows())
        }
        else if(shows){
            const filteredShowsForTheYear = shows?.allShows?.pastShows?.filter(show => new Date(show?.date).getFullYear() === new Date().getFullYear())
            const newStats = {
                allTimeShows: shows?.allShows?.pastShows?.length,
                showsThisYear: filteredShowsForTheYear?.length
            }
            setShowStats({...newStats})
        } 
    },[status.all, dispatch, shows])

    return (
        <motion.div 
            className="epk"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className='tobiPeter'>
                <div className='imageBlock'>
                    <LazyImage src={epk} type="image" alt="" />
                </div>
                <h2>TOBI PETER</h2>
            </div>

            <p>
                Tobi Peter is an international DJ, music producer and songwriter based in Lagos, Nigeria.
            </p>
            <p>
                Tobi makes music across a wide range of genres, however, in recent time, he has established himself as a producer & DJ to be reckoned with when it comes to EDM and amapiano in Africa.
            </p>
            <p>
                While DJing, Tobi Peter can be seen wearing his signature blue agbada which serves as an appeal to the eyes while he serenades the audience with his unique set.
            </p>
            <p className='bottomBio'>
                With a broad discography of 12 singles and 6 EPs, he continues to continuously reinvent himself with chart topping projects.
            </p>

            <div className='statsBlock'>
                <h2>STATS</h2>
                <div className='one'>
                    <div>
                        <h1>{showsStats.allTimeShows}</h1>
                        <p>SHOWS<span>(ALL TIME)</span></p>
                    </div>
                    <div>
                        <h1>{showsStats.showsThisYear}</h1>
                        <p>SHOWS<span>(THIS YEAR)</span></p>
                    </div>
                    <div>
                        <h1>11.3k+</h1>
                        <p>MONTHLY <span>LISTENERS</span></p>
                    </div>
                    <div>
                        <h1>120+</h1>
                        <p>REMIXES <span>(ALL TIME)</span></p>
                    </div>
                </div>
                <div className='two'>
                    <div>
                        <h1>12</h1>
                        <p>SINGLES</p>
                    </div>
                    <div>
                        <h1>6</h1>
                        <p>EPS</p>
                    </div>
                    <div>
                        <h1>2</h1>
                        <p>MIXTAPES</p>
                    </div>
                    <div>
                        <h1>500k+</h1>
                        <p>STREAMS</p>
                    </div>
                </div>
            </div>

            <div className='epkCollaborations'>
                <h2>NOTABLE COLLABORATIONS</h2>
                <section>
                    <div>
                        <LazyImage src={interswitch} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={infinix} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={bbc} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={hennessy} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={goodBeach} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={redBull} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={beefeater} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={lagos} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={monkeyShoulder} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={ashluxe} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={mavin} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={gamr} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={landmark} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={pulse} type="epk" alt="" />
                    </div>
                    <div>
                        <LazyImage src={flyingFish} type="epk" alt="" />
                    </div>
                </section>
            </div>

            <div className='careerInfo'>
                <div>
                    <h2>CAREER HIGHLIGHTS</h2>
                    <ul>
                        <li>
                            <BulletPoint/>
                            <p>SOLD OUT HEADLINE SHOW</p>
                        </li>
                        <li>
                            <BulletPoint/>
                            <p>LOG RIDDIMS, SUMMER WAVS VOL. 1 & 2 PEAKED AT NUMBER 2 ON APPLE MUSIC DANCE CHART</p>
                        </li>
                        <li>
                            <BulletPoint/>
                            <p>PERFORMED ON THE SAME STAGE AS <span>MAJOR LEAGUE DJZ, MR JAZZI Q, BOOHLE, NJELIC, ROSEY GOLD, SKYLA TYLA, OMARION, AYRA STARR, LOJAY, VICTONY, TENI.</span></p>
                        </li>
                        <li>
                            <BulletPoint/>
                            <p>GOOD BEACH RESIDENCY.</p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>ENDORSEMENTS</h2>
                    <p>
                        TOBI PETER HAS BEEN ENDORSED/PRAISED FOR HIS EXCEPTIONAL TALENT BY THE FOLLOWING INDUSTRY EXPERTS:
                    </p>
                    <ul>
                        <li>DIPLO</li>
                        <li>WALSHY FIRE</li>
                        <li>SARZ</li>
                        <li>DON JAZZY</li>
                        <li>MAJOR LEAGUE DJZ</li>
                        <li>M.I.</li>
                        <li>SKALES</li>
                        <li>FALZ</li>
                        <li>DR SID</li>
                    </ul>
                </div>
            </div>
            
            <div className="sets">
                <h2>SETS</h2>
                <div>
                    <div className='videoElement'>
                        <VideoPlayer url={"https://www.youtube.com/embed/7Se_9xftnqY?si=6QAP52NgeUZ3U72l"}/>
                        <p>LEAP HERE PARTY</p>
                    </div>
                    <div className="videoElement">
                        <VideoPlayer url={"https://www.youtube.com/embed/u0GiPDLVs-c?si=-f7Yf0TMvcLGRvsO"}/>
                        <p>ANA.LOG EPISODE 01</p>
                    </div>
                    {/* <div className="videoElement">
                        <VideoPlayer url={""}/>
                        <p>ELEMENT HOUSE</p>
                    </div> */}
                </div>
            </div>

            <div className='epkContact'>
                <h2>CONTACT</h2>
                <div className='mailBlock'>
                    <BulletPoint/>
                    <p>KINDLY SEND A MAIL TO <span>TOBIPETERMANAGEMENT@GMAIL.COM</span> FOR MORE INFORMATION</p>
                </div>
            </div>

        </motion.div>
    )
}

export default Epk