import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/' className='navBtn'>Home</Link>
            <Link to='/wallet' className='navBtn'>Wallet</Link>
            <Link to='/about' className='navBtn'>About</Link>
        </div>
    );
}

export default Navbar;
