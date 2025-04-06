import React from 'react';

const ResponseComp = (props) => {
    return ( 
        <div className="mainResponse">
            <div className="userholder">
                <h1>@{props.sentby}</h1>
                <p>from <span className="redditspan">reddit</span></p>
                <div className="dot"></div>
                <h1 className='PostTitle'>{props.posttitle}</h1>
            </div>
            <div className="usertextholder">
                <p>{props.text}</p>
            </div>
        </div>
     );
}
 
export default ResponseComp;