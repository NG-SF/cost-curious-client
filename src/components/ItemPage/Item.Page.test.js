import React from 'react';
import {shallow, mount} from 'enzyme';
import {fetchData} from '../../actions/items';
import {fetchFeaturesData} from '../../actions/filters';
import {ItemPage} from './ItemPage';

describe('<ItemPage />', () => {
  it('Renders without crashing', () => {
    const data = [];
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: true,
    json() {return data;}}));
    
    const dispatch = jest.fn();
    const featuresData = jest.fn();

    const wrapper = shallow(<ItemPage items={[]} fetchData={dispatch} fetchFeaturesData={featuresData} match={{params: {dataId: '474747474'}}} />);
  });

  it('should change state amount when Add/Edit btn is clicked', () => {
    const dispatch = jest.fn();
    const featuresData = jest.fn();
    const wrapper = shallow(<ItemPage items={[]} fetchData={dispatch} fetchFeaturesData={featuresData} match={{params: {dataId: '474747474'}}} />);

    const value = '444';
    wrapper.setState({
      selected: true
    });
			wrapper.find('.add-limit-input').simulate('change', {
				target: { value }
			});
			expect(wrapper.state('amount')).toBe(value);
  });

  it('should reset state when remove limit btn is clicked', () => {
    const dispatch = jest.fn();
    const featuresData = jest.fn();
    const removeLimitAmount = jest.fn();
    const wrapper = shallow(<ItemPage items={[]} fetchData={dispatch} fetchFeaturesData={featuresData} match={{params: {dataId: '474747474'}}} removeLimitAmount={removeLimitAmount} />);

    wrapper.setState({
      selected: true,
      limitId: '3333'
    });
			wrapper.find('.btn-remove-limit').simulate('click');
			expect(wrapper.state('error')).toBe('');
      expect(wrapper.state('selected')).toBe(false);
      expect(wrapper.state('dataCategory')).toBe('');
      expect(wrapper.state('limit')).toBe('');
      expect(wrapper.state('limitId')).toBe('');
      expect(wrapper.state('amount')).toBe('');
  });  

});