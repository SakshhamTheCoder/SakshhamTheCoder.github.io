'use client';
import { useActionState } from 'react';
import { loginAction } from './actions';
import { input, btnPrimary } from './ui';

export default function LoginForm() {
    const [state, action, pending] = useActionState(loginAction, null);
    return (
        <div className="flex-1 flex items-center justify-center">
            <form action={action} className="glass rounded-2xl p-6 max-w-sm w-full flex flex-col gap-4 select-text">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Admin</h1>
                    <p className="text-sm mt-1">Sign in to edit the site content.</p>
                </div>
                <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wide">
                    Password
                    <input
                        name="password"
                        type="password"
                        required
                        autoFocus
                        autoComplete="current-password"
                        aria-describedby={state?.error ? 'login-error' : undefined}
                        className={input}
                    />
                </label>
                {state?.error && (
                    <p id="login-error" role="alert" className="text-sm text-accent">
                        {state.error}
                    </p>
                )}
                <button disabled={pending} className={btnPrimary}>
                    {pending ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
