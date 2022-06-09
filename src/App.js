import { useState } from 'react'
import Arweave from 'arweave'
import Arfund, { getAllContracts, loadBalances } from "arfunds";

function App() {
  const [contracts, setContracts] = useState([])
  var arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });
  let fund;
  // var printState = async () => {
  //   var state = await fund.getState();
  //   console.log(state)
  // }
  // printState();
  console.log("awaiting arconnect");
  console.log(window);
  window.addEventListener("arweaveWalletLoaded", () => {
    /** Handle ArConnect load event **/
    console.log("READY");
    connectToArconnect();
  });
  console.log(window.arweaveWallet);
  const connectToArconnect = async () => {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION']);

    window.addEventListener('walletSwitch', async () => {
      await this.loadBalances();
    });
    await this.loadBalances();
  }
  var contribute = async (amount, contractId) => {
    fund = new Arfund(contractId, arweave, true);
    var interaction = await fund.contribute(amount);
    console.log(interaction);
  }
  var read = async (contractId) => {
    fund = new Arfund(contractId, arweave, true);
    var state = await fund.getState(state);
    document.getElementById("stateData").innerHTML = JSON.stringify(state, null, 2);
  }
  const getContracts = async () => {
    const incomingContracts = await getAllContracts(arweave);
    setContracts(incomingContracts)
    console.log('incoming: ', contracts)
    // document.getElementById("allContracts").innerHTML = JSON.stringify(contracts, null, 2);
  }
  // const viewContracts = async () => {
  //   try {
  //     let contracts = await getAllContracts();
  //     console.log(contracts)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div>
      <script src="https://unpkg.com/arfunds@latest/umd/arfunds_bundle.js"></script>
      <script src="https://unpkg.com/arweave/bundles/web.bundle.min.js"></script>
      <button onClick={getContracts}>
        Get all contracts
      </button>
    </div>
  );
}

export default App;
