'use client';
import dynamic from 'next/dynamic';

// Loaded after first paint so the particle engine stays out of the critical bundle.
const ParticlesCanvas = dynamic(() => import('./ParticlesCanvas'), { ssr: false });

const ParticlesBackground = ({ children }) => (
    <>
        <ParticlesCanvas />
        {children}
    </>
);

export default ParticlesBackground;
