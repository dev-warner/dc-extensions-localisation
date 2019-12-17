import { renderHook, act } from '@testing-library/react-hooks';
import { useLocked } from '../useLocked';

test('should create hashmap of locales with locked boolean', () => {
    const initalValue = [{ locale: 'en' }, { locale: 'de' }, { locale: 'fr' }];

    const { result } = renderHook(() => useLocked(initalValue));

    expect(result.current.locked).toEqual({
        en: false,
        fr: false,
        de: false
    });
});

it('should be able to lock all', () => {
    const initalValue = [{ locale: 'en' }, { locale: 'de' }, { locale: 'fr' }];

    const { result } = renderHook(() => useLocked(initalValue));

    act(() => {
        result.current.lockAll();
    });

    expect(result.current.locked).toEqual({
        en: true,
        fr: true,
        de: true
    });
});

test('should beable to get a locked state by locale', () => {
    const initalValue = [{ locale: 'en' }, { locale: 'de' }, { locale: 'fr' }];

    const { result } = renderHook(() => useLocked(initalValue));

    expect(result.current.isLocked('en')).toEqual(false);
});

test('should beable to set the state by locale', () => {
    const initalValue = [{ locale: 'en' }, { locale: 'de' }, { locale: 'fr' }];

    const { result } = renderHook(() => useLocked(initalValue));

    act(() => {
        result.current.setLockedLocale('fr')();
    });

    expect(result.current.locked).toEqual({
        en: false,
        fr: true,
        de: false
    });
});
