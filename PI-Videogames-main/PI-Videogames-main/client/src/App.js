import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardVideogame from './components/CardVideogame';
import DetailVideogame from './components/DetailVideogame';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path= '/' component ={LandingPage}/>
        <Route  path= '/home' component ={Home}></Route>
        <Route  path= '/videogame' component ={CardVideogame}/>
        <Route  path= '/videogame/:id' component ={DetailVideogame}/>
        {/* <Route  path= '/createGame' component ={CreateVideogame}/> */}

      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
