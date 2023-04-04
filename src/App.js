import './App.css';
import CardsContainer from './components/CardsContainer';
import {Provider } from 'react-redux'
import store from './redux/Store';
import Header from './components/Header';
import History from './components/History';
import {BrowserRouter,Route, Routes} from 'react-router-dom'

 


function App() {
  return (
      <Provider store={store}>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<CardsContainer/>}></Route>
        <Route path='/history' element={<History />}></Route>
      </Routes>
      </BrowserRouter>     
      </Provider>
  );
}

export default App;
