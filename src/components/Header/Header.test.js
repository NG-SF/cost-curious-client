import React from 'react';
import {shallow, mount} from 'enzyme';
import {Header} from './Header';
import {clearAuth} from '../../actions/auth';

describe('<Header />', () => {
  it('Renders without crashing', () => {
      shallow(<Header />);
    });

  xit('should dispatch clearAuth action', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Header dispatch={dispatch} />);

    expect(wrapper.find('.btn-logout').length).toEqual(0);
    wrapper.find('.test-logout').simulate('click');
    expect(dispatch).toHaveBeenCalledWith(clearAuth());

  });

});