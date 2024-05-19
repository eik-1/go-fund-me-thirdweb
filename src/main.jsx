import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import App from "./App";
import "./index.css";
import { StateProvider } from "./context";

// const rpcUrl = import.meta.env.VITE_ARB_RPC_URL;

// const chains = {
//   arbitrumSepolia: {
//     chainId: 421614,
//     rpc: [rpcUrl],
//   },
// };

const clientId = import.meta.env.VITE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider activeChain={Sepolia} clientId={clientId}>
    <Router>
      <StateProvider>
        <App />
      </StateProvider>
    </Router>
  </ThirdwebProvider>
);
