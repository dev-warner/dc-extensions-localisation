import { useState } from 'react';

export function useInput(defaultValue) {
    const [value, setText] = useState(defaultValue);
    const onChange = e => setText(e.target.value);

    return [value, onChange];
}
