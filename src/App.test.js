import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import LoggedOut from './components/LoggedOut.jsx';
import { LoggedIn } from './components/LoggedIn';

let wrapper;

describe('App Component', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders correcty on page load', () => {
    expect(wrapper.find(LoggedOut).length).toBe(1);    
  });

  it('renders correctly when logged in', () => {
    wrapper.setState({ isLoggedIn: true });
    expect(wrapper.find(LoggedIn).length).toBe(1);
  });

  it('sets state correctly when logout is called', () => {
    wrapper.setState({ isLoggedIn: true, token: 'asdf1234' });
    wrapper.instance().logout();
    expect(wrapper.state()).toMatchObject({
      isLoggedIn: false,
      errorMessage: 'Logged out',
      token: ''
    });
  });

  describe('calling login method', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {
        return new Promise(resolve => {
          resolve({
            ok: true,
            json: function() {
              return { token: 'asdf1234' }
            }
          });
        });
      });
    });

    beforeEach(() => {
      global.fetch.mockClear();
    });

    it('calls the fetch method as expected', async () => {
      let username = 'user';
      let password = 'password'
      await wrapper.instance().loginAsync(username, password).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password }) 
          }          
        );
      })
    });
  });
});
