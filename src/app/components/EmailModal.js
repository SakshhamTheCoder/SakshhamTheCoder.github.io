'use client';

import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

export default function EmailModal({ email, onClose }) {
    useEffect(() => {
        function onEsc(e) {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, [onClose]);

    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="glass-navbar-popup rounded-2xl p-6 w-full max-w-sm relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-tertiary hover:text-primary">
                    <MdClose size={22} />
                </button>

                <h3 className="text-lg font-bold text-primary mb-4">Reach out</h3>

                <div className="select-all text-sm font-mono bg-black/20 rounded-lg p-3 mb-4 text-tertiary">
                    {email}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={copyToClipboard}
                        className={`flex-1 border border-tertiary/30 rounded-lg py-2 text-sm hover:border-primary/40 transition ${copySuccess ? 'bg-primary/40' : ''}`}
                    >
                        {copySuccess ? 'Copied!' : 'Copy to clipboard'}
                    </button>

                    <a
                        href={`mailto:${email}`}
                        className="flex-1 text-center border border-primary/40 rounded-lg py-2 text-sm text-primary hover:bg-primary/10 transition"
                    >
                        Open mail app
                    </a>
                </div>
            </div>
        </div>
    );
}

