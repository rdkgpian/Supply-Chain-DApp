import Layout from '../components/Layout'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import react from 'react';
import AppContext from '../components/AppContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const [provider, setProvider] = useState('provider');
  const [supplyContract, setSupplyContract] = useState('contract');
  const [userID, setUserID] = useState('id');
  const [userName, setUserName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('address');
  const [users, setUsers] = useState([]);

  {
    if (asPath == '/' || asPath == '/addnewuser') {
      return <AppContext.Provider value={{provider, setProvider,supplyContract,setSupplyContract,userID,setUserID,userName,setUserName,currentAddress, setCurrentAddress,users, setUsers}}>
        <Component {...pageProps} />
      </AppContext.Provider>
    } else {
      return (<AppContext.Provider value={{provider, setProvider,supplyContract,setSupplyContract,userID,setUserID,userName,setUserName,currentAddress, setCurrentAddress,users, setUsers}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>)
    }
  }

}

export default MyApp
