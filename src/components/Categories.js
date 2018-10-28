import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const catStyle = {
    margin: '10px'
}

class Categories extends Component {
    render() {
        const { categories } = this.props
        return (
            <div style = {catStyle}>
                <br/>
                <h6>Show results for</h6>
                <ul className="nav flex-column">
                    {categories.map(category => {
                        return (
                            <Link to={`/${category.id}`}>
                            <li className="nav-item" key = { category.id }>
                                <strong>{category.name}</strong>
                            </li>
                            </Link>
                        )
                    })}
                    <li className="nav-item">
                        All categories
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ categories }) => {
    return {
        categories
    }
}

export default connect(mapStateToProps)(Categories)