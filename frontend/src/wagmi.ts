import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

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
    chains: [mainnet, sepolia],
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
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
