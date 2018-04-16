import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

});