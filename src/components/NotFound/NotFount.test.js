import React from 'react';
import {shallow} from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('Renders without crashing', () => {
      shallow(<NotFound />);
    });

  it('should render NotFound correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper.find('h3')).toHaveLength(1);
});
});