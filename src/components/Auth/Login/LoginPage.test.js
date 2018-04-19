import React from 'react';
import {shallow, mount} from 'enzyme';
import {LoginPage} from './LoginPage';


describe('<LoginPage />', () => {
  it('Renders without crashing', () => {
      shallow(<LoginPage loggedIn={{username: 'demo'}} loading={false} />);
    });
});