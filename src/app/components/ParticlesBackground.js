'use client';
import { useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { particleConfig } from './particles';

const ParticlesBackrgound = ({ children }) => {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <>
            <Particles id="tsparticles" loaded={particlesLoaded} options={particleConfig} />
            {children}
        </>
    );
};

export default ParticlesBackrgound;
