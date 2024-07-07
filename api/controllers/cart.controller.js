import db from '../models/index.js';

const { Cart, CartItem, Product } = db;

export const addToCart = async (req, res) => {
    try{
        const { product_id, user_id, quantity } = req.body;

        let cart = await Cart.findOne({
            where:{
                userId: user_id
            }
        })

        if(!cart){
            cart = await Cart.create({
                UserId: user_id
            })
        }

        let cartItem = await CartItem.findOne({
            where:{
                CartId: cart.id,
                ProductId: product_id
            }
        })

        if(cartItem){
            cartItem.quantity += quantity;
            await cartItem.save();
        }else{
            await CartItem.create({
                CartId: cart.id,
                ProductId: product_id,
                quantity
            })
        }

        return res.status(200).send({message: 'Item added to cart' })
    }catch(error){
        console.error(error)
        return res.status(500).send({message: error})
    }
}

export const getCartItem =  async(req, res) => {
    try{
        const user_id = req.params.userId

        const findCart = await Cart.findOne({
            where:{
                UserId: user_id
            }
        })

        if(!findCart){
            return res.status(404).send({message: 'Cart not found'})
        }

        const cartItem = await CartItem.findAndCountAll({
            include: [
                {
                  model: Product,
                },
              ],
            where:{
                CartId: findCart.id
            }
        });

        return res.status(200).send({result: cartItem})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: error})
    }
}