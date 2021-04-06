import './App.css';
import { Switch, Route } from 'react-router';
import MainPageComponent from './components/MainPage/MainPageComponent';
import ListingPageComponent from './components/ListingPage/ListingPageComponent';
import SignInComponent from './components/SignIn/SignInComponent';
import AccountComponent from './components/Account/AccountComponent';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={MainPageComponent}/>
      <Route path='/listings/:listingId' exact component={ListingPageComponent}/>
      <Route path='/signin' exact component={SignInComponent}/>
      <Route path='/account/:id' exact component={AccountComponent}/>
    </Switch>
  );
}

export default App;
