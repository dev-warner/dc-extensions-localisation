import React from 'react';
import { mount } from '../../utils/enzyme';
import { Lock } from '../Lock';

const locked = 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'
const unlocked = 'M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z'

describe('Lock', () => {
  it('locked', () => {
    const wrapper = mount(<Lock locked={true}/>);

    expect(wrapper.find('path').prop('d')).toBe(locked);
  });

  it('unlocked', () => {
    const wrapper = mount(<Lock locked={false}/>);

    expect(wrapper.find('path').prop('d')).toBe(unlocked);
  });

  it('click', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Lock locked={false} onClick={onClick}/>);

    wrapper.find('svg').simulate('click');

    expect(wrapper.find('path').prop('d')).toBe(unlocked);
    expect(onClick).toBeCalled();
  });
});
