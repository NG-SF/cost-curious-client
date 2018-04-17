import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {Dashboard} from './Dashboard';
import {fetchData, setItemData, updateItemData, 
        removeItemData} from '../../actions/items';

describe('<Dashboard />', () => {
  xit('Renders without crashing', () => {
    const dispatch = jest.fn();
      mount(<Dashboard items={[]} fetchData={dispatch} />);
    });

  xit('should dispatch fetchData action', () => {
    const dispatch = jest.fn();
    const didMount = sinon.spy();
    let dataId = '1233333333';
    const wrapper = mount(<Dashboard items={[]} fetchData={dispatch} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const instance = wrapper.instance();
    wrapper.setProps({ 
      match: {params: {dataId: '1233333333'}}
     });
    // instance.onSubmit(transaction);
    expect(didMount.callCount).toEqual(1);
    // expect(dispatch).toHaveBeenCalledWith(dataId);
  });

});