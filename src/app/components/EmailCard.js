'use client';

import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import EmailModal from './EmailModal';
import { motion } from 'motion/react';
import { item } from '@/app/components/Transition';

export default function EmailCard({ email }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.button
                variants={item}
                type="button"
                aria-label="Email"
                aria-haspopup="dialog"
                onClick={() => setOpen(true)}
                className="glass glass-link rounded-2xl p-4 flex items-center justify-center text-primary cursor-pointer"
            >
                <FaEnvelope size={28} />
            </motion.button>

            {open && <EmailModal email={email} onClose={() => setOpen(false)} />}
        </>
    );
}
