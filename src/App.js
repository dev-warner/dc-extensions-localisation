import React from 'react';

import { useExtension } from './hooks/useExtension';

import { Loading } from './components/Loading';
import { Localise } from './components/Localise';
import { ExtensionProvider } from './components/ExtensionProvider';

function App() {
    const { sdk, initalData, ready } = useExtension();

    if (!sdk || !ready) {
        return <Loading />;
    }

    sdk.frame.startAutoResizer();

    return (
        <ExtensionProvider value={sdk}>
            <Localise
              initalData={initalData}
              locales={sdk.locales.available} />
        </ExtensionProvider>
    );
}

export default App;
