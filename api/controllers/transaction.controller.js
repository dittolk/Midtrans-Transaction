import db from '../models/index.js';
import Midtrans from 'midtrans-client';
import 'dotenv/config';

const { Transaction, TransactionDetail, Cart, CartItem, Product } = db;

export const createTransaction = async (req, res) => {
    try {

        const { user_id, payment_method } = req.body

        const cartData = await Cart.findOne({
            where: {
                UserId: user_id
            },
            include: [{
                model: CartItem,
                include: [Product] // Include Product to access price
            }]
        })

        if (!cartData) {
            return res.status(404).send({ message: "Cart not found" })
        }

        // Check if the cartData has items
        if (cartData.CartItems.length === 0) {
            return res.status(400).send({ message: "Cart is empty" });
        }

        // Start a transaction
        const result = await db.sequelize.transaction(async (t) => {
            // Calculate the total amount for the transaction
            const totalAmount = cartData.CartItems.reduce((total, item) => total + item.quantity * item.Product.price, 0);
            // Create the transaction
            const transaction = await Transaction.create({
                UserId: user_id,
                total: totalAmount,
                status: 'Waiting for payment', // You can modify the initial status as needed
                payment_method: payment_method || 'unknown',
            }, { transaction: t });

            // Create transaction details
            for (const cartItem of cartData.CartItems) {
                await TransactionDetail.create({
                    TransactionId: transaction.id,
                    ProductId: cartItem.ProductId,
                    quantity: cartItem.quantity,
                    product_price: cartItem.Product.price,
                    total_price: cartItem.quantity * cartItem.Product.price,
                    product_name: cartItem.Product.name, // Assuming CartItem has a product_name field
                    product_description: cartItem.Product.description, // Assuming CartItem has a product_description field
                }, { transaction: t });
            }

            // Clear the cartData
            await CartItem.destroy({
                where: {
                    CartId: cartData.id
                },
                transaction: t
            });

            return transaction;
        });

        return res.status(200).send({ message: 'Transaction created successfully', transaction: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error })
    }
}

export const getUserTransaction = async (req, res) => {
    try {
        const user_id = req.params.userId;

        const transactionData = await Transaction.findAll({
            where: {
                UserId: user_id
            }
        })

        if (!transactionData) {
            return res.status(404).send({ message: "You don't have any active transactions." })
        }

        return res.status(200).send({ message: "Success getting user transaction data", transactionData })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error })
    }
}

export const createPayment = async (req, res) => {
    let snap = new Midtrans.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        // clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
    try {
        const { id } = req.body;

        const transactionData = await Transaction.findOne({
            where:{
                id: id
            }
        })

        if(!transactionData){
            return res.status(404).send({message: 'Transaction data not found'})
        }

        const params = {
            transaction_details: {
                order_id: transactionData.id,
                gross_amount: transactionData.total,
            },
        };

        const token = await snap.createTransactionToken(params);
        console.log(token, '>>>>> token');

        // await Transaction.update(
        //     {
        //         status: 'Payment Completed',
        //         payment_method: 'Automatic',
        //     },
        //     {
        //         where: {
        //             id: transactionData.id,
        //         },
        //     },
        // );

        return res.status(200).send({message: "Payment created", token});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
};