import { useState, useContext } from 'react';
import { ExtensionContext } from '../components/ExtensionProvider';

export function useReadOnly() {
    const { form } = useContext(ExtensionContext);
    const [readOnly, setReadOnly] = useState(form.readOnly);

    form.onReadOnlyChange(read => setReadOnly(read));

    return {
        readOnly
    };
}
