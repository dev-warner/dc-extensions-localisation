import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ExtensionProvider } from '../../components/ExtensionProvider';

describe('useTranslate', () => {
    let useTranslation;

    beforeEach(() => {
        useTranslation = require('../useTranslate').useTranslation;
    });

    it('should create a hash of locale and empty values', () => {
        const wrapper = ({ children }) => (
            <ExtensionProvider
                value={{
                    locales: {
                        available: [{ locale: 'en' }, { locale: 'de' }]
                    },
                    params: {
                        installation: {
                            TRANSLATION_API_KEY: 'key'
                        }
                    }
                }}
            >
                {children}
            </ExtensionProvider>
        );
        let text = '';
        const locked = { en: false };
        const lockAll = jest.fn();
        const { result } = renderHook(
            () => useTranslation(text, locked, lockAll, undefined),
            { wrapper }
        );

        expect(result.current.translated).toEqual({
            en: '',
            de: ''
        });
    });

    it('should create a hash of locale and values', () => {
        const wrapper = ({ children }) => (
            <ExtensionProvider
                value={{
                    locales: {
                        available: [{ locale: 'en' }, { locale: 'de' }]
                    },
                    params: {
                        installation: {
                            TRANSLATION_API_KEY: 'key'
                        }
                    }
                }}
            >
                {children}
            </ExtensionProvider>
        );
        let text = '';
        const locked = { en: false };
        const lockAll = jest.fn();
        const initalValue = {
            values: [
                { locale: 'en', value: 'hello' },
                { locale: 'de', value: 'hallo' }
            ]
        };

        const { result } = renderHook(
            () => useTranslation(text, locked, lockAll, initalValue),
            { wrapper }
        );

        expect(result.current.translated).toEqual({
            en: 'hello',
            de: 'hallo'
        });
    });

    it('should beable to update by locale', () => {
        const wrapper = ({ children }) => (
            <ExtensionProvider
                value={{
                    locales: {
                        available: [{ locale: 'en' }, { locale: 'de' }]
                    },
                    params: {
                        installation: {
                            TRANSLATION_API_KEY: 'key'
                        }
                    }
                }}
            >
                {children}
            </ExtensionProvider>
        );
        let text = '';
        const locked = { en: false };
        const lockAll = jest.fn();
        const initalValue = {
            values: [
                { locale: 'en', value: 'hello' },
                { locale: 'de', value: 'hallo' }
            ]
        };

        const { result } = renderHook(
            () => useTranslation(text, locked, lockAll, initalValue),
            { wrapper }
        );

        act(() => {
            result.current.actions.updateTranslated('en', 'test');
        });

        expect(result.current.translated).toEqual({
            en: 'test',
            de: 'hallo'
        });
    });

    it('should beable to get by locale', () => {
        const wrapper = ({ children }) => (
            <ExtensionProvider
                value={{
                    locales: {
                        available: [{ locale: 'en' }, { locale: 'de' }]
                    },
                    params: {
                        installation: {
                            TRANSLATION_API_KEY: 'key'
                        }
                    }
                }}
            >
                {children}
            </ExtensionProvider>
        );
        let text = '';
        const locked = { en: false };
        const lockAll = jest.fn();
        const initalValue = {
            values: [
                { locale: 'en', value: 'hello' },
                { locale: 'de', value: 'hallo' }
            ]
        };

        const { result } = renderHook(
            () => useTranslation(text, locked, lockAll, initalValue),
            { wrapper }
        );

        expect(result.current.actions.getTranslated('en')).toEqual('hello');
    });
});
