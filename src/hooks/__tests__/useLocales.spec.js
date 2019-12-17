import React from 'react';
import { useLocales } from '../useLocales';
import { renderHook } from '@testing-library/react-hooks';
import { ExtensionProvider } from '../../components/ExtensionProvider';

test('should use set value when translation changes', () => {
    const setValue = jest.fn();
    const wrapper = ({ children }) => (
        <ExtensionProvider
            value={{
                field: {
                    setValue
                }
            }}
        >
            {children}
        </ExtensionProvider>
    );
    const translated = { en: '' };

    const { rerender } = renderHook(() => useLocales(translated), { wrapper });

    expect(setValue).toHaveBeenCalledWith({
      _meta: {
        schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value'
      },
      values: [{locale: 'en', value: ''}]
    });

    translated['en'] = 'hello'
    rerender();

    expect(setValue).toHaveBeenCalledWith({
      _meta: {
        schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value'
      },
      values: [{locale: 'en', value: 'hello'}]
    });
});
