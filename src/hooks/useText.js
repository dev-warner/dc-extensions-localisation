import { useState } from 'react';

export function useText() {
    const [text, setText] = useState([]);

    return {
        text,
        setText
    }
}