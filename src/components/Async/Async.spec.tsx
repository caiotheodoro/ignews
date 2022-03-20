import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';


test('it renders correctly',async () => {
    render(
        <Async />
    );

    expect(screen.getByText('Async')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText('Button')).toBeInTheDocument();
    },  { timeout: 1000 });

    await waitFor(() => {
        expect(screen.queryByText('Button2')).not.toBeInTheDocument();
    },  { timeout: 1000 });


})