import {createStore} from 'redux'
import cardsReducer from './CardReducer'

const store=createStore(cardsReducer)

export default store
