import React, {useState, useEffect} from 'react'

import { networkParams } from "../components/Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../components/Utils/providerOptions";


import {
 Input, Text, Button, Container, Switch
} from '@chakra-ui/react'

const CreateNft = () => {
  
const [revealed, setRevealed] = useState('No: By Default');
const [isRevealed, setIsRevealed] = useState(false);

const factoryAddress = "0x152375892E4a70C44f637bf01721120386A73CF9";

const [nftDetails, setNftDetails] = useState({
  tokenName: '',
  tokenSymbol: '',
  tokenBanner: '',
  tokenSupply: 0,
  simpleUri: '',
  notRevealedUri: '',
  notRevealed: false,
  price: 0,
  maxPerWallet: 1
 });

// OnChange Handlers
const nameChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenName: event.target.value}
   });
}

const symbolChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenSymbol: event.target.value}
   });
}

const bannerChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenBanner: event.target.value}
   });
}

const supplyChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenSupply: event.target.value}
   });
}

const simpleUriChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, simpleUri: event.target.value}
   });
}

const revealedUriChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, notRevealedUri: event.target.value}
   });
}

const revealedChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, notRevealed: event.target.value}
   });
}

const priceChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, price: event.target.value}
   });
}

const maxPerWalletChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, maxPerWallet: event.target.value}
   });
}



const [provider, setProvider] = useState();
const [library, setLibrary] = useState();
const [account, setAccount] = useState();
const [signature, setSignature] = useState("");
const [isError, setError] = useState("");
const [chainId, setChainId] = useState();
const [network, setNetwork] = useState();
const [message, setMessage] = useState("");
const [signedMessage, setSignedMessage] = useState("");
const [verified, setVerified] = useState();

const mintNft = async () => {
  if (typeof window !== 'undefined'){
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      });

      
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);


    } catch (error) {
      setError(error);
    }
  }
 
}

const connectWallet = async () => {
  if (typeof window !== 'undefined'){
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      });

      
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);


    } catch (error) {
      setError(error);
    }
  }
 
};

const handleNetwork = (e) => {
  const id = e.target.value;
  setNetwork(Number(id));
};

const handleInput = (e) => {
  const msg = e.target.value;
  setMessage(msg);
};

const switchNetwork = async () => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(network) }]
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [networkParams[toHex(network)]]
        });
      } catch (error) {
        setError(error);
      }
    }
  }
};

const signMessage = async () => {
  if (!library) return;
  try {
    const signature = await library.provider.request({
      method: "personal_sign",
      params: [message, account]
    });
    setSignedMessage(message);
    setSignature(signature);
  } catch (error) {
    setError(error);
  }
};

const verifyMessage = async () => {
  if (!library) return;
  try {
    const verify = await library.provider.request({
      method: "personal_ecRecover",
      params: [signedMessage, signature]
    });
    setVerified(verify === account.toLowerCase());
  } catch (error) {
    setError(error);
  }
};

const refreshState = () => {
    
  setAccount();
  setChainId();
  setNetwork("");
  setMessage("");
  setSignature("");
  setVerified(undefined);
 
};

const disconnect = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });
  await web3Modal.clearCachedProvider();
  refreshState();
};

useEffect(() => {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });
  if (web3Modal.cachedProvider) {
    connectWallet();
   
  }
}, []);

useEffect(() => {
    
  if (provider?.on) {
    const handleAccountsChanged = (accounts) => {
      console.log("accountsChanged", accounts);
      if (accounts) setAccount(accounts[0]);
    };

    const handleChainChanged = (_hexChainId) => {
      setChainId(_hexChainId);
    };

    const handleDisconnect = () => {
      console.log("disconnect", error);
      disconnect();
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
    provider.on("disconnect", handleDisconnect);

    return () => {
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
        provider.removeListener("disconnect", handleDisconnect);
      }
    };
  }
}, [provider]);

useEffect(() => {
  if (window.ethereum){
    setProvider(new ethers.providers.Web3Provider(window.ethereum))
  } else {
    setProvider(providerOptions.walletconnect)
  }
}, []);

const isRevealedCollection = () => {
  if(revealed == 'No: By Default') {

    setRevealed('Yes, I want the reveal function.');
    setIsRevealed(true);

  } else {

    setRevealed('No: By Default');
    setIsRevealed(false);
    
  }
}

  return (
   <><Container py={20}>
   <Text fontSize='3xl' ><b>Create Your NFT Collection</b></Text>
   <Text mb={5}>
          Fast and Easy with full access to your smart contract using our integrated
          admin dashboard!
        </Text>
           <Text><b>Collection Name</b></Text>
           <Input placeholder='My NFTs' mt='10px' />

           <br />
           <Text mt='30px'><b>Collection Symbol</b></Text>
           <Input placeholder='$MNFT' mt='10px'/>

            <br />
           <Text mt='30px'><b>Total Supply</b></Text>
           <Input placeholder='1000' mt='10px' />

           <br />
           <Text mt='30px'><b>Max Amount Per Wallet</b></Text>
           <Input placeholder='3' mt='10px' />

           <br />
           <Text mt='30px'><b>Mint Price [MATIC]</b></Text>
           <Input placeholder='100' mt='10px' />

            <br />
           <Text mt='30px'><b>Base URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' />

           <br />
           <Text mt={5} mb={2}>Enable Reveal Function? [{revealed}]</Text>
           <Switch size='lg' onChange={isRevealedCollection}/>


           {revealed === 'Yes, I want the reveal function.' ? (<>
            <Text mt='30px'><b>Not Revealed URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' />
           </>): null}
              
           <br />
           {account  ? (<><Button
              variant={'solid'}
              mt='5'
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Create Collection</b>
            </Button></>):
           (<><Button
           onClick={connectWallet}
              variant={'solid'}
              mt='5'
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Connect Your Wallet</b>
            </Button></>)
            }
            </Container>
   </>
  )
}

export default CreateNft