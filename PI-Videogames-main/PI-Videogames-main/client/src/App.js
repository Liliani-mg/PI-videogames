import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardVideogame from './components/CardVideogame';
import DetailVideogame from './components/DetailVideogame';
import CreateVideogame from './components/CreateVideogame';
import CardError from './components/CardErr';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path= '/' component ={LandingPage}/>
        <Route path= '/home' component ={Home}/>
        <Route path= '/videogame' component ={CardVideogame}/>
        <Route path= '/createvideogame' component={CreateVideogame}/>
        <Route path= '/videogames/:id' component ={DetailVideogame}/>
        <Route path= '*' component ={CardError}/>

      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
