import React, { useState } from 'react'

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const micStatusConstants = {
  ON: 'ON',
  OFF: 'OFF'
};

const App = () => {
  const [text, setText] = useState('');
  const [micStatus, setMicStatus] = useState(micStatusConstants.OFF);

  const recognition = new speechRecognition();
  recognition.lang = 'en-US';

  const micButtonAction = () => {
    switch (micStatus) {
      case micStatusConstants.ON:
        setMicStatus(micStatusConstants.OFF);
        recognition.stop();
        break;

      case micStatusConstants.OFF:
        setMicStatus(micStatusConstants.ON);
        recognition.start();
        break;

      default: setMicStatus(setMicStatus.OFF)
    }
  }

  recognition.onresult = e => {
    const lastIndex = e.results.length - 1;
    const transcript = e.results[lastIndex][0].transcript;
    recognition.stop();
    setMicStatus(micStatusConstants.OFF);
    setText(transcript);
  }

  recognition.onspeechend = () => {
    setText('Processing......');
  }

  recognition.onerror = e => {
    setText(`Error ${e.error}`);
  }

  return (
    <section className="container">
      <button className="mic" onClick={micButtonAction}>
        <i className="fa fa-microphone"></i>
      </button>
      <p className="text">{text}</p>
    </section>
  )
}

export default App
