import { Fragment, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { ethers } from "ethers";
import AbiJson from "./ABI.json"

const people = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar:
            'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar:
            'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar:
            'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

import HomePage from "../pages";

export default function Layout({ children }) {
    const [selected, setSelected] = useState(people[3])
    const [open, setOpen] = useState(false)

    const metaMaskConnect = async ()=> {
        const Supplyaddress = "0xeb589d38a1fb9ce91c917b80a6736c3f8d70ba74";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await provider.send("eth_requestAccounts", []);
        const currentAddress = await signer.getAddress();
        const abi = AbiJson.output.abi;
        const SupplyContract = new ethers.Contract(Supplyaddress, abi, signer);
        const users = await SupplyContract.getUsers();
        const userID = await SupplyContract.getIdfromAddress(currentAddress);
        const userIdInt = userID.toNumber();
        
        let isUserFound = false;
        
        async function checkUser(){
            users.map(async(user)=>{
                if(user.userAddress===currentAddress){
                    isUserFound = true;
                    alert('User already exists')
                    const userData = await SupplyContract.getuserMetadata(userIdInt);
                    console.log(userData)
                }
            })
            
            if(!isUserFound){
                const userName = prompt("Enter a username: ")
                console.log(userName, currentAddress);
                const userID = await SupplyContract.addNewUser(userName, currentAddress);
                setTimeout(()=>console.log(userID), 5000)

            }
        }
        
        checkUser();

        
        // console.log(users)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className='flex ml-28 justify-center w-full'>
                <div className='w-[30%] flex flex-col items-center'>
                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-start text-sm font-medium text-white">Select User</Listbox.Label>
                                <div className="mt-1 relative w-full ">
                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <span className="flex items-center">
                                            <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                            <span className="ml-3 block truncate">{selected.name}</span>
                                        </span>
                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {people.map((person) => (
                                                <Listbox.Option
                                                    key={person.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={person}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {person.name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className='ml-4 flex justify-start w-[10%]'>
                    <button
                        type="button"
                        className="inline-flex w-[6vw] md:w-[8vw] h-[41px] mr-4 mt-6 items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={metaMaskConnect}
                    >
                        Connect Wallet
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

                                    {/* This element is to trick the browser into centering the modal contents. */}
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
                                            <div>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                        User Name:
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="user-name"
                                                            id="user"
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
                                                            placeholder="Jack"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-[8vw] h-[41px] mt-6 items-center justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-6">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}