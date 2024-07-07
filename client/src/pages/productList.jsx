import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { useSelector } from "react-redux";
import { NavbarSimple } from "../components/navbar";

const ProducList = () => {

    const [product, setProduct] = useState([]);
    const user = useSelector((state) => state.user.value)

    const getProductData = async () => {
        try {
            const response = await axios.get('http://localhost:2000/api/products/');
            setProduct(response.data.result)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductData();
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            <NavbarSimple/>
            <div>
                {product.map((item, index) => (
                    <div className="flex flex-col gap-2 items-center" key={index}>
                        <ProductCard product={item} user={user} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProducList;