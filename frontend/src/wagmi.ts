import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

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
    coinbaseWallet(),
  ];

  // Only add WalletConnect on client side
  if (typeof window !== 'undefined') {
    const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "";
    connectors.push(
      walletConnect({
        projectId,
      })
    );
  }

  return createConfig({
    chains: [mainnet, sepolia],
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http("https://rpc.sepolia-api.lisk.com"),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
