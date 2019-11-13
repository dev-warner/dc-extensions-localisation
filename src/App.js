import React from 'react';
import { useExtension } from './hooks/initialize';
import { Localise } from './components/Localise';

function App() {
  const [sdk, initalData, fetched] = useExtension();

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
