import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Game from '../pages/Game';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { wait } from '@testing-library/user-event/dist/utils';

describe('Testa o componente Ranking.js', () => {
  it('Teste se os componentes são renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(nameInput, "teste");
    userEvent.type(emailInput, "teste@teste.com");
    userEvent.click(btnPlay);

    await waitFor(() => {
      const category = screen.getByTestId('question-category');
      
      expect(category).toBeInTheDocument();
    }, {timeout: 4000});
  })
  it('Teste se os componentes são renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/game');
    })
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    }, {timeout: 2000});
  })
  it('Teste botão Next', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(nameInput, "teste");
    userEvent.type(emailInput, "teste@teste.com");
    userEvent.click(btnPlay);

    await waitFor(() => {
      const firstQbtn = screen.getAllByRole('button');
      userEvent.click(firstQbtn[0]);
      const next = screen.getByTestId('btn-next');
      expect(next).toBeInTheDocument();
      userEvent.click(next);
      const secQbtn = screen.getAllByRole('button');
      expect(firstQbtn[0]).not.toBe(secQbtn[0]);
    }, {timeout: 2000});
  })
  it('Teste dos botões de pergunts e o localStorage "ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    console.log((localStorage.getItem('ranking')))
    expect(JSON.parse(localStorage.getItem('ranking'))).toHaveLength(0);
    userEvent.type(nameInput, "teste");
    userEvent.type(emailInput, "teste@teste.com");
    userEvent.click(btnPlay);

    let buttons = null;
    await waitFor(() => {
      buttons = screen.getAllByRole('button');
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByTestId('btn-next'));

      buttons = screen.getAllByRole('button');
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByTestId('btn-next'));

      buttons = screen.getAllByRole('button');
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByTestId('btn-next'));

      buttons = screen.getAllByRole('button');
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByTestId('btn-next'));

      buttons = screen.getAllByRole('button');
      userEvent.click(buttons[0]);
      userEvent.click(screen.getByTestId('btn-next'));

      expect(history.location.pathname).toBe('/feedback');
    }, {timeout: 2000});
  });
  it('Teste se timer decrementa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, "teste");
    userEvent.type(emailInput, "teste@teste.com");
    userEvent.click(btnPlay);
    await waitFor(() => {
      const timer = screen.getByTestId('timer');
      expect(timer).toHaveTextContent(22);
    }, {timeout: 32_000})
  }, 40000)
});