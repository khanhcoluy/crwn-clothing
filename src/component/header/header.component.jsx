import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils'; 
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/' className='logo-container'> 
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {currentUser ? 
            (<div className='option' onClick={() => auth.signOut()}>
                SIGN OUT
             </div>
            ):(
             <Link className='option' to='/sign-in'>
                SIGN IN
             </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
)

const mapStatetoProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
})
 // get currentUser state from userReducer in root-reducer which is state;

export default connect(mapStatetoProps)(Header);