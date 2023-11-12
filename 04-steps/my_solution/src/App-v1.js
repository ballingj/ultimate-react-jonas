import React from 'react';
import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrev() {
    if (step > 1) {
      // setStep(step - 1);
      setStep((currentStep) => currentStep - 1)
    }
  }

  function handleNext() {
    if (step < 3) {
      // setStep(step + 1); incorrect
      setStep((currentStep) => currentStep + 1); //must be a callback where s is the current state
    }
  }

  return (
    <React.Fragment>
      <button className='close' onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}>
        &times;
      </button>
      {isOpen && (
      <div className='steps'>
        <div className='numbers'>
          <div className={step >= 1 ? 'active' : ''}>1</div>
          <div className={step >= 2 ? 'active' : ''}>2</div>
          <div className={step >= 3 ? 'active' : ''}>3</div>
        </div>

        <p className='message'>
          Step {step}: {messages[step - 1]}
        </p>
        <div className='buttons'>
          <button
            onClick={handlePrev}
            style={{ backgroundColor: 'SlateBlue', color: 'White' }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{ backgroundColor: 'SlateBlue', color: 'White' }}
          >
            Next
          </button>
        </div>
      </div>
      )}
    </React.Fragment>
  );
}

export default App;
