import react from 'react';

const version : string = "0.1";
const author : string = "Mael Gruand";
function About(){
    return (
        <div className='about-page'>
            <h1>About Page</h1>
            <br/><br/>
            <p className="paraph">This application is a money manager created in React</p>
            <noscript>To see this application, you need JavaScript enable</noscript>
            <p className="author">{`Created by ${author}`}</p>
            <p className="version">{`Version V${version}`}</p>
        </div>
    )
}

export default About;
