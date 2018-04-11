import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Home from './Home';

describe('<Home />', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });

});