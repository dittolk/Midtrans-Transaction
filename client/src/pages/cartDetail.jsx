import { Card, CardBody, Typography, Avatar, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from "react-router-dom";
import { NavbarSimple } from "../components/navbar";


const CartDetail = () => {
    const { userId } = useParams();
    const [cartItem, setCartItem] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const getCartItem = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/carts/item/${userId}`)
            if (response) {
                setCartItem(response.data.result.rows);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const checkout = async () => {
        try {
            const response = await axios.post('http://localhost:2000/api/transactions/checkout',
                {
                    "user_id": userId,
                    "payment_methode": "BCA"
                }
            )
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        } catch (error) {
            console.error(error)
        }
    }

    const handleCheckout = () => {
        checkout()
    }

    useEffect(() => {
        getCartItem();
    }, [handleCheckout])


    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            <NavbarSimple />
            <div className="flex justify-center items-center">
                <Card className="w-96 mt-10">
                    <CardBody>
                        <div className="mb-4 flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray" className="">
                                Cart
                            </Typography>
                        </div>
                        {cartItem.length > 0 ?
                            <>
                                <div className="divide-y divide-gray-200">
                                    {cartItem.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <div>
                                                    <Typography color="blue-gray" variant="h6">
                                                        {item.Product?.name}
                                                    </Typography>
                                                    <Typography color="blue-gray" variant="small">
                                                        Rp{item.Product?.price}
                                                    </Typography>
                                                    <Typography variant="small" color="gray">
                                                        x{item.quantity}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Typography color="blue-gray" variant="h6">
                                                {item.Product?.price * item.quantity}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex divide-y divide-gray-200 items-center justify-center">
                                    <Button onClick={() => handleCheckout()} variant="gradient" color="green">Checkout</Button>
                                </div>
                            </>
                            :
                            <p className="leading-relaxed text-gray-700 font-bold text-[14px] md:text-[16px] line-clamp-4 text-start">
                                You don't have any items.
                            </p>
                        }
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CartDetail;