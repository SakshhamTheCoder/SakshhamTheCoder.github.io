'use client';
import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { particleConfig } from './particles';

const ParticlesBackground = ({ children }) => {
    useEffect(() => {
        console.log('test');
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    const options = useMemo(() => particleConfig, []);

    return (
        <>
            <Particles options={options} />
            {children}
        </>
    );
};

export default ParticlesBackground;
