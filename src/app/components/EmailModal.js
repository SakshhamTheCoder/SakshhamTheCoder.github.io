'use client';

import { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';

export default function EmailModal({ email, onClose }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const dialog = useRef(null);

    useEffect(() => {
        const opener = document.activeElement;
        const focusables = () => dialog.current.querySelectorAll('button, a[href]');
        focusables()[1]?.focus();
        function onKey(e) {
            if (e.key === 'Escape') return onClose();
            if (e.key !== 'Tab') return;
            const els = focusables();
            const first = els[0];
            const last = els[els.length - 1];
            if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
            else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
        }
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            opener?.focus?.();
        };
    }, [onClose]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                ref={dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="email-title"
                onClick={(e) => e.stopPropagation()}
                className="glass-navbar-popup rounded-2xl p-6 w-full max-w-sm relative mx-4"
            >
                <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-tertiary hover:text-accent">
                    <MdClose size="1.375rem" />
                </button>

                <h3 id="email-title" className="text-lg font-bold text-accent mb-4">
                    Reach out
                </h3>

                <div className="select-all text-sm font-mono bg-black/20 rounded-lg p-3 mb-4 text-tertiary break-all">{email}</div>

                <div className="flex gap-3">
                    <button
                        onClick={copyToClipboard}
                        className={`flex-1 border border-tertiary/30 rounded-lg py-2 text-sm hover:border-primary/60 transition ${copySuccess ? 'bg-primary/40' : ''}`}
                    >
                        {copySuccess ? 'Copied!' : 'Copy to clipboard'}
                    </button>

                    <a
                        href={`mailto:${email}`}
                        className="flex-1 text-center border border-primary/50 rounded-lg py-2 text-sm text-accent hover:bg-primary/10 transition"
                    >
                        Open mail app
                    </a>
                </div>
            </div>
        </div>
    );
}
