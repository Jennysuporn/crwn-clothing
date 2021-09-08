import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { createUserProfileDocument } from './firebase/firebase.utils';

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

  componentDidMount() {    // check if user sign in
    const auth = getAuth();     
    //open subsctiption, always check if the state is changed. Note: it always open as long as our application component is mounted.
    //Therefore, we need a new method call unsubscribeFromAuth
    // Note: The same user cannot sign up again
    this.unsubsribeFromAuth = onAuthStateChanged(auth, async userAuth => { 
      if (userAuth) {  //If true, it means user has signed in, then send the userAuth to creatUserProfileDocument()
        const userRef = await createUserProfileDocument(userAuth); //In createUserProfileDocument(), it return userRef

        onSnapshot(userRef, (snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
            ,
            ()=> {
              console.log(this.state);
            }
          );
        });
      }

      //if the userAuth is null (which means user has signed out), the currentUser shold be null also.
      this.setState({ currentUser: userAuth });
    });
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
