import React, { useEffect } from "react";
import { useGetAllTransactionQuery } from "../../redux/api/landownerApi";
import toast from "react-hot-toast";
import LoadingComponent from "../common/LoadingComponent";
import HeadingSmall from "../common/HeadingSmall";


export default function EarningTable() {

    const { data, error, isLoading, isError } = useGetAllTransactionQuery();

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Failed to fetch earnings");
        }
    }, [isError, error]);



    if (isLoading) {
        return <div> <LoadingComponent /> </div>
    }

    

    if (!data?.transactions || data.transactions.length === 0) {
        return <div><HeadingSmall text="You have no transactions so far" /></div>;
    }


    return (
        <div className="overflow-x-auto  ">
            <table className="w-full min-w-[600px]">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="pl-6 py-5 text-left text-sm  text-gray-700 font-semibold" colSpan={1}>
                            Date
                        </th>
                        <th className=" py-5 text-center text-sm font-semibold text-gray-700" colSpan={1}>
                            Time
                        </th>
                        <th className=" py-5 text-center text-sm font-semibold text-gray-700" colSpan={1}>
                            Amount
                        </th>

                        <th className=" py-4 text-center text-sm font-semibold text-gray-700" colSpan={2}>
                            Transaction ID
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {data?.transactions?.map((transaction, index) => (
                        <tr
                            key={transaction.id}
                            className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
                        >
                            <td className="pl-6 py-5 text-sm text-gray-900">
                                {transaction.date} 
                            </td>
                            <td className="py-5 text-center text-sm text-gray-900">
                                {transaction.time} 
                            </td>
                            <td className="py-5 text-center text-sm text-gray-900">
                                {transaction.amount} 
                            </td>
                            <td className="py-5 text-center text-sm text-gray-900">
                                {transaction.transactionId} 
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            {/* Scroll Indicator for Mobile */}
            <div className="text-center mt-2 text-xs text-gray-500">Swipe left to see more columns →</div>

        </div>
    );
}
