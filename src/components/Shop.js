import React, {Fragment} from 'react'
import Categories from './Categories.js'
import Products from './Products.js'

const Shop = (props) => {
    const {categoryId} = props
    const {history} = props
    return (
        <Fragment>
            <div style={{display: 'flex'}}>
            <Categories/>
            <Products categoryId = {categoryId} history = {history}/>
            </div>
        </Fragment>
    )
}

export default Shop