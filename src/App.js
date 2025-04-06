import './App.css';
import HeaderWeb from './HeaderComp';
import ResponseComp from './ResponseComp';
import InputComp from './InputComp';
import { useEffect, useState, useRef } from 'react';

function App() {
  
  const [responses, setResponses] = useState([
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
    { sentby:"spicy_tables", text:"I love tomatoes so much like geniunly why do people hate them, you can cook breakfast, lunch, dinner everything with tomatoes...", posttitle: 'What do you think about tomatoes?' },
  ])
  
  const addResponse = async (sentbyP, textP, postTitleP) => {
    setResponses(originalResponses => [
      ...originalResponses,
      { sentby: sentbyP, text: textP, posttitle: postTitleP}
    ])
  }

  const removeAllResponses = async () => {
    setResponses([
  
    ])
  }

    const textareaInput = useRef(null);
    

    const getDataFromServer = async () => {
      let response = await fetch("http://localhost:3003/main")
      let data = await response.json()
      //topcomment texts
      let topComments = data.topCommentV
      //topcomment authors
      let topCommentAuthor = data.topCommentAuthorV
      //post titles
      let PostTitle = data.postTitleV
      removeAllResponses()
      for (let i=0; i<topComments.length; i++) {
        await addResponse(topCommentAuthor[i], topComments[i], PostTitle[i])
      }

      console.log(data)
    }

    const sendExpress = async () => {
      await fetch(`http://localhost:3003/main`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              message: textareaInput.current.value,
              commentcount: commentcountRef.current.value
          })
      });
      await getDataFromServer()
  }

  const detectKey = (e) => {
    if (e.key === 'Enter') {
      sendExpress()
    }
  }

  const commentcountRef = useRef(null)


  return (
    <div className="App">
      <HeaderWeb/>
      <div className="AllResponseHolder">
        { responses.map((resp, index) => {
          return <ResponseComp key={index} sentby={resp.sentby} text={resp.text} posttitle={ resp.posttitle }/>
        }) }
      </div>

      <div className="mainInput">
            <div className="InputArea">
                <textarea ref={textareaInput} onKeyDown={detectKey} placeholder="Ask about an idea/thread"></textarea>
                <button onClick={sendExpress} className="submitButton">
                    +
                </button>
            </div>
            <div className="InputOptions">
                <div className="optionCheckBox">
                    <span>reddit</span>
                    <input type="checkbox" />
                </div>
                <div className="optionCheckBox">
                    <span>twitter</span>
                    <input type="checkbox" />
                </div>
                <div className="optionCheckBox">
                    <span>AI'ze the results</span>
                    <input type="checkbox" />
                </div>
                <div className="optionCheckBox number-input">
                  <span>commentcount</span>
                  <input
                      ref={commentcountRef}
                      type="number" 
                      min="1" 
                      max="10" 
                      defaultValue="2"
                      onChange={(e) => {
                          // limit to 2 digits
                          if (e.target.value > 10) e.target.value = 10;
                      }}
                  />
              </div>
            </div>
        </div>
    </div>
  );
}

export default App;
