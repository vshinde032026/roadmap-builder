import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ObjectiveSearchBar } from './ObjectiveSearchBar';

describe('ObjectiveSearchBar', () => {
  it('submits trimmed value when input is valid', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ObjectiveSearchBar onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/learning objective/i), '  Learn frontend  ');
    await user.click(screen.getByRole('button', { name: /generate/i }));

    expect(onSubmit).toHaveBeenCalledWith('Learn frontend');
  });

  it('blocks submission when input is too short', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ObjectiveSearchBar onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/learning objective/i), 'hi');
    await user.click(screen.getByRole('button', { name: /generate/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
  });
});
