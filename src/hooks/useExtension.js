import { init } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';

export function useExtension() {
    const [sdk, setSDK] = useState();
    const [ready, setFetched] = useState(false);
    const [initalData, setData] = useState(false);

    async function initialize() {
        try {
            const sdk = await init();

            setSDK(sdk);
        }
        catch (e) {
            console.log('Not connected to DC');
        }
    }

    useEffect(() => {
        if (!sdk) return;

        async function fetchInitalData() {
            try {
                const data = await sdk.field.getValue();

                setData(data);
            }
            catch (e) {}
            finally {
                setFetched(true);
            }
        }

        fetchInitalData();
    }, [sdk]);

    useEffect(() => {
        initialize();
    }, []);

    return {
        sdk,
        ready,
        initalData
    };
}
