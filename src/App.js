import { useEffect } from 'react'
import Arfund, { getAllContracts } from "arfunds";

function App() {
  const viewContracts = async () => {
    try {
      let contracts = await getAllContracts();
      console.log(contracts)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={viewContracts}>
        Get all contracts
      </button>
    </div>
  );
}

export default App;
