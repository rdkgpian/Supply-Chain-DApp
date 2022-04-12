import { useContext } from "react"
import AppContext from "../components/AppContext"
import Router from 'next/router'
import { useState } from "react";

export default function AddNewUser() {
    const { supplyContract, currentAddress, users, setUserName, userName } = useContext(AppContext);
    const [name, setName] = useState('');

    const handleOnChange = (n)=>{
        setName(n.target.value)
        console.log(name)
    }

    const handleSubmit = async (event) => {
        setUserName(()=>name);
        console.log('SETTING USER NAME', userName)
        event.preventDefault();
        const userID = await supplyContract.addNewUser(name, currentAddress);
        const confirmTransaction = await userID.wait(1)
        if (confirmTransaction) {
            console.log(confirmTransaction)
            Router.push('/dashboard')
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center text-white gap-5">
            <label>Name: </label>
            <input type='text' className="text-black rounded-md" value={name} onChange={(e)=>handleOnChange(e)} />
            <button className="bg-red-500 w-[6%] h-[50px] rounded-md ">Create Account</button>
        </form>
    )
};