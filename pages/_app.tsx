import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultTheme, chainName } from "../config";
import { wallets } from "@cosmos-kit/keplr";

import { SignerOptions } from "@cosmos-kit/core";
import { chains, assets } from "chain-registry";
import { Chain } from "@chain-registry/types";
import { GasPrice } from "@cosmjs/stargate";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case "cosmwasmtestnet":
          return {
            gasPrice: GasPrice.fromString(".00025umlga"),
          };
      }
    },
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={wallets}
        signerOptions={signerOptions}
        endpointOptions={{
          cosmwasmtestnet: {
            rpc: ["https://rpc.malaga-420.cosmwasm.com/"],
            rest:["https://api.malaga-420.cosmwasm.com/"]
          },
        }}
      >
        <Component {...pageProps} />
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;