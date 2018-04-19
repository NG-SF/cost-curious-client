import {API_BASE_URL} from '../../config';
import {registerUser} from '../users';

describe('registerUser', () => {
    it('Should dispatch register user', () => {
    const user = {
        username: 'user',
        firstName: 'Joe',
        lastName: 'Black'
      };
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({ok:true, json(){return user;}
      }));

    const dispatch = jest.fn();
    return registerUser(user)(dispatch)
            .then(() => {
              expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users`,{"headers": { "content-type": "application/json"}, 
                           "method": "POST",
                           "body": JSON.stringify(user)}); 
            });
    });
});
