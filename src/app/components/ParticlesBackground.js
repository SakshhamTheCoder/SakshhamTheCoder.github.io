'use client';
import { useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { particleConfig } from './particles';

const ParticlesBackrgound = ({ children }) => {
    useEffect(async () => {
        await initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    return (
        <>
            <Particles id="tsparticles" options={particleConfig} />
            {children}
        </>
    );
};

export default ParticlesBackrgound;
