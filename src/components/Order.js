import React, {Fragment} from 'react'

const Order = () => {
    return (
        <Fragment>
            <div>
            <h3>Your Orders</h3>
            <span>Here you will find all the things that you have orderd from Wacko Dreamer</span>
            </div>
            <br/>
            <table className="table">
                <tbody>
                    <tr>
                        <h4>Order No.</h4>
                        <th scope="row">1</th>
                        <td>Tomato</td>
                        <td>Tomatoes are meh</td>
                        <td>$1.99</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

export default Order