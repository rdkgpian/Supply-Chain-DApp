import { useEffect, useContext, useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, HandIcon } from '@heroicons/react/outline'
import AppContext from '../components/AppContext';

export default function AddStock() {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({itemName:'',cost:2,retail:true,location:''});
    const { userID, supplyContract } = useContext(AppContext);
    const [reqOrders, setReqOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();

    async function handleOrderShipping() {
        console.log(selectedOrder)
        // addTransaction(_userId, _userName, _location, _orderID, _itemId, _itemName, _isRetail, _cost)
    }

    function formChangeHandle(newItemName, newItemValue){
        console.log(selectedOrder)
        // setFormData((prevState)=>{
        //     console.log(prevState)
        //     return {...prevState, [newItemName]: newItemValue}
        // })
    }
    
    function generateRandomID(){
        const randomNum1 = Math.floor(Math.random()*(10**8));
        const randomNum2 = Math.floor(Math.random()*(10**8));

        const finalNumID = (randomNum1+randomNum2)/2;
        const intNumID = parseInt(finalNumID)
        return intNumID;
    }

    function handleModal(order){
        setSelectedOrder(order);
        setOpen(true);
    }

    useEffect(() => {
        async function getRequestedOrders() {
            const getReqOrders = await supplyContract.getRequestedOrders(userID);
            const StringObj = getReqOrders.map(data => {
                return data.map(item => {
                    return String(item)
                });
            })
            console.log(StringObj)
            if (StringObj) {
                setReqOrders(StringObj);
            }

        }
        getRequestedOrders();
    }, [])

    return (
        <div className="w-full">
            <div className="w-full flex mt-6 text-white">
                <div className='flex flex-col justify-center items-center w-full'>
                    <h1>Requested Orders:</h1>
                    <div className="w-[90%] mt-6 flex justify-center flex-wrap flex gap-4">
                        {reqOrders.map(order => {

                            return <div key={order.itemID} className='bg-gray-500 w-[15%] h-[250px] rounded-lg text-xl flex flex-col justify-center items-between'>
                                <table className="text-center flex flex-col gap-4 items-center">
                                    <tr>Item Name: {order[2]}</tr>
                                    <tr>Buyer ID: {order[1]}</tr>
                                    <button className="w-[50%] h-[30px] mx-auto rounded-md bg-red-500" onClick={() => handleModal(order)}>Pay</button>
                                </table>
                                <br />
                            </div>

                        })}
                    </div>
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div className='flex flex-col justify-center items-center justify-center w-full text-black'>
                                    <h1 className='text-black'>Enter Product Details</h1>
                                    <div className="w-[60%] sm:w-[40%] lg:w-[80%] mt-6 flex flex-col gap-4 ">
                                        <div className="flex items-center w-full justify-between">
                                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                                Item Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="item-name"
                                                    id="item"
                                                    value={formData.itemName}
                                                    onChange={(e) => formChangeHandle('itemName', e.target.value)}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
                                                    placeholder="Tomatoes"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center w-full justify-between">
                                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                                Cost
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="number"
                                                    name="cost"
                                                    id="cost"
                                                    value={formData.cost}
                                                    onChange={(e) => formChangeHandle('cost', e.target.value)}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
                                                    placeholder="$2.5"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center w-full justify-between">
                                            <label htmlFor="location" className="block text-sm font-medium w-[50%] text-black">
                                                Is it Retail?
                                            </label>
                                            <div className="w-[49%] mt-1">
                                                <select
                                                    id="isretail"
                                                    name="isretail"
                                                    className="mt-1 block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    defaultValue={formData.retail}
                                                    onChange={(e) => formChangeHandle('retail', e.target.value)}
                                                >
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="flex items-center w-full justify-between">
                                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                                Location:
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="item-name"
                                                    id="item"
                                                    value={formData.location}
                                                    onChange={(e) => formChangeHandle('location', e.target.value)}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
                                                    placeholder="New Delhi"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ml-4 flex justify-center w-full'>
                                        <button
                                            type="button"
                                            className="inline-flex w-[6vw] md:w-[8vw] h-[41px] mr-4 mt-6 items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={handleOrderShipping}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}