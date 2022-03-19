import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import { SubscribeButton } from '.';
import { useRouter } from 'next/router';


jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton components', () => {

    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);

        render(<SubscribeButton />);

        expect(screen.getByText('Subscribe now')).toBeInTheDocument();
    })


    it('redirects user to sign in when not authenticated', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);
        const signInMocked = mocked(signIn)

        render(<SubscribeButton />);

        const subscribeButton = screen.getByText('Subscribe now');
        fireEvent.click(subscribeButton);

        expect(signInMocked).toHaveBeenCalled();

    })


    it('redirects to posts when user already has a subscription', () => {
        const userRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMock = jest.fn()

        userRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)
        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                image: 'https://avatars2.githubusercontent.com/u/174825?v=4'
            },
            activeSubscription: 'test',
            expires: '2020-12-31T23:59:59.999Z'
        }, true]);

        render(<SubscribeButton />);

        const subscribeButton = screen.getByText('Subscribe now');
        fireEvent.click(subscribeButton);

        expect(pushMock).toHaveBeenCalledWith('/posts');

    })

})