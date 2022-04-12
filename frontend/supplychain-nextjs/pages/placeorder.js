import { useContext, useEffect, useState } from "react"
import useSWR from "swr";
import AppContext from "../components/AppContext"
import bigNumber from "big-number";
import { ethers } from "ethers";

export default function PlaceOrder() {
    const {supplyContract, currentAddress, users, userID, provider} = useContext(AppContext);
    const [state, setState] = useState([])

    const handleOrders = async(e)=>{
        const itemID = e.target.parentNode.getAttribute('data-itemID');
        const ownerID = e.target.parentNode.getAttribute('data-ownerID');
        const itemName = e.target.parentNode.getAttribute('data-itemName');
        console.log('orderRequest DATA PASSING ',userID,itemID, itemName, ownerID)
        await supplyContract.orderRequest(userID,itemID, itemName, ownerID);

        supplyContract.on("orderRequested", (from, to, value, event) => {
            console.log({from, to, value, event})
            console.log('Order ID: ', to.args[0].toNumber())
            const orderID = to.args[0].toNumber();
        });
    }


    useEffect(()=>{
        users.map(async(user)=>{
            console.log('USER',user)
            if(user.userAddress==currentAddress){
                console.warn('You are the user', user.userAddress);
                return;
            }

            const userIDINT = user.userId.toNumber();
            
            const userdata = await supplyContract.getStock(userIDINT)
            console.log('USER DATA', userdata)

            const StringObj = userdata.map(data=>{

                return data.map(item=>{
                    return String(item)
                });
            })
            setState(prev=>[...prev, StringObj])
            
        })
    },[])

    
    return (
        <div className="w-full flex mt-6 text-white">
            <div className='flex flex-col justify-center items-center w-full'>
                <h1>Available Products:</h1>
                <div className="w-[90%] mt-6 flex justify-center flex-wrap flex gap-4">
                    {state.length>=1 && state.map(user=>{
                        return user.map(item=>{
                            return <div key={item} className='bg-gray-500 w-[15%] h-[250px] rounded-lg text-xl flex flex-col justify-center items-between'>
                                <table data-itemID={item[4]} data-ownerID={item[1]} data-itemName={item[5]} className="text-center flex flex-col gap-4 items-center">
                                <tr>{item[2]}</tr>
                                <tr>{item[5]}</tr>
                                <tr>${item[6]}</tr>
                                <tr>{item[8]}</tr>
                                <button className="w-[50%] h-[30px] mx-auto rounded-md bg-red-500" onClick={(e)=>handleOrders(e)}>Order</button>
                                </table>
                                <br/>
                            </div>
                            // return item.map(item2=>{
                            //     return <h1 key={item2}>{item2}</h1>
                                
                            // })
                            
                        })
                    })}
                </div>
                
            </div>
        </div>
    )
}

export async function getServerSideProps(){

    return{
        props:{

        }
    }
}