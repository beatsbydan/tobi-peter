import Socials from '../../UI/Socials/Socials';
import StreamingPlatforms from '../../UI/StreamingPlatforms/StreamingPlatforms';
import './Music.css'
const Music = () => {
    return ( 
        <div className="music">
            <div className="bioTop">
                <h3>BIO</h3>
                <Socials/>
            </div>
            <div className="bio">
                <p>Was gonna write this in third person but I changed my mind.</p>
                <p>I’m an independent music producer and DJ based in Lagos, Nigeria. </p>
                <p>My major genres are EDM, Afrobeat, Amapiano, Pop, Dance and House music.</p>
                <p>You might recognize me from Instagram as the guy that makes remixes in a blue agbada and the overhyped reactions.</p>
            </div>
            <div className="streamingPlatformsBlock">
                <p>Check out my music on any of these streaming platforms: </p>
                <StreamingPlatforms/>
            </div>
        </div>
    );
}
export default Music ;