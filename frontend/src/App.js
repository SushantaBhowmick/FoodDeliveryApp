import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './components/pages/SignUp';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
     <CartProvider>
       <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Navbar />}>
              <Route exact path='' element={<Home />} />
              <Route exact path='login' element={<Login />} />
              <Route exact path='signup' element={<SignUp />} />
            </Route>
          </Routes>
        </div>
      </Router>
     </CartProvider>
  );
}

export default App;
