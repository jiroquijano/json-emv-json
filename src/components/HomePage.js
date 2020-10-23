import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () =>{
    return (
        <>
            <h1>Home Page</h1>
            <Link className='homepage-link' to='/json-emv'>JSON-EMV</Link>
            <Link className='homepage-link' to='/emv-json'>EMV-JSON</Link>
        </>
    );
}

export default HomePage;