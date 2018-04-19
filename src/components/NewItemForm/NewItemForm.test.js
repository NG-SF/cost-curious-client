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
          "place": "Rose"
				};
      
      wrapper.setState({  amount: value.amount,
                          createdAt: value.createdAt,
                          place: value.place});
      wrapper.instance().onSubmit({preventDefault: ()=>{}});      
      expect(dispatch).toHaveBeenCalledWith(output);
  });

	it('should render error for invalid form submission', () => {
			const wrapper = shallow(<NewItemForm />);
  		wrapper.find('form').simulate('submit', {
    			preventDefault: () => {}
  		});
  		expect(wrapper.state('error').length).toBeGreaterThan(0);
	});

	it('should set amount on input change', () => {
			const wrapper = shallow(<NewItemForm />);
			const value = '500';
			wrapper.find('input').at(0).simulate('change', {
				target: { value }
			});
			expect(wrapper.state('amount')).toBe(value);
	});

	it('should not set amount with invalid input', () => {
			const wrapper = shallow(<NewItemForm />);
			const value = '50.333333333';
			wrapper.find('input').at(0).simulate('change', {
				target: { value }
			});
			expect(wrapper.state('amount')).toBe('');
	});

	it('should set place on input change', () => {
			const wrapper = shallow(<NewItemForm />);
			const value = 'Sunflower';
			wrapper.find('input').at(1).simulate('change', {
				target: { value }
			});
			expect(wrapper.state('place')).toBe(value);
	});

	it('should set new date on date change', () => {
			const wrapper = shallow(<NewItemForm />);
			const now = moment();
			wrapper.find('#date').prop('onDateChange')(now);
			expect(wrapper.state('createdAt')).toEqual(now);
	});

	it('should set calendar focus on change', () => {
		const wrapper = shallow(<NewItemForm />);
		const focused = true;
		wrapper.find('#date').prop('onFocusChange')({focused});
		expect(wrapper.state('calendarFocused')).toEqual(true);
	});

});
