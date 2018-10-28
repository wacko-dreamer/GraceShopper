import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const catStyle = {
    margin: '10px',
    width: '300px',
}

class Categories extends Component {
    render() {
        const { categories } = this.props
        return (
            <div style={catStyle}>
                <br />
                <h6>Show results for</h6>
                <ul className="nav flex-column">
                    {categories.map(category => {
                        return (
                            <Link to={`/categories/${category.id}`}>
                                <li className="nav-item" key={category.id}>
                                    {category.name}
                                </li>
                            </Link>
                        )
                    })}
                    <Link to={`/`}>
                    <li className="nav-item">
                        All categories
                    </li>
                    </Link>
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