/* Modifying code to incorporate reuseable Button component - lesson 90 - Children Props & lesson 91 - StepMessage */
import React from 'react';
import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrev() {
    if (step > 1) {
      // setStep(step - 1);
      setStep((currentStep) => currentStep - 1);
    }
  }

  function handleNext() {
    if (step < 3) {
      // setStep(step + 1); incorrect
      setStep((currentStep) => currentStep + 1); //must be a callback where currentStep is the current state
    }
  }

  return (
    <React.Fragment>
      <button
        className='close'
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        &times;
      </button>

      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className='buttons'>
              <Button bgColor='SlateBlue' textColor='White' onClick={() => {}}>
                Learn
              </Button>
            </div>
          </StepMessage>

          <div className='buttons'>
            <Button
              bgColor='SlateBlue'
              textColor='White'
              onClick={handlePrev}
            >
              <span>👈</span> Previous
            </Button>

            <Button
              bgColor='SlateBlue'
              textColor='White'
              text='Next'
              onClick={handleNext}
            >
              Next <span>👉</span>
            </Button>
          </div>
        
        </div>
      )}
    </React.Fragment>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
