import React from 'react';
import {shallow} from 'enzyme';
import {AddItem} from './AddItem';
import {setTransaction} from '../../actions/items';

describe('<AddItem />', () => {
  it('Renders without crashing', () => {
      shallow(<AddItem />);
    });

  it('should render AddItem correctly', () => {
  const wrapper = shallow(<AddItem />);
  expect(wrapper.find('h1')).toHaveLength(1);
  expect(wrapper.find('h1').text()).toBe('Add new transaction');
});

  xit('should dispatch SetTransaction action', () => {
    const dispatch = jest.fn();
    const transaction = {
        amount: 200,
        createdAt: 1522795973131,
        place: 'Red rose'
      };
    let dataId = '1233333333';
    const wrapper = shallow(<AddItem transactions={[]} dispatch={dispatch} />);
        // Ignore any previous calls to dispatch
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.onSubmit(transaction);
    expect(dispatch).toHaveBeenCalledWith(setTransaction(dataId, transaction));
  });

});