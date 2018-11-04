import React from 'react'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'

const AdminOrdersView = ({ orders, status }) => {
  const filteredOrders = orders.filter(order => {
    if(status === '') {
      return order
    } else {
      return order.status === status
    }
  });
  return (
    <Table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Order Status</th>
            <th>Order Total</th>
          </tr>
        </thead>
        {
          filteredOrders.map(order => {
            return (
              <tbody key={order.id}>
                <tr>
                    <td><Link to={`/admin/orders/${order.id}`} >{order.id}</Link></td>
                    <td>{order.status}</td>
                    <td>{order.total}</td>
                </tr>
              </tbody>

            )
          })
        }
    </Table>
  )
}

export default AdminOrdersView
