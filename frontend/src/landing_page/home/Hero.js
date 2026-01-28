import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero-Image' className='mb-5'/>
                <h2 className='mt-5'>Make credit decisions with confidence</h2>
                <p>AI-powered platform for credit risk assessment, repayment simulation, and explainability.</p>
                <button className="p-2 btn btn-primary fs-5 mb-5" style={{width:"20%", margin:"0 auto"}}>Sign up for free</button>
            </div>
        </div>
        
     );
}

export default Hero




