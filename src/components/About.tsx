import react from 'react';
import icon from './images/tsReactIcon.png';
import faGithub from './images/iconGithub.png';
import faLinkedin from './images/iconLinkedin.png';

const version : string = "0.1";
const author : string = "Mael Gruand";
function About(){
    return (
        <div className='about-page'>
            <h1>About</h1>
            <br/><br/>
            <p className="paraph">This application is a money manager created in React</p>
            <noscript>To see this application, you need JavaScript enable</noscript>
            <p className="author">{`Created by ${author}`}</p>
            <br />
            <p className="paraph">Developed in <i>TypeScript for React</i></p>
            <img src={icon} alt="Icon TypeScript for React (TSX)" />
            <p className="version">{`Version V${version}`}</p>
            <p className="sameApp">You want the same app, go to my profiles</p>
            <div className='profilesName'>
                <ul className='listSocials'>
                    <li>Linkedin : <a href="https://www.linkedin.com/in/mael-gruand-01bba0238/" target="_blank"><img src={faLinkedin} alt="Linkedin Icon" /></a></li>
                    <li>Github : <a href="https://github.com/maelgruand1" target='_blank'><img src={faGithub} alt="Github Icon" /></a></li>
                </ul>
            </div>
        </div>
    )
}

export default About;
