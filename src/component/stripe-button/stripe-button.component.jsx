import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton  = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J4MYUEOVwpqO8ht03j3bJM7Zf3BYGeK7OJEST5itYmNjYqZ2SOUIi3STmNwc1vO0IGuxRs1tVlsjStDUfYew12v00Dh8YXWSI';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
