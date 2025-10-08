import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from 'stores/rootReducers';
import 'locales/i18n';

jest.mock('configs/config', () => ({
  global: {
    PROJECT_NAME: 'Material UI',
    APP_ENDPOINT_URL: 'http://localhost:3000',
  },
}));

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('App', () => {
  test('renders login page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loginText = await screen.findByText(/Login/i);
    expect(loginText).toBeInTheDocument();
  });

  test('handles login form submission', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await screen.findByText(/Login/i);

    userEvent.type(screen.getByLabelText(/user name/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });
});
