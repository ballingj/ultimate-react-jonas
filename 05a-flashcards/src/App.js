import './styles.css';
import { useState } from 'react';
import { questions } from './questions';

export default function App() {
  return (
    <div className='App'>
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    id === selectedId ? setSelectedId(null) : setSelectedId(id);
  }

  return (
    <div className='flashcards'>
      {questions.map((question) => (
        <div
          key={question.id}
          className={question.id === selectedId ? 'selected' : ''}
          onClick={() => handleClick(question.id)}
        >
          {question.id === selectedId ? question.answer : question.question}
        </div>
      ))}
    </div>
  );
}
