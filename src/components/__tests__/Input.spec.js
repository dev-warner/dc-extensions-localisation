import React from 'react';
import { mount } from '../../utils/enzyme';
import { Input } from '../Input';
import { WithTheme } from '../../utils/withTheme';

const MockInput = ({ ...props }) => (
  <WithTheme>
    <Input {...props}/>
  </WithTheme>
)

describe('Input', () => {
  it('renders', () => {
    const wrapper = mount(<MockInput label={'Hello'} value={'value'}/>);

    expect(wrapper.find('input').prop('value')).toBe('value');
  });

  it('multiline', () => {
    const wrapper = mount(<MockInput label={'Hello'} value={'value'} multiline={true}/>);

    expect(wrapper.find('textarea').first().text()).toBe('value');
  });
});
