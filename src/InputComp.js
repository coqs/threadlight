import React, { useRef, useState } from 'react'; // Import useState

const InputComp = () => {
    const textareaInput = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false); // 1. State for disabled status

    const sendExpress = async () => {
        if (isDisabled || !textareaInput.current || !textareaInput.current.value.trim()) {
            // Don't send if already disabled or textarea is empty
            return;
        }

        // 2. Set disabled to true immediately
        setIsDisabled(true);

        try {
            const response = await fetch(`http://localhost:3003/main`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: textareaInput.current.value
                })
            });

            if (!response.ok) {
                console.error("Failed to send message:", response.statusText);
                // Optionally re-enable if submission fails and you want the user to retry
                // setIsDisabled(false);
            } else {
                console.log("Message sent successfully!");
                // Optionally clear the textarea after successful submission
                // if (textareaInput.current) {
                //     textareaInput.current.value = "";
                // }
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally re-enable on network error
            // setIsDisabled(false);
        }
        // Note: setIsDisabled(true) is already called at the beginning.
        // If you want to re-enable for another input, you'll need logic elsewhere to set setIsDisabled(false)
    };

    // 3. Handler for key presses in textarea
    const handleKeyDown = (event) => {
        // Submit on Enter, but allow Shift+Enter for new line
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default Enter behavior (new line)
            sendExpress();
        }
    };

    return (
        <div className="mainInput">
            <div className="InputArea">
                <textarea
                    ref={textareaInput}
                    placeholder="Ask about an idea/thread"
                    onKeyDown={handleKeyDown} // 4. Add keydown handler
                    disabled={isDisabled}     // 5. Bind disabled state
                />
                <button
                    onClick={sendExpress}
                    className="submitButton"
                    disabled={isDisabled}     // 6. Optionally disable button too
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default InputComp;