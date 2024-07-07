import { Router } from 'express';
import { productRouter } from './routers/product.router.js';
import { userRouter } from './routers/user.router.js';
import { cartRouter } from './routers/cart.router.js';
import { transactionRouter } from './routers/transaction.router.js';

const router = Router();

router.get('/', (req, res) => {
  res.send(`API for Ecommerce Transaction`);
});

router.use('/products' , productRouter)
router.use('/users', userRouter)
router.use('/carts', cartRouter)
router.use('/transactions', transactionRouter)

// add another router here ...

export default router;
