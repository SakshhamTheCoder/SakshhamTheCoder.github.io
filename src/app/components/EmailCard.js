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
            <motion.div
                variants={item}
                onClick={() => setOpen(true)}
                className="glass rounded-2xl p-6 flex items-center justify-center text-2xl text-primary cursor-pointer"
            >
                <FaEnvelope size={36} />
            </motion.div>

            {open && <EmailModal email={email} onClose={() => setOpen(false)} />}
        </>
    );
}

