import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';


import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

class App extends React.Component {

    //DELETE THIS BECAUSE const mapDispatchToPtops does this job for redux
    //    constructor(){
    //      super();
    //      this.state = {
    //        currentUser: null
    //       }
    //     }

  unsubsribeFromAuth = null

  componentDidMount() {    // check if user sign in
    const auth = getAuth();  
    const { setCurrentUser } = this.props;   
    //open subsctiption, always check if the state is changed. Note: it always open as long as our application component is mounted.
    //Therefore, we need a new method call unsubscribeFromAuth
    // Note: The same user cannot sign up again
    this.unsubsribeFromAuth = onAuthStateChanged(auth, async userAuth => { 
      if (userAuth) {  //If true, it means user has signed in, then send the userAuth to creatUserProfileDocument()
        const userRef = await createUserProfileDocument(userAuth); //In createUserProfileDocument(), it return userRef

        onSnapshot(userRef, (snapShot) => {
          // this.setState(
          //   {
          //     currentUser: {
          //       id: snapShot.id,
          //       ...snapShot.data()
          //     }
          //   }
          //   ,
          //   ()=> {
          //     console.log(this.state);
          //   }
          // );
          // Replace this with the below line because we use REDUX 
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }

      //if the userAuth is null (which means user has signed out), the currentUser shold be null also.
      // this.setState({ currentUser: userAuth });
      // Replace this with the below line because we use REDUX 
      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unsubsribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} />   */}
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage}/>
          {/* render is the render key that we use in our class components */}
          <Route
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
  }
}

//created this function because when user signed in, the sign-in page shold be hidden.
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
  //setCurrentUser is a function that gets the user objects. and then calls dispatch
  // dispatch is a way for Redux to know that whatever you're passing me,
  //  whatever object,you're passing me,is going to be an action object that 
  //  I'm going to pass to every producer.
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
//after add "mapStateToProps" to this argument, we can not access this.props.currentUser
