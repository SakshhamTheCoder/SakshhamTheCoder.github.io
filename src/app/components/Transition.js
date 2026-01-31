'use client';
import { motion } from 'motion/react';

const Transition = ({ children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
    </motion.div>
);

export default Transition;

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            scale: {
                type: 'spring',
                visualDuration: 0.5,
                bounce: 0.8,
            },
        },
    },
};

export { container, item };

