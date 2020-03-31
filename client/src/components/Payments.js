import React, { Component } from "react";
import StripePayment from "react-stripe-checkout";

export class Payments extends Component {
  render() {
    return (
      <StripePayment
        name="surveyss"
        description="$5 for 5 survey"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripePayment>
    );
  }
}

export default Payments;
