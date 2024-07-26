import {
  sepolia,
  bscTestnet,
  polygonAmoy,
  arbitrumSepolia,
  avalancheFuji,
  optimismSepolia,
  baseSepolia,
  fantomTestnet,
  celoAlfajores,
  mantleSepoliaTestnet,
  rolluxTestnet,
  lineaSepolia,
  blastSepolia,
  gnosisChiado,
  opBNBTestnet,
  telosTestnet,
  scrollSepolia,
} from "wagmi/chains";
import { Address, type Chain as Definition } from "viem";

const seiEvmAtlantic: Definition = {
  id: 1328,
  name: "Sei Atlantic",
  nativeCurrency: {
    decimals: 18,
    name: "SEI",
    symbol: "SEI",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-testnet.sei-apis.com"],
    },
  },
};

const merlinTestnet: Definition = {
  id: 686868,
  name: "Merlin Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.merlinchain.io"],
    },
  },
};

const oasisEmeraldTestnet: Definition = {
  id: 42261,
  name: "Oasis Emerald Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ROSE",
    symbol: "ROSE",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.emerald.oasis.dev"],
    },
  },
};

export const chains: Chain[] = [
  {
    chainSelector: 1001,
    name: "Ethereum Sepolia",
    img: 1027,
    definition: sepolia,
    pingPongContract: "0x87fDA158123c1556b1b168256A31B90F136ccF5B",
  },
  {
    chainSelector: 1002,
    name: "BNB Smart Chain Testnet",
    img: 1839,
    definition: bscTestnet,
    pingPongContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  },
  {
    chainSelector: 1003,
    name: "Polygon Amoy",
    img: 3890,
    definition: polygonAmoy,
    pingPongContract: "0xbC2ca9a5364DBd68d2c8Fb091E662Da952697B50",
  },
  {
    chainSelector: 1004,
    name: "Arbitrum Sepolia",
    img: 11841,
    definition: arbitrumSepolia,
    pingPongContract: "0x6E197F8d7913bC4B4ae46275C8285D7c38D1E070",
  },
  {
    chainSelector: 1005,
    name: "Avalanche Fuji",
    img: 5805,
    definition: avalancheFuji,
    pingPongContract: "0x5C5386A7D14d9D6c24913386db74c20e36Bc436c",
  },
  {
    chainSelector: 1006,
    name: "Optimism Sepolia",
    img: 11840,
    definition: optimismSepolia,
    pingPongContract: "0xbC2ca9a5364DBd68d2c8Fb091E662Da952697B50",
  },
  {
    chainSelector: 1007,
    name: "Base Sepolia",
    img: 9195,
    definition: baseSepolia,
    pingPongContract: "0x045258c0Ecb1DEAeC2EA717fF0cC0dd23cF3AfC5",
  },
  {
    chainSelector: 1008,
    name: "Fantom Testnet",
    img: 3513,
    definition: fantomTestnet,
    pingPongContract: "0xc75E01e91ba540A22bb85bdB60e6a830F3560777",
  },
  {
    chainSelector: 1009,
    name: "Celo Alfajores",
    img: 5567,
    definition: celoAlfajores,
    pingPongContract: "0xf9F20965531619BdD1A6e4703001b7DF8A2CD6ba",
  },
  {
    chainSelector: 1010,
    name: "Telos Testnet",
    img: 4660,
    definition: telosTestnet,
    pingPongContract: "0xA4ca53dFbB2D796170baf544FE1a5E9C91a25613",
  },
  {
    chainSelector: 1012,
    name: "Rollux Tanenbaum",
    img: 541,
    definition: rolluxTestnet,
    pingPongContract: "0xEA0BD89E6eE73596e24b4C66118bd41FACA90434",
  },
  {
    chainSelector: 1014,
    name: "Linea Sepolia",
    img: 27657,
    definition: lineaSepolia,
    pingPongContract: "0xE516c01e1BfA301eaD927c7f4a4E9190c1065b51",
  },
  {
    chainSelector: 1015,
    name: "Oasis Emerald Testnet",
    img: 7653,
    definition: oasisEmeraldTestnet,
    pingPongContract: "0xE41675435Ad0a8cce27725F236A75EA8BfbBB226",
  },
  {
    chainSelector: 1016,
    name: "Merlin Testnet",
    img: 30712,
    definition: merlinTestnet,
    pingPongContract: "0xE41675435Ad0a8cce27725F236A75EA8BfbBB226",
  },
  {
    chainSelector: 1017,
    name: "Sei EVM Atlantic",
    img: 23149,
    definition: seiEvmAtlantic,
    pingPongContract: "0xE516c01e1BfA301eaD927c7f4a4E9190c1065b51",
  },
  {
    chainSelector: 1018,
    name: "Blast Sepolia",
    img: 28480,
    definition: blastSepolia,
    pingPongContract: "0xEA0BD89E6eE73596e24b4C66118bd41FACA90434",
  },
  {
    chainSelector: 1019,
    name: "Gnosis Chiado",
    img: 1659,
    definition: gnosisChiado,
    pingPongContract: "0x29FeBDd370c8bc815455d518AE38a79D1e200f52",
  },
  {
    chainSelector: 1020,
    name: "Scroll Sepolia",
    img: 26998,
    definition: scrollSepolia,
    pingPongContract: "0xE41675435Ad0a8cce27725F236A75EA8BfbBB226",
  },
  {
    chainSelector: 1021,
    name: "Mantle Sepolia",
    img: 27075,
    definition: mantleSepoliaTestnet,
    pingPongContract: "0xFCe87EADF6498139C980606663f775d7E44C135f",
  },
  {
    chainSelector: 1022,
    name: "opBNB Testnet",
    img: 1839,
    definition: opBNBTestnet,
    pingPongContract: "0x066dEcA8BB6d87bBe7f896f9490DefA4AA4DEcC1",
  },
];

export type Chain = {
  chainSelector: number;
  name: string;
  img: number;
  definition: Definition;
  pingPongContract: Address;
};

export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";