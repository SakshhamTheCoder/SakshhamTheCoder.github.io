'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { particleConfig } from './particles';

// With reduced motion the network is drawn once and stays still: no drift, no pulsing, no pointer reaction.
const still = {
    ...particleConfig,
    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    particles: {
        ...particleConfig.particles,
        move: { ...particleConfig.particles.move, enable: false },
        opacity: { ...particleConfig.particles.opacity, animation: { enable: false } },
        size: { ...particleConfig.particles.size, animation: { enable: false } },
    },
};

export default function ParticlesCanvas() {
    const [ready, setReady] = useState(false);
    const [reduce, setReduce] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduce(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
        return () => mq.removeEventListener('change', sync);
    }, []);
    const options = useMemo(() => (reduce ? still : particleConfig), [reduce]);
    return ready ? <Particles key={reduce ? 'still' : 'live'} options={options} /> : null;
}
