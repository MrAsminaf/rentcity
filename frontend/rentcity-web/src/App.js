import './App.css';
import { Switch, Route } from 'react-router';
import MainPageComponent from './components/MainPage/MainPageComponent';
import ListingPageComponent from './components/ListingPage/ListingPageComponent';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={MainPageComponent}/>
      <Route path='/listings/:listingId' exact component={ListingPageComponent}/>
    </Switch>
  );
}

export default App;
