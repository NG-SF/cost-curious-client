import React from 'react';
import {shallow} from 'enzyme';
import {updateTransaction} from '../../actions/items';
import {EditItem} from './EditItem';

describe('EditItem />', () => {
  it('Renders without crashing', () => {
      shallow(<EditItem parentItem={[]} />);
    });

  it('should dispatch updateTransaction action', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<EditItem parentItem={[]} updateTransaction={dispatch} />);
    const updates = {
        amount: 300,
        createdAt: 1522795973131,
        place: 'Red rose'
      };
    const dataId = '1233333333';
    const itemId = '4h4h4h4h4';
    dispatch.mockClear();
    const instance = wrapper.instance();
    wrapper.setProps({ 
      match: {params: {
        dataId: '1233333333',
        itemId: '4h4h4h4h4'
        }},
      history: {push: ()=> {}}
     });
    instance.onSubmit(updates);
    expect(dispatch).toHaveBeenCalledWith(dataId, itemId, updates);
  });
});