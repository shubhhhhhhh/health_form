import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './components/page/Page';
import Summary from './components/summary/Summary';
import GlobalContext from './context/ContextGlobal';

function App() {
  return (
    <>
      <GlobalContext>
        <Router>
          <Routes>
            <Route path='/' element={<Page />} />
            <Route path='summary' element={<Summary />} />
          </Routes>
        </Router>
      </GlobalContext>
    </>
  )
}

export default App;
