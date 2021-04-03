import './App.css';
import { Switch, Route } from 'react-router';
import MainPageComponent from './components/MainPage/MainPageComponent';
import ListingPageComponent from './components/ListingPage/ListingPageComponent';
import SignInComponent from './components/SignIn/SignInComponent';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={MainPageComponent}/>
      <Route path='/listings/:listingId' exact component={ListingPageComponent}/>
      <Route path='/signin' exact component={SignInComponent}/>
    </Switch>
  );
}

export default App;
