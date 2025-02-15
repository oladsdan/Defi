import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'


import App from './frontend/App'
import { queryClient, wagmiAdapter, } from './frontend/components/Wallet'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </WagmiProvider>

  </StrictMode>,
)
