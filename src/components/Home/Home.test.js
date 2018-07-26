import React from 'react';
import {shallow} from 'enzyme';
import {Home} from './Home';

describe('<Home />', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });


  it('should reveal demo account when "check out demo" btn clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Home  login={dispatch}/>);

    wrapper.setState({ 
      selected: false });

    wrapper.find('.demo').simulate('click');
    expect(wrapper.state('selected')).toEqual(true);
  });
});