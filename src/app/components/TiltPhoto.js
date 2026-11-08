'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

// The photo is square but the tile is landscape on desktop, so only about 70% of its height shows. The focus point
// keeps the top of the head and the face in frame; centring cut the hair off.
// The photo leans a few degrees toward the pointer and catches a soft light. It is slightly oversized so the tile
// edge never shows while it tilts. Touch and reduced-motion visitors get the plain photo.
export default function TiltPhoto({ src, alt }) {
    const reduce = useReducedMotion();
    const [fine, setFine] = useState(false);
    useEffect(() => setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches), []);

    const rx = useSpring(0, { stiffness: 140, damping: 20 });
    const ry = useSpring(0, { stiffness: 140, damping: 20 });
    const glow = useSpring(0, { stiffness: 120, damping: 22 });
    const px = useMotionValue(50);
    const py = useMotionValue(50);
    const sheen = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgb(255 255 255 / 0.14), transparent 55%)`;
    const live = fine && !reduce;

    const move = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const u = (e.clientX - r.left) / r.width;
        const v = (e.clientY - r.top) / r.height;
        px.set(u * 100);
        py.set(v * 100);
        ry.set((u - 0.5) * 6);
        rx.set((0.5 - v) * 6);
        glow.set(1);
    };
    const leave = () => {
        rx.set(0);
        ry.set(0);
        glow.set(0);
    };

    return (
        <div className="absolute inset-0" onPointerMove={live ? move : undefined} onPointerLeave={live ? leave : undefined}>
            <motion.div
                className="absolute inset-0"
                style={live ? { rotateX: rx, rotateY: ry, scale: 1.04, transformPerspective: 1000 } : undefined}
            >
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-[45%_10%]" priority />
            </motion.div>
            {live && <motion.div aria-hidden="true" style={{ background: sheen, opacity: glow }} className="pointer-events-none absolute inset-0" />}
        </div>
    );
}
