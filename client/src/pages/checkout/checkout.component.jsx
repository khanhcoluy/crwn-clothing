import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import CheckoutItem from '../../component/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../component/stripe-button/stripe-button.component';

import {
	selectCartItems,
	selectCartTotal,
} from '../../redux/cart/cart.selectors';

import {
	CheckoutPageContainer,
	CheckoutHeaderContainer,
	HeaderBlockContainer,
	TotalContainer,
	WarningContainer,
  CartEmptyContainer,
  BackToHomeButton
} from './checkout.styles';

const CheckoutPage = ({ cartItems, total, history }) => {
  if (cartItems.length) return (
	<CheckoutPageContainer>
		<CheckoutHeaderContainer>
			<HeaderBlockContainer>
				<span>Product</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Description</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Quantity</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Price</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Remove</span>
			</HeaderBlockContainer>
		</CheckoutHeaderContainer>
		{cartItems.map((cartItem) => (
			<CheckoutItem key={cartItem.id} cartItem={cartItem} />
		))}
		<TotalContainer>
			<span>TOTAL: ${total}</span>
		</TotalContainer>
		<WarningContainer>
			*Please use the following test credit card for the payments*
			<br />
			4242 4242 4242 4242 - Exp: Any future date - CVC: 123
		</WarningContainer>
		<StripeCheckoutButton price={total} />
	</CheckoutPageContainer>
  )
  return (
    <CartEmptyContainer>
      <span>There are no items in this cart</span>
      <BackToHomeButton onClick={() => history.push('/shop')}>Continue Shopping</BackToHomeButton>
    </CartEmptyContainer>
  )
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

export default withRouter(connect(mapStateToProps)(CheckoutPage));
