import React, { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Cart from '../assets/cart.svg'
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavList({ count }) {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Button className="flex items-center justify-center gap-2" variant="text" onClick={() => navigate(`/cart-detail/${user.id}`)}>
                <img src={Cart} alt="cart" className="w-6 h-6"></img>
                {/* <p className="leading-relaxed text-gray-700 text-[14px] md:text-[15px]">{count}</p> */}
                asd{count}
            </Button>
            <Button variant="text" onClick={() => navigate(`/transaction/${user.id}`)}>Transactions</Button>
        </ul>
    );
}

export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const [count, setCount] = useState(0);
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();

    const getCartItem = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/carts/item/${user.id}`)
            if (response) {
                handleSetCount(response.data.result.count)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSetCount = (count) => {
        setCount(count)
    }

    useEffect(() => {
        getCartItem();
    }, [user])

    return (
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3 md:mt-5">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                    onClick={() => navigate('/')}
                >
                    Vice Store
                </Typography>
                <div className="hidden lg:block">
                    <NavList count={count} />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}