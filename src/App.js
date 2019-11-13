import React from 'react';
import { useExtension } from './hooks/initialize';
import { Localise } from './components/Localise';

function App() {
  const [sdk] = useExtension();

  if (!sdk) {
    return <p>loading...</p>;
  }

  sdk.frame.startAutoResizer();

  return (
    <div className="App">
      <Localise sdk={sdk}/>
    </div>
  );
}

export default App;
