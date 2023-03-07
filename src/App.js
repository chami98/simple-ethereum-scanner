import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [ethAddress, setEthAddress] = useState('');
  const [responseData, setResponseData] = useState([]);

  // let ethAddress =  0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3

  const submitHandler = async () => {
    // const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${ethAddress}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=77YYM4VXFPMMKIAMMWZWCPC9EXHAVRNA6X`);
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=77YYM4VXFPMMKIAMMWZWCPC9EXHAVRNA6X`);
    const data = await response.json();
    setResponseData(data);
    await console.log(responseData);
  };


  const handleInput = async (e) => {
    setEthAddress(e.target.value);
  }



  return (
    <div className="App">
      <h1 style={{ marginTop: '20px', fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>Ethereum Scanner</h1>
      <input placeholder='Etherum' onChange={(e) => handleInput(e)} style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        marginRight: '10px'
      }} />
      <button onClick={submitHandler} style={{
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>Submit</button>

      {
        responseData.status == 1 ? (<div className='table-responsive'><table className="table table-striped" style={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
          <thead>
            <tr>
              <th scope="col">BlockNumber</th>
              <th scope="col">From</th>
              <th scope="col">Gas</th>
              <th scope="col">Hash</th>
              <th scope="col">Time Stamp</th>

            </tr>
          </thead>
          <tbody>
            {responseData.result.map((tx, index) => (
              <tr key={index}>
                <td>{tx.blockNumber}</td>
                <td>{tx.from}</td>
                <td>{tx.gas}</td>
                <td>{tx.hash}</td>
                <td>{tx.timeStamp}</td>
              </tr>
            ))}

          </tbody>
        </table></div>) : <>
          <h2 style={{ marginTop: '30vh', color: 'tomoto' }}>Transaction not found!</h2>
        </>
      }
    </div >
  );
}

export default App;
