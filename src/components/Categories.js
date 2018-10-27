import React, { Component, Fragment } from 'react'

class Categories extends Component {
    render() {
        return (
            <div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Large</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Medium</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Small</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">All Categories</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Categories