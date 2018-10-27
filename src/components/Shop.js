import React, {Fragment} from 'react'
import Categories from './Categories.js'
import Products from './Products.js'

const Shop = () => {
    return (
        <Fragment>
            <div style={{display: 'flex'}}>
            <Categories/>
            <Products/>
            </div>
        </Fragment>
    )
}

export default Shop