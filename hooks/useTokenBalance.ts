//import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useChain } from "@cosmos-kit/react";
import { useState, useEffect } from "react";
import { Cw20QueryClient } from "../codegen/Cw20.client"; 
import {chainName} from "../config/defaults";


export function useTokenBalance(contractAddress: string){
    
    //offline signer
    const { getCosmWasmClient, address } = useChain(chainName);
    
    const[ cw20Client, setCw20Client ] = useState<Cw20QueryClient | null>(null);
    const [balance, setbalance ] = useState<string | null>(null);

    //cw20Client
    useEffect(() => {
        getCosmWasmClient().then((cosmWasmClient) => {
            if (!cosmWasmClient){
                console.error("No CosmWasmClient");
                return;
            }
            const newClient = new Cw20QueryClient(cosmWasmClient, contractAddress);
            setCw20Client(newClient);
        });
    }, [contractAddress, address, getCosmWasmClient]);

    // Query and return token balance

    useEffect(() => {
        if(cw20Client && address){
            cw20Client.balance({ address }).then((res) => setbalance(res.balance));
        }
    });

    return balance ?? undefined;
   
}