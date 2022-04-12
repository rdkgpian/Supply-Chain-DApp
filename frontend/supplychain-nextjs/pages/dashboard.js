import Link from 'next/link'
import { useContext } from 'react';
import AppContext from '../components/AppContext';

export default function Dashboard(){
    const contextApi = useContext(AppContext);
    const {provider,setProvider,supplyContract,setSupplyContract,userID,setUserID,userName,setUserName} = contextApi;

    return(
        <div>
            <div className='flex justify-center w-full'>
                <div className="flex flex-col items-center text-white">
                    <Link href="/startchain">
                    <button
                        type="button"
                        className="inline-flex w-[8vw] h-[41px] mr-4 mt-6 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Start Chain
                    </button>
                    </Link>

                    <Link href="/placeorder">
                    <button
                        type="button"
                        className="inline-flex w-[8vw] h-[41px] mr-4 mt-6 items-center justify-start px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Place Order
                    </button>
                    </Link>
                    <Link href="/shiporder">
                    <button
                        type="button"
                        className="inline-flex w-[8vw] h-[41px] mr-4 mt-6 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ship Order
                    </button>
                    </Link>

                    <Link href="/addstock">
                    <button
                        type="button"
                        className="inline-flex w-[8vw] h-[41px] mr-4 mt-6 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Stock
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}