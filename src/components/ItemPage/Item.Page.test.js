import React from 'react';
import {shallow, mount} from 'enzyme';
import {ItemPage} from './ItemPage';

describe('<ItemPage />', () => {
  xit('Renders without crashing', () => {
    const dispatch = jest.fn();
    const featuresData = jest.fn();
      mount(<ItemPage items={[]} fetchData={dispatch} fetchFeaturesData={featuresData} />);
    });

});