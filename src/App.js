import React from 'react';

import { Localise } from './components/Localise';
import { useExtension } from './hooks/initialize';

function App() {
  const [sdk, initalData, fetched] = useExtension();

  if (!sdk || !fetched) {
    return <p>loading...</p>;
  }

  sdk.frame.startAutoResizer();

  return (
    <div className="App">
      <Localise
        sdk={sdk}
        initalData={initalData}/>
    </div>
  );
}

export default App;