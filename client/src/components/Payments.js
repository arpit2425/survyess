import React, { Component } from "react";
import StripePayment from "react-stripe-checkout";
import { connect } from "react-redux";
import * as action from "../actions";

export class Payments extends Component {
  render() {
    return (
      <StripePayment
        name="surveyss"
        description="$5 for 5 survey"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripePayment>
    );
  }
}

export default connect(null, action)(Payments);
