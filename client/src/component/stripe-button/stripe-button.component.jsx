import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';

import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51J4MYUEOVwpqO8ht03j3bJM7Zf3BYGeK7OJEST5itYmNjYqZ2SOUIi3STmNwc1vO0IGuxRs1tVlsjStDUfYew12v00Dh8YXWSI';

	const onToken = (token) => {
		console.log(token);
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then((response) => {
				alert('Payment successful');
        clearCart();
			})
			.catch((error) => {
				console.log('Payment error: ', JSON.parse(error));
				alert(
					'There was an issue with your payment. Please sure you use the provided credit card.'
				);
			});
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN Clothing"
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
})

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
