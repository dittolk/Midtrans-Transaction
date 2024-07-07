import { useParams } from "react-router-dom";
import { NavbarSimple } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionCard from "../components/transactionCard";

const Transaction = () => {

    const { userId } = useParams()
    const [transactionData, setTransactionData] = useState([])

    const getUserTransaction = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:2000/api/transactions/${userId}`);
            setTransactionData(response.data.transactionData)
        } catch (error) {
            console.error(error)
        }
    }

    const createPayment = async (id) => {
        console.log("INI ID", id);
        try {
            const response = await axios.post(`http://localhost:2000/api/transactions/payment`, {
                "id": id,
            });
            console.log("RESPONSE PAYMENT", response);
            window.snap.pay(response.data.token)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserTransaction(userId)
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey = "SB-Mid-client-r4OxqfCgD_r7dF2T"
        const script = document.createElement('script')
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey)
        script.async = true;

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])


    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            <NavbarSimple />
            <div className="flex flex-col items-center">
                {transactionData.map((item, index) => (
                    <div key={index}>
                        <TransactionCard transactionData={item} createPayment={createPayment} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transaction;