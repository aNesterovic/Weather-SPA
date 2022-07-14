import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
