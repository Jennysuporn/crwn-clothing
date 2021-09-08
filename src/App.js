import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { getAuth, onAuthStateChanged  } from "firebase/auth";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

class App extends React.Component {
    constructor(){
      super();

      this.state = {
        currentUser: null
      }
    }

  unsubsribeFromAuth = null

  componentDidMount() {   
    const auth = getAuth();
    //open subsctiption, always check if the state is changed. Note: it always open as long as our application component is mounted.
    //Therefore, we need a new method call unsubsribeFromAuth
    this.unsubsribeFromAuth = onAuthStateChanged(auth, (user) => { 
        this.setState({ currentUser: user });
        console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubsribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />  
        <switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUpPage}/>
        </switch>
      </div>
    );
  }
}

export default App;
