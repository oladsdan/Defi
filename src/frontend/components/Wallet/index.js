//we import the web3Provider

import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

// import { walletConnectConnector} from "wagmi/connectors/walletConnect"
import { Buffer } from 'buffer/index.js';

//using the new walletconnect connector
import { createAppKit } from '@reown/appkit/react'

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


import { arbitrum, mainnet } from '@reown/appkit/networks'
// import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient} from '@tanstack/react-query'



const apiUrl = import.meta.env.VITE_API_URL;

const localRpcUrl = import.meta.env.VITE_LOCAL_RPC_URL;
// console.log(apiUrl);


// 0. Setup queryClient
export const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '629639f0fe7b2c5d076fd5f3cd773336'


const networks = [mainnet, arbitrum]
// export const wagmiConfig = defaultWagmiConfig({
//   networks,
//   projectId,
//   ...wagmiOptions // Optional - Override createConfig parameters
// })

// // 3. Create modal
// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
//   enableOnramp: true // Optional - false as default
// })

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})




// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})
export const getLibrary = provider =>{
    return  new Web3Provider(provider);
}

//then we define the list of chainIds

export const ETHEREUM_NETWORK_ID = 1;
export const SEPOLIA_NETWORK_ID = 11155111;
export const LOCAL_NETWORK_ID = 31337;

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [ETHEREUM_NETWORK_ID, SEPOLIA_NETWORK_ID, LOCAL_NETWORK_ID],
});

if (!window.Buffer) {
    window.Buffer = Buffer;
}

export const walletConnectConnector = new WalletConnectConnector({
    rpc: { [SEPOLIA_NETWORK_ID]:
        // eslint-disable-next-line
        apiUrl},
    qrcode: true,
});

export const localProvider = new ethers.providers.JsonRpcProvider(localRpcUrl);


