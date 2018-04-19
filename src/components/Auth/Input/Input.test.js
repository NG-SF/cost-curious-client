import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input';

describe('<Input />', () => {
  it('Renders without crashing', () => {
      shallow(<Input meta={{}} input={{}} />);
    });
});