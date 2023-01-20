import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';
import { GasPrice } from '@cosmjs/stargate';

export const chainName = 'cosmwasmtestnet';
export const stakingDenom = 'umlg';
export const feeDenom = 'uand';
export const gasPrice = '0.0025umlg'

export const cw20ContractAddress = 'wasm1nvs6n8v0p27fwtww55ky9wlqfytshvmzfsh0r2wxszdqy6lv2eesg3hecu'

export const chainassets: AssetList = assets.find(
    (chain) => chain.chain_name === chainName
) as AssetList;

export const coin: Asset = chainassets.assets.find(
    (asset) => asset.base === stakingDenom
) as Asset;

