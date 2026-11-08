'use client';
import { useActionState } from 'react';
import { loginAction } from './actions';
import { input } from './ui';

export default function LoginForm() {
    const [state, action, pending] = useActionState(loginAction, null);
    return (
        <form action={action} className="glass-navbar rounded-2xl p-6 max-w-sm w-full mx-auto flex flex-col gap-3 select-text">
            <h1 className="text-2xl font-bold text-primary">Admin</h1>
            <input name="email" type="email" placeholder="Email" required autoComplete="username" className={input} />
            <input name="password" type="password" placeholder="Password" required autoComplete="current-password" className={input} />
            {state?.error && <p className="text-sm text-primary">{state.error}</p>}
            <button disabled={pending} className="rounded-lg bg-primary/80 hover:bg-primary text-white py-2 text-sm disabled:opacity-50">
                {pending ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    );
}
