import React, {Component, Fragment} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { updateOrder } from '../store/ordersReducer'
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false}
    this.submit = this.submit.bind(this);
  }

  async submit(e) {
    const { amount, updateOrder, createdOrder, isGuest, history } = this.props
    const fromUSDToCent = amount => { 
      return Math.round(amount * 100)
    }

    let { token } = await this.props.stripe.createToken({name: createdOrder.id});
    console.log(token)

    let res = await axios.post("/api/charge", {
      token: token.id,
      amount: fromUSDToCent(amount)
    });

    if (res.data === 'succeeded'){
      this.setState({complete:true})
      updateOrder(createdOrder, 'COMPLETED', isGuest, history)
      }
  }

  render() {
    const { complete } = this.state
    const { submit } = this

    return (
      <div className="checkout">
        <CardElement />
        <button onClick = {submit}>Confirm Order</button>
        {complete ? <Fragment>Transaction Successful</Fragment>: null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    amount: ownProps.amount,
    createdOrder: ownProps.createdOrder,
    isGuest: ownProps.isGuest,
    history: ownProps.history
})

const mapDispatchToProps = ({updateOrder})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));