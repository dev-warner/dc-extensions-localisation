import { useState } from 'react';

export function useInput() {
    const [value, setText] = useState([]);
    const setInput = (e) => setText(e.target.value);
    return [
        value,
        setInput
    ]
}