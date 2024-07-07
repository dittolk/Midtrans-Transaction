import { Router } from 'express';
import { addToCart, getCartItem } from '../controllers/cart.controller.js';

const cartRouter = Router()

cartRouter.post('/', addToCart)
cartRouter.get('/item/:userId', getCartItem)

export { cartRouter }