import React, {useEffect, useState} from "react";
import SearchBox from './components/SearchBox';
import Results from "./components/Results";
import './App.scss';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<SearchBox />} />
            <Route path="/items?search=" exact element={<Results />} />
           
          </Routes>
        </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>{!data ? "Loading..." : data}</p>
    //   </header>
    // </div>
  );
}

export default App;
