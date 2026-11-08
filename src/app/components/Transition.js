'use client';
import { motion, MotionConfig } from 'motion/react';

// Shared ease: the same expo-out curve as --ease-out-expo in globals.css.
export const ease = [0.16, 1, 0.3, 1];

// Page fade and short rise; the navbar sits outside so it does not refade on navigation.
// With an id the wrapper is the skip link target, so it can take focus without showing an outline.
const Transition = ({ children, className, id }) => (
    <MotionConfig reducedMotion="user">
        <motion.div
            id={id}
            tabIndex={id ? -1 : undefined}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className={`${className ?? ''} focus:outline-none`}
        >
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
