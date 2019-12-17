import React from 'react';
import { mount } from '../../utils/enzyme';
import { WithTheme } from '../../utils/withTheme';
import { LocaleList } from '../LocaleList';
import { Input } from '../Input';
import { Lock } from '../Lock';

const MockLocaleList = ({ ...props }) => (
  <WithTheme>
    <LocaleList {...props}/>
  </WithTheme>
)

describe('LocaleList', () => {
  it('renders', () => {
    const locales = [{locale: 'en'}, { locale: 'fr'}];
    const wrapper = mount((
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={() => {}}
        getTranslated={() => {}}
        setLockedLocale={() => {}}
        updateTranslated={() => {}}/>
    ));

    expect(wrapper.find('.MuiFormControl-root').length).toBe(2);
  });

  it('when type update call update', () => {
    const locales = [{locale: 'en'}, { locale: 'fr'}];
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn();
    const setLockedLocale = jest.fn();
    const updateTranslated = jest.fn();

    const wrapper = mount((
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocale}
        updateTranslated={updateTranslated}/>
    ));

    wrapper.find(Input).first().props().onChange({ target: { value: 'hello' }});

    expect(wrapper.find('.MuiFormControl-root').length).toBe(2);
    expect(updateTranslated).toHaveBeenCalledWith('en', 'hello', false)
  });

  it('should call lock when clicking ', () => {
    const locales = [{locale: 'en'}, { locale: 'fr'}];
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn();
    const setLockedLocale = jest.fn();
    const setLockedLocaleFactory = jest.fn().mockImplementation(locale => {
      return setLockedLocale
    });
    const updateTranslated = jest.fn();

    const wrapper = mount((
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocaleFactory}
        updateTranslated={updateTranslated}/>
    ));

    expect(setLockedLocaleFactory).toHaveBeenCalledWith('en');
    expect(setLockedLocaleFactory).toHaveBeenCalledWith('fr');

    wrapper.find(Lock).find('path').first().simulate('click');
    expect(wrapper.find('.MuiFormControl-root').length).toBe(2);
    expect(setLockedLocale).toHaveBeenCalled();
  });

  it('should add value and label', () => {
    const values = { en: 'value1', fr: 'value2'};
    const locales = [{locale: 'en'}, { locale: 'fr'}];
    const isLocked = jest.fn(() => false);
    const getTranslated = jest.fn((locale) => values[locale]);
    const setLockedLocale = jest.fn();
    const setLockedLocaleFactory = jest.fn().mockImplementation(locale => {
      return setLockedLocale
    });
    const updateTranslated = jest.fn();

    const wrapper = mount((
      <MockLocaleList
        locales={locales}
        readOnly={false}
        isLocked={isLocked}
        getTranslated={getTranslated}
        setLockedLocale={setLockedLocaleFactory}
        updateTranslated={updateTranslated}/>
    ));

    const inputContainer = wrapper.find('.MuiFormControl-root');

    expect(inputContainer.length).toBe(2);

    expect(inputContainer.find('textarea').first().text()).toEqual('value1');
    expect(inputContainer.last().find('textarea').first().text()).toEqual('value2');
  });
});
