import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Teste o componente <Login.js />', () => {
  test('Testa se os componentes renderizam na tela', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttons = screen.getAllByRole('button');
    
    expect(
     nameInput
    && emailInput,
    ).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
  test('Testa função handleInput e handleClick', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    
    expect(btnPlay).toBeDisabled();

    userEvent.type(nameInput, "Teste");
    userEvent.type(emailInput, "teste@teste.com");

    expect(btnPlay).toBeEnabled();

    expect(nameInput).toHaveValue("Teste");
    expect(emailInput).toHaveValue("teste@teste.com");

    userEvent.click(btnPlay);
    await waitFor(() => {
      expect(history.location.pathname).toBe("/game");
    })
  });
  test('Testa o botão Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');

    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe("/settings");
  })
  });