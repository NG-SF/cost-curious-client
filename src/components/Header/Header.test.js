import React from 'react';
import {shallow, mount} from 'enzyme';
import {Header} from './Header';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';

describe('<Header />', () => {
  it('Renders without crashing', () => {
      shallow(<Header />);
    });

  it('should logout when bnt clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<Header loggedIn={true} dispatch={dispatch} />);

    expect(wrapper.find('.btn-logout').length).toEqual(1);
    wrapper.find('.btn-logout').simulate('click');
    wrapper.setProps({ 
      loggedIn: false
      });
    wrapper.update();
    expect(wrapper.find('.btn-logout').length).toEqual(0);

  });

});