import React from 'react';
import {shallow} from 'enzyme';
import About from './About';

describe('<About />', () => {
  it('Renders without crashing', () => {
      shallow(<About />);
    });

  it('should render About correctly', () => {
  const wrapper = shallow(<About />);
  expect(wrapper.find('h1')).toHaveLength(1);
  expect(wrapper.find('h1').text()).toBe('About');
});

});