'use client';
import { motion } from 'motion/react';

const Transition = ({ children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
    </motion.div>
);

export default Transition;

