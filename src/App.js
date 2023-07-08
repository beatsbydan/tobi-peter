import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import WhatsNew from './Components/Pages/WhatsNew/WhatsNew';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route exact path ='/' element={<WhatsNew/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
