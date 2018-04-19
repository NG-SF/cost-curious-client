import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {Dashboard} from './Dashboard';
import {setItemData, updateItemData, 
        removeItemData} from '../../actions/items';

describe('<Dashboard />', () => {
  it('Renders without crashing', () => {
    const dispatch = jest.fn();
      shallow(<Dashboard items={[]} fetchData={dispatch} />);
    });

  it('should dispatch setItemData action', () => {
    const dispatch = jest.fn();
    const fetchData = jest.fn();
    const wrapper = mount(<Dashboard items={[]} setItemData={dispatch} userId='489' fetchData={fetchData} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const instance = wrapper.instance();
    const name = 'Coffee';
    const userId = '489';
    wrapper.find('.add-category-input').instance().value = name;
    wrapper.find('.test-AddCategory').simulate('submit', {'e.preventDefault()': () => {}});

    expect(dispatch).toHaveBeenCalledWith(userId, name);
  });

  it('should dispatch updateItemData action', () => {
    const dispatch = jest.fn();
    const fetchData = jest.fn();
    const wrapper = mount(<Dashboard items={[]} updateItemData={dispatch} userId='489' fetchData={fetchData} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const instance = wrapper.instance();
    const name = 'Lyft';
    const userId = '489';
    const itemId = 'itemId111';

    wrapper.setState({ 
      itemId: 'itemId111',
      selected: true });
    wrapper.find('.edit-category-input').instance().value = name;
    wrapper.find('.test-EditCategory').simulate('submit', {'e.preventDefault()': () => {}});

    expect(dispatch).toHaveBeenCalledWith(userId, itemId, name);
  });

  it('should dispatch removeItemData action', () => {
    const dispatch = jest.fn();
    const fetchData = jest.fn();
    const data = [{
      '_id': '44444',
      description: 'Coffee',
      userId: 'yyyyy',
      history: [{
        '_id': '333',
        amount: 444,
        createdAt: 141414141414,
        place: 'door'
      }]
    }];
    const wrapper = shallow(<Dashboard items={data} removeItemData={dispatch} userId='yyyyy' fetchData={fetchData} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const userId = 'yyyyy';
    const itemId = '44444';

    wrapper.find('.test-remove-btn').simulate('click');

    expect(dispatch).toHaveBeenCalledWith(userId, itemId);
  });

  it('should close and hide EditBox when cancel btn clicked', () => {
    const dispatch = jest.fn();
    const fetchData = jest.fn();
    const wrapper = mount(<Dashboard items={[]} fetchData={fetchData} />);
    // Ignore any previous calls to dispatch
    dispatch.mockClear();

    wrapper.setState({ 
      itemId: 'itemId111',
      selected: true });

    wrapper.find('.test-cancel').simulate('click');

    expect(wrapper.state('itemId')).toEqual('');
    expect(wrapper.state('selected')).toEqual(false);
  });

});