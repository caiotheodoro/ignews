import { render, screen } from '@testing-library/react';
import { SignInButton } from '.';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';


jest.mock('next-auth/client')


describe('SignInButton components', () => { 

it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    const {debug} = render(
        <SignInButton  />
    );
    debug()
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
    })

it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([{
        user: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            image: 'https://avatars2.githubusercontent.com/u/174825?v=4'
        },
        expires: '2020-12-31T23:59:59.999Z'
    }, true]);

    const {debug} = render(
        <SignInButton  />
    );
    debug()
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    })


 

})