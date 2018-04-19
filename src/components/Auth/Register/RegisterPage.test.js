import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationPage} from './RegisterPage';


describe('<RegistrationPage />', () => {
  it('Renders without crashing', () => {
      shallow(<RegistrationPage loggedIn={{username: 'demo'}} loading={false} />);
    });
});