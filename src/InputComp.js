import React, { useRef } from 'react';

const InputComp = () => {
    const textareaInput = useRef(null);
    
    const sendExpress = async () => {
        fetch(`http://localhost:3003/main`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: textareaInput.current.value
            })
        });
    }
    
    return (
        <div className="mainInput">
            <div className="InputArea">
                <textarea ref={textareaInput} placeholder="Ask about an idea/thread"></textarea>
                <button onClick={sendExpress} className="submitButton">
                    +
                </button>
            </div>
        </div>
    );
}
 
export default InputComp;