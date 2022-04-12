import { useEffect, useContext } from "react"
import { useState } from "react";
import AppContext from '../components/AppContext';

export default function ShipOrder() {
    const { userID, supplyContract } = useContext(AppContext);
    const [shippedOrders, setShippedOrders] = useState([])

    async function handleOrderShipping(order){
        const orderID = order[3];
        await supplyContract.orderShipping(userID,orderID);
    }

    useEffect(() => {
        async function getShippingOrders() {
            console.log('USER ID', userID)
            const shippingOrders = await supplyContract.getReceivedOrders(userID);
            const StringObj = shippingOrders.map(data=>{
                return data.map(item=>{
                    return String(item)
                });
            })
            console.log('SHIPPING ORDERS', StringObj)
            setShippedOrders(StringObj)
            console.log('SHIPPED STATE', shippedOrders)
        }

        getShippingOrders()
    }, [])

    return (
        <div className="w-full flex mt-6 text-white">
            <div className='flex flex-col justify-center items-center w-full'>
                <h1>Shipped Orders:</h1>
                <div className="w-[90%] mt-6 flex justify-center flex-wrap flex gap-4">
                {shippedOrders.map(order => {
                    if(order[4]=='false'){
                    return <div key={order.itemID} className='bg-gray-500 w-[15%] h-[250px] rounded-lg text-xl flex flex-col justify-center items-between'>
                        <table className="text-center flex flex-col gap-4 items-center">
                            <tr>Item Name: {order[2]}</tr>
                            <tr>Buyer ID: {order[1]}</tr>
                            <button className="w-[50%] h-[30px] mx-auto rounded-md bg-red-500" onClick={(e) => handleOrderShipping(order)}>Ship</button>
                        </table>
                        <br />
                    </div>
                    }
                })}
            </div>
        </div>
        </div>
    )
}