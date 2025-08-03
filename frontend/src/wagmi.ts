import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { liskSepolia, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, metaMask, walletConnect } from "wagmi/connectors";

// Ganache local network
// const ganache = {
//   id: 1337,
//   name: 'Ganache',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:8545'],
//     },
//   },
// } as const;

export function getConfig() {
  const connectors = [
    injected(),
    metaMask(),
  ];

  return createConfig({
    chains: [liskSepolia],
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [liskSepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
