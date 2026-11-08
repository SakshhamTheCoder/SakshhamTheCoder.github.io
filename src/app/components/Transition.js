'use client';
import { motion, MotionConfig } from 'motion/react';

// Page fade only; the navbar sits outside so it does not refade on navigation.
const Transition = ({ children, className }) => (
    <MotionConfig reducedMotion="user">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={className}>
            {children}
        </motion.div>
    </MotionConfig>
);

export default Transition;

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const item = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            scale: {
                type: 'spring',
                visualDuration: 0.4,
                bounce: 0.3,
            },
        },
    },
};

export { container, item };
