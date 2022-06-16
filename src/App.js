import Arweave from 'arweave'
import Arfund, { createPool } from "arfunds";
import * as fs from 'fs'

function App() {
  const poolObject = {}
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    poolObject[e.target.name] = e.target.value
    console.log(poolObject)
  }

  const handlePoolCreate = async (e) => {
    e.preventDefault()

    const {
      title,
      description,
      website,
      wallet,
      operatorInfo,
      rewards
    } = poolObject;

    try {
      await createPool(arweave, title, description, wallet, website, operatorInfo, rewards);
    } catch (error) {
      console.log(error)
    }

    debugger

  }

  return (
    <div style={{ padding: '1rem' }}>
      <div>
        <h3>Create Pool</h3>
        <form onSubmit={(e) => handlePoolCreate(e)}>
          <label>Title</label>
          <div>
            <input type='text' name='title' onChange={(e) => handleChange(e)} />
          </div>
          <label>Description</label>
          <div>
            <textarea name='description' onChange={(e) => handleChange(e)} style={{ width: '15rem', height: '15rem' }} />
          </div>
          <label>Website</label>
          <div>
            <input type='text' name='website' onChange={(e) => handleChange(e)} />
          </div>
          <label>Wallet</label>
          <div>
            <input type='text' name='wallet' onChange={(e) => handleChange(e)} />
          </div>
          <label>Operator Info</label>
          <div>
            <input type='text' name='OperatorInfo' onChange={(e) => handleChange(e)} />
          </div>
          <label>Rewards</label>
          <div>
            <input type='text' name='rewards' onChange={(e) => handleChange(e)} />
          </div>
          <button type='submit'>Create Pool</button>
        </form>
      </div>
    </div>
  )
}
export default App;
