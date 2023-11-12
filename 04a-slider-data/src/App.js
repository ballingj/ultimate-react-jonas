import { useState } from 'react';
import './styles.css';

export default function App() {
  return (
    <div className='App'>
      <Counter />
    </div>
  );
}

function Counter() {
  //const [date, setDate] = useState(new Date())
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date(Date.now());
  date.setDate(date.getDate() + count);

  function decreaseCount() {
    setCount((currCount) => currCount - step);
  }

  function increaseCount() {
    setCount((currCount) => currCount + step);
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>

      <div>
        <button onClick={decreaseCount}>-</button>
        <input
          type='text'
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={increaseCount}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {step !== 1 || count !== 0 ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
    </div>
  );
}
