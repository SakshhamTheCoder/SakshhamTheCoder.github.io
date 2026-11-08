'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { particleConfig } from './particles';

export default function ParticlesCanvas() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);
    const options = useMemo(() => particleConfig, []);
    return ready ? <Particles options={options} /> : null;
}
