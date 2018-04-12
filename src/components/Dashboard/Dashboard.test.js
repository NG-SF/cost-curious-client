import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {Dashboard} from './Dashboard';
import {fetchData, setItemData, updateItemData, 
        removeItemData} from '../../actions/items';

describe('<Dashboard />', () => {
  it('Renders without crashing', () => {
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

  xit('should dispatch setItemData action', () => {
    const dispatch = jest.fn();

    let dataId = '1233333333';
    let name = 'New category';
    const wrapper = shallow(<Dashboard setItemData={dispatch} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const instance = wrapper.instance();
    wrapper.setProps({ 
      match: {params: {dataId: '1233333333'}}
     });
    wrapper.find('.add-category-input').instance().value = name;
    instance.onSubmit(name);

    expect(dispatch).toHaveBeenCalledWith(name);
  });


});