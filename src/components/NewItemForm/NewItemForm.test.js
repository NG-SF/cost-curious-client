import React from 'react';
import {shallow, mount} from 'enzyme';
import NewItemForm from './NewItemForm';

describe('<NewItemForm />', () => {
    it('Renders without crashing', () => {
        shallow(<NewItemForm />);
    });

    it('Should render an input area', () => {
        const wrapper = shallow(<NewItemForm /> );
        expect(wrapper.find('input').length).toEqual(2);
    });

    xit('Should fire onSubmit callback when the form is submitted', () => {
        const dispatch = jest.fn();
        const wrapper = mount(<GuessForm dispatch={dispatch} />);
        dispatch.mockClear();
        const value = {
          amount: '333',
          createdAt: 1515009600000,
          place: 'Rose'
        };
        wrapper.find('input[type="number"]').instance().value = value;
        wrapper.simulate('submit');      
        expect(dispatch).toHaveBeenCalledWith(makeGuess(value));
    });

});
