import React from "react";
import SearchBox from './components/SearchBox';
import Results from "./components/Results";
import ItemDetail from "./components/ItemDetail";
import './App.scss';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<SearchBox />} />
            <Route path="/items" element={<Results />} />
            <Route path="/items/:id" element={<ItemDetail />} />
           
          </Routes>
        </div>
    </Router>
  );
}

export default App;
