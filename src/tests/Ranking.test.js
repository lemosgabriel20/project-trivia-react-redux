import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Ranking.js', () => {
  it('Teste se os componentes são renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/ranking');
    })
    await waitFor(() => {
      const title = screen.getByTestId('ranking-title');
      const btnHome = screen.getByTestId('btn-go-home');
      expect(title).toBeInTheDocument();
      expect(btnHome).toBeInTheDocument();
      userEvent.click(btnHome);
      expect(history.location.pathname).toBe('/');
    }, 2000);
  });
  it('Teste se os perfis são renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = [{name: 'teste', score: 12, picture: 'none'}]
    localStorage.setItem('ranking', JSON.stringify(players));
    act(() => {
      history.push('/ranking');
    })
    await waitFor(() => {
      const name = screen.getByTestId('player-name-0');
      const score = screen.getByTestId('player-score-0');
      expect(name).toBeInTheDocument();
      expect(score).toBeInTheDocument();
    }, 2000);
  })
});