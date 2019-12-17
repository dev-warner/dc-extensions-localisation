import React from 'react';
import { mount } from '../../utils/enzyme';
import { Button } from '../Button';

describe('Button', () => {
  it('renders', () => {
    const wrapper = mount(<Button label={'Hello'}/>)

    expect(wrapper.find('.MuiButton-label').text()).toBe('Hello');
    expect(wrapper.find('button').prop('disabled')).toEqual(false)
  });

  it('onClick calls onClick prop', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button label={'Hello'} onClick={onClick}/>)

    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled if readOnly', () => {
    const wrapper = mount(<Button label={'Hello'} readOnly={true} />)

    expect(wrapper.find('button').prop('disabled')).toEqual(true)
  });
})