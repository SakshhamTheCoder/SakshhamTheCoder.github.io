'use client';
import { motion } from 'motion/react';
import { ease } from './Transition';

// The one focal moment: each word of the headline lifts out of a mask, left to right.
// Words are masked individually so the lines can wrap anywhere. An "&" is glued to the word before it
// (non-breaking space) so it never starts a line on its own.
export default function HeroTitle({ line }) {
    const parts = line.split('&').map((s) => s.trim());
    const words = [
        ...['I', 'am', 'a'].map((w) => [{ t: w, tone: 'text-tertiary' }]),
        ...parts.flatMap((part, i) => {
            const ws = part.split(/\s+/).map((t) => [{ t, tone: '' }]);
            if (i < parts.length - 1) ws[ws.length - 1].push({ t: ' &', tone: 'text-tertiary' });
            return ws;
        }),
    ];
    return words.map((segs, i) => (
        <span key={i}>
            {i > 0 && ' '}
            <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
                <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease }}
                >
                    {segs.map(({ t, tone }) => (
                        <span key={t} className={tone}>
                            {t}
                        </span>
                    ))}
                </motion.span>
            </span>
        </span>
    ));
}
