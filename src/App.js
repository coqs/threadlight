import './App.css';
import HeaderWeb from './HeaderComp';
import ResponseComp from './ResponseComp';
import InputComp from './InputComp'; // This is imported, but the active input is below
import Sidebar from './Sidebar';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [responses, setResponses] = useState([
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
  ]);

  // Removed async as setResponses is not a promise
  const addResponse = (sentbyP, textP, postTitleP) => {
    setResponses(originalResponses => [
      ...originalResponses,
      { sentby: sentbyP, text: textP, posttitle: postTitleP }
    ]);
  };

  // Removed async
  const removeAllResponses = () => {
    setResponses([]);
  };

  // --- State and Refs for the input area in App.js ---
  const textareaInput = useRef(null);
  const commentcountRef = useRef(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false); // 1. State for disabling

  const getDataFromServer = async () => {
    try {
      let response = await fetch("http://localhost:3003/main");
      if (!response.ok) {
        console.error("Failed to fetch data, status:", response.status);
        // Potentially throw an error to be caught by caller or handle here
        return; // Exit if fetch failed
      }
      let data = await response.json();
      let topComments = data.topCommentV || []; // Ensure arrays exist
      let topCommentAuthor = data.topCommentAuthorV || [];
      let PostTitle = data.postTitleV || [];

      removeAllResponses(); // Clears previous responses
      for (let i = 0; i < topComments.length; i++) {
        addResponse(topCommentAuthor[i], topComments[i], PostTitle[i]);
      }
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error in getDataFromServer:", error);
    }
  };

  const sendExpress = async () => {
    // Prevent multiple submissions or submission of empty/whitespace-only message
    if (isInputDisabled || !textareaInput.current || !textareaInput.current.value.trim()) {
      if (!textareaInput.current?.value.trim()) console.log("Message is empty, not sending.");
      return;
    }

    setIsInputDisabled(true); // 2. Disable inputs immediately

    try {
      const messageToSend = textareaInput.current.value; // Get value before clearing
      const commentCountValue = commentcountRef.current ? commentcountRef.current.value : "2";

      await fetch(`http://localhost:3003/main`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageToSend,
          commentcount: commentCountValue
        })
      });
      console.log("Message sent successfully.");

      if (textareaInput.current) {
        textareaInput.current.value = ""; // Clear textarea after successful send
      }
      await getDataFromServer(); // Refresh data
    } catch (error) {
      console.error("Error sending message to Express:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsInputDisabled(false); // Re-enable inputs regardless of success/failure
    }
  };

  const detectKey = (e) => {
    // 3. Submit on Enter (but not Shift+Enter for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (which is to add a new line)
      if (!isInputDisabled) { // Check if not already processing from a quick button click
         sendExpress();
      }
    }
  };

  return (
    <div className="App">
      <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="top-right-options">
        <div className="optionCheckBox number-input">
          <span>commentcount</span>
          <input
            ref={commentcountRef}
            type="number"
            min="1"
            max="10"
            defaultValue="2"
            onChange={(e) => { if (parseInt(e.target.value, 10) > 10) e.target.value = "10"; }}
            disabled={isInputDisabled} // Optionally disable this too
          />
        </div>
      </div>

      <HeaderWeb/>
      <div className="AllResponseHolder">
        { responses.map((resp, index) => (
          <ResponseComp key={index} sentby={resp.sentby} text={resp.text} posttitle={ resp.posttitle }/>
        ))}
      </div>

      {/* The <InputComp /> instance from your first code snippet.
          If you want THIS component to handle the input and submission,
          you'd move the textarea, button, refs, and logic (like sendExpress, detectKey, isDisabled state)
          into InputComp.js, and App.js would pass a callback like <InputComp onMessageSent={handleNewMessage} />.
          For now, the active input is the one defined directly below. */}
      {/* <InputComp /> */}

      {/* THIS IS THE MAIN INPUT AREA DEFINED AND CONTROLLED BY App.js */}
      <div className="mainInput">
        <div className="InputArea">
          <textarea
            ref={textareaInput}
            onKeyDown={detectKey} // Use updated detectKey
            placeholder="Ask about an idea/thread"
            disabled={isInputDisabled} // 4. Bind disabled state
          />
          <button
            onClick={sendExpress}
            className="submitButton"
            disabled={isInputDisabled} // 4. Bind disabled state
          >
            +
          </button>
        </div>
        <div className="InputOptions">
          {/* Options were removed as per original comment in your code */}
        </div>
      </div>
    </div>
  );
}

export default App;