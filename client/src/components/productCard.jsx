import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Cart from '../assets/cart.svg'
import axios from "axios";

const ProductCard = ({ product, user }) => {

    const addToCart = async () => {
        try {
            const response = await axios.post('http://localhost:2000/api/carts', {
                "product_id": product.id,
                "quantity": 1,
                "user_id": user.id
            })
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card className="mt-6 w-96">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {product.name}
                </Typography>
                <p className="leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-4 text-start">
                    {product.description}
                </p>
                <p className="leading-relaxed text-gray-700 font-bold text-[14px] md:text-[20px] line-clamp-4 text-start">
                    Rp{product.price}
                </p>
            </CardBody>
            <CardFooter className="pt-0">
                <Button onClick={addToCart} variant="outlined" size="sm">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <img src={Cart} alt="cart" className="w-5 h-5">
                        </img><span>Add to cart</span>
                    </div>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;