import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import {Provider} from 'react-redux'
import store from './store'

const root = document.getElementById('root')

render(
    <Provider store={store}>
        <App/>
    </Provider>, root)