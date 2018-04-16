import React from 'react';
import {shallow, mount} from 'enzyme';
import NewItemForm from './NewItemForm';
import moment from 'moment';

describe('<NewItemForm />', () => {
    it('Renders without crashing', () => {
        shallow(<NewItemForm />);
    });

    it('Should render an input area', () => {
        const wrapper = shallow(<NewItemForm /> );
        expect(wrapper.find('input').length).toEqual(2);
    });

    it('Should fire onSubmit callback when the form is submitted', () => {
        const dispatch = jest.fn();
        const wrapper = mount(<NewItemForm onSubmit={dispatch} />);
        dispatch.mockClear();
        const value = {
          amount: '33300',
          createdAt: moment(),
          place: 'Rose'
        };
        const output = {
            "amount": parseFloat(value.amount, 10) * 100, 
            "createdAt": value.createdAt.valueOf(), 
            "place": "Rose"}
      
        wrapper.setState({  amount: value.amount,
                            createdAt: value.createdAt,
                            place: value.place});
        wrapper.instance().onSubmit({preventDefault: ()=>{}});      
        expect(dispatch).toHaveBeenCalledWith(output);
    });

});
