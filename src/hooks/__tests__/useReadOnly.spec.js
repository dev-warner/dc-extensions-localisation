import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useReadOnly } from '../useReadOnly';
import { ExtensionProvider } from '../../components/ExtensionProvider';

test('should update the value when onChange is called', () => {
    let toCall;

    const onReadOnlyChange = jest.fn().mockImplementation(fn => {
      toCall = fn;
    });

    const wrapper = ({ children }) => (
        <ExtensionProvider
            value={{
                form: {
                    onReadOnlyChange,
                    readOnly: false
                }
            }}
        >
            {children}
        </ExtensionProvider>
    );

    const { result } = renderHook(() => useReadOnly(), { wrapper });

    expect(result.current.readOnly).toBe(false);
    act(() => {
      toCall(true);
    })
    expect(result.current.readOnly).toBe(true);
});
