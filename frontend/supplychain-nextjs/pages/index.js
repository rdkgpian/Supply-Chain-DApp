import Router from 'next/router'
import { ethers } from "ethers";
import AbiJson from "../components/ABI.json"
import { useState, useEffect, useContext } from 'react';
import AppContext from '../components/AppContext';

export default function HomePage() {
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [buttonText, setButtonText] = useState('')
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState('')
  const {provider, setProvider,setSupplyContract,setUserID,userID, setCurrentAddress,setUsers, setUserName} = useContext(AppContext);

  const initialize = () => {
    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    };

    //------Inserted Code------\\
    const MetaMaskClientCheck = () => {
      //Now we check to see if MetaMask is installed
      if (!isMetaMaskInstalled()) {
        //If it isn't installed we ask the user to click to install it
        setIsMetaMaskInstalled(false);
        setButtonText('Click to install MetaMask!');
      } else {
        //If it is installed we change our button text
        setIsMetaMaskInstalled(true);
        setButtonText('Connect');
      }
    };
    MetaMaskClientCheck();
  };

  useEffect(() => {
    initialize();
  }, [])

  const metaMaskConnect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts) {
        const Supplyaddress = "0x44b1dab6a7a37bbf6bc2b8d9b221231538da161f";
        const signer = provider.getSigner();
        const currentAddress = await signer.getAddress();
        setCurrentAddress(currentAddress);
        const abi = AbiJson.output.abi;
        const SupplyContract = new ethers.Contract(Supplyaddress, abi, signer);
        setSupplyContract(SupplyContract);
        const users = await SupplyContract.getUsers();
        console.log('USERS',users);
        setUsers(users)
        const userID = await SupplyContract.getCredentialsfromAddress(currentAddress);
        console.log(userID);
        const userIdInt = userID.userId.toNumber();
        console.log('User ID INT',userIdInt);
        setUserID(userIdInt);
        setUserName(userID.userName);
        let isUserFound = false;

        async function checkUser() {
          users.map(async (user) => {
            if (user.userAddress === currentAddress) {
              isUserFound = true;
              alert('User already exists')
              const userData = await SupplyContract.getuserMetadata(userIdInt);
              Router.push('/dashboard')
            }
          })

          if (!isUserFound) {
            Router.push('/addnewuser');
          }
        }
        checkUser();
        
      }
    }
    catch (error) {
      console.log('error', error);
      return error
    }
  }

  const signTransaction = async () => {
    setWalletConnecting(true)



    return checkUser();
  }

  const checkWalletConnection = async () => {
    const isWalletConnected = await metaMaskConnect();

    console.log(isWalletConnected)
  }

  const installMetamask = () => {
    window.open('https://metamask.io/download/', '_ blank');
  }


  return (
    <div>
      <h1 className='text-white text-center text-xl font-semi-bold pt-12'>Welcome to Genesis Blocks - A Decentralized Supply Chain!</h1>
      <div className=' w-full h-full flex justify-center items-center'>

        <button
          type="button"
          className="inline-flex w-[10vw]  md:w-[8vw] h-[45px] mr-4 mt-6 items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-[#d70a84] bg-white hover:text-white hover:bg-[#d70a84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={isMetaMaskInstalled ? checkWalletConnection : installMetamask}
          disabled={walletConnecting}
        >
          {buttonText}
        </button>



      </div>
    </div>
  )
}