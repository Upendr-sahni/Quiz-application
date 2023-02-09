import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Components/Pages/Home/Home';
import Quize from './Components/Pages/Quize/Quize';
import Result from './Components/Pages/Result/Result';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`);
    setQuestions(data.results);
  };
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: 'url(./ques1.png)' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path="/quiz" element={<Quize
           name={name}
           questions={questions}
           score={score}
           setScore={setScore}
           setQuestions={setQuestions}
          />} />
          <Route path="/result" element={<Result name={name} score={score}/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
