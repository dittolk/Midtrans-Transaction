import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";

const TransactionCard = ({ transactionData, createPayment }) => {
    

    return (
        <Card className="mt-6 w-96">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Transaction id: {transactionData.id}
                </Typography>
                <p className="leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-4 text-start">
                    {transactionData.status}
                </p>
                <p className="leading-relaxed text-gray-700 font-bold text-[14px] md:text-[20px] line-clamp-4 text-start">
                    Rp{transactionData.total}
                </p>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="outlined" size="sm">
                    <div className="flex flex-row gap-2 justify-center items-center"><span>See details</span>
                    </div>
                </Button>
                <Button onClick={() => {createPayment(transactionData.id)}}>Pay</Button>
            </CardFooter>
        </Card>
    )
}

export default TransactionCard;