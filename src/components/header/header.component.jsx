import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //Connect is a higher order component that lets us modify our component to have access to things related to redux

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to ='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to = '/shop'>
                SHOP
            </Link>
            <Link className='option' to = '/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)

//here, state is from root producer . For the first times, it is set to null
//in this mapStateToProps, it is the currentUser because it is the passed parameter for const Header
// The currentUser is the passed parameter.
const mapStateToProps = state => ({
    currentUser: state.user.currentUser 
});

export default connect(mapStateToProps)(Header);
//first argument of connect is function that allow us to access the state from our producer.