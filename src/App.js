import React, { useState, useEffect } from 'react';
import { useExtension } from './hooks/initialize';
import { Localise } from './components/Localise';

function App() {
  const [sdk] = useExtension();
  const [fetched, setFetched] = useState(false);
  const [initalData, setData] = useState(false);

  useEffect(() => {
    if (!sdk) return;

    async function fetchInitalData() {
      try {
        const data = await sdk.field.getValue();
  
        setData(data);
      }
      catch(e) {}
      finally {
        setFetched(true)
      }
    }

    fetchInitalData()
  }, [sdk]);

  if (!sdk || !fetched) {
    return <p>loading...</p>;
  }




  sdk.frame.startAutoResizer();

  return (
    <div className="App">
      <Localise sdk={sdk} value={initalData}/>
    </div>
  );
}

export default App;
