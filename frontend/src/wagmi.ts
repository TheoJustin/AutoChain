import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Ganache local network
const ganache = {
  id: 1337,
  name: 'Ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
} as const;

export function getConfig() {
  const connectors = [
    injected(),
    coinbaseWallet(),
  ];

  // Only add WalletConnect on client side
  if (typeof window !== 'undefined') {
    connectors.push(
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "" })
    );
  }

  return createConfig({
    chains: [ganache, mainnet, sepolia],
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [ganache.id]: http('http://127.0.0.1:8545'),
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
