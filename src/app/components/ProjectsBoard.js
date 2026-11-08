'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MdArrowOutward, MdOpenInNew, MdStar } from 'react-icons/md';
import { container, item, ease } from '@/app/components/Transition';

// Grid placement per slot (9-column x 3.4-row grid on lg+). Sizes come from the slots list, which admin shows too.
const CLS = ['lg:col-span-5 lg:row-span-2', 'lg:col-span-4', 'lg:col-span-4', ...Array(6).fill('lg:col-span-3')];

const MAX_TECH = { large: 8, medium: 4, small: 0 };
const DESC_CLAMP = {
    large: 'line-clamp-8 font-serif italic text-2xl leading-snug',
    medium: 'line-clamp-3 text-sm',
    small: 'line-clamp-2 text-sm',
};

const leave = { opacity: 0, scale: 0.96, transition: { duration: 0.15 } };

// A filled button with an external-link icon, so it reads as clickable (the status is plain text with a dot).
// It sits above the card's overlay link, so it stays clickable.
function LiveButton({ href, name }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open live site for ${name}`}
            className="pointer-events-auto relative z-20 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs text-white transition hover:brightness-90"
        >
            Live
            <MdOpenInNew aria-hidden="true" />
        </a>
    );
}

// Hover popover for text the card cuts off. Fixed to the viewport and portaled, so the card's overflow and lift do not clip or move it.
// Mouse only: touch has no hover, and the full text is already in the page for screen readers.
function usePeek(isCut) {
    const ref = useRef(null);
    const [box, setBox] = useState(null);
    const props = {
        ref,
        onPointerEnter: (e) => {
            if (e.pointerType === 'mouse' && ref.current && isCut(ref.current)) setBox(ref.current.getBoundingClientRect());
        },
        onPointerLeave: () => setBox(null),
    };
    return [props, box];
}

const PEEK_W = 22; // rem

function Peek({ box, children }) {
    if (!box) return null;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const left = Math.max(8, Math.min(box.left, window.innerWidth - PEEK_W * rem - 8));
    const below = box.bottom < window.innerHeight * 0.6;
    const pos = below ? { top: box.bottom + 8 } : { bottom: window.innerHeight - box.top + 8 };
    return createPortal(
        <motion.div
            initial={{ opacity: 0, y: below ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
            style={{ left, width: `${PEEK_W}rem`, ...pos }}
            className="pointer-events-none fixed z-50 rounded-xl border border-tertiary/20 bg-background/95 p-3 text-sm leading-snug text-tertiary shadow-xl backdrop-blur-xl"
        >
            {children}
        </motion.div>,
        document.body,
    );
}

const clipped = (el) => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;

function Card({ project, stars, size, cls }) {
    const all = project.techStack || [];
    const tech = all.slice(0, MAX_TECH[size]);
    const more = all.length - tech.length;
    const small = size === 'small';
    const [descPeek, descBox] = usePeek(clipped);
    const [morePeek, moreBox] = usePeek(() => true);
    // The description and "+N" sit above the overlay link to catch hover; a click on them still opens the project.
    const open = project.link ? () => window.open(project.link, '_blank', 'noreferrer') : undefined;
    return (
        <motion.article
            layout
            variants={item}
            exit={leave}
            transition={{ layout: { duration: 0.5, ease } }}
            className={`glass rounded-2xl ${size === 'small' ? 'p-4' : 'p-5'} flex flex-col justify-between gap-2 relative min-h-0 overflow-hidden ${project.link ? 'glass-link' : ''} ${cls}`}
        >
            {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 rounded-2xl" aria-label={`View source for ${project.name}`} />
            )}

            <div className="pointer-events-none min-h-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h2 className={`font-bold leading-snug text-primary ${size === 'large' ? 'text-3xl' : size === 'medium' ? 'text-xl' : 'text-base line-clamp-1'}`}>
                        {project.name}
                    </h2>
                    <div className="flex items-center gap-2 shrink-0 text-xs pt-0.5">
                        {stars > 0 && (
                            <span className="flex items-center gap-0.5 tabular-nums" aria-label={`${stars} stars`}>
                                <MdStar className="text-sm" aria-hidden="true" />
                                {stars}
                            </span>
                        )}
                        {project.status && !small && (
                            <span className="flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                                {project.status}
                            </span>
                        )}
                        {/* Small cards have no footer row, so the Live button sits up here with the stars. */}
                        {small && project.liveLink && <LiveButton href={project.liveLink} name={project.name} />}
                    </div>
                </div>
                <p {...descPeek} onClick={open} className={`pointer-events-auto relative z-20 text-tertiary ${open ? 'cursor-pointer' : ''} ${DESC_CLAMP[size]}`}>
                    {project.description}
                </p>
                <Peek box={descBox}>{project.description}</Peek>
            </div>

            <div className="flex items-end justify-between gap-3 pointer-events-none">
                {tech.length > 0 ? (
                    <>
                    <ul className="flex flex-wrap gap-1.5">
                        {tech.map((t) => (
                            <li key={t} className="text-xs leading-5 px-2 rounded-full border border-tertiary/20">
                                {t}
                            </li>
                        ))}
                        {more > 0 && (
                            <li {...morePeek} onClick={open} className={`pointer-events-auto relative z-20 text-xs leading-5 px-1 text-tertiary/80 hover:text-accent transition-colors ${open ? 'cursor-pointer' : ''}`}>
                                +{more}
                            </li>
                        )}
                    </ul>
                    <Peek box={moreBox}>
                        <ul className="flex flex-wrap gap-1.5">
                            {all.map((t) => (
                                <li key={t} className="text-xs leading-5 px-2 rounded-full border border-tertiary/20">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </Peek>
                    </>
                ) : (
                    <span />
                )}
                <div className="relative z-20 flex items-center gap-3 shrink-0">
                    {!small && project.liveLink && <LiveButton href={project.liveLink} name={project.name} />}
                    {project.link && <MdArrowOutward size={size === 'large' ? '1.625rem' : '1.25rem'} className="link-arrow text-accent" aria-hidden="true" />}
                </div>
            </div>
        </motion.article>
    );
}

function ArchiveRow({ p }) {
    const Row = p.link ? 'a' : 'div';
    const all = p.techStack || [];
    const tech = all.slice(0, 3);
    // Pop the full row when any line is cut off or there are more than the three technologies shown.
    const [peek, box] = usePeek((el) => all.length > 3 || [...el.querySelectorAll('.truncate, .line-clamp-1')].some(clipped));
    return (
        <motion.li layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.3, ease }}>
            <Peek box={box}>
                <p className="font-bold">{p.name}</p>
                {p.description && <p className="mt-1">{p.description}</p>}
                {(all.length > 0 || p.status) && <p className="mt-1.5 text-xs text-tertiary/80">{[...all, p.status].filter(Boolean).join(' · ')}</p>}
            </Peek>
            <Row
                {...peek}
                {...(p.link && { href: p.link, target: '_blank', rel: 'noreferrer' })}
                className="flex items-start justify-between gap-3 rounded-lg px-2 py-2 hover:bg-tertiary/10 transition-colors"
            >
                <span className="min-w-0">
                    <span className="block text-sm font-bold text-tertiary truncate">{p.name}</span>
                    <span className="text-xs text-tertiary/80 line-clamp-1">{p.description}</span>
                    {(tech.length > 0 || p.status) && (
                        <span className="block text-xs text-tertiary/80 truncate mt-0.5">{[...tech, p.status].filter(Boolean).join(' · ')}</span>
                    )}
                </span>
                {p.link && <MdArrowOutward className="link-arrow text-accent shrink-0 mt-0.5" aria-hidden="true" />}
            </Row>
        </motion.li>
    );
}

// The list fades at its bottom edge only while there is more below it; scrolled to the end (or not overflowing) it is clear.
function ArchiveList({ archive }) {
    const ref = useRef(null);
    const [more, setMore] = useState(false);
    useEffect(() => {
        const el = ref.current;
        const update = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 2);
        update();
        const t = setTimeout(update, 450); // rows animate in and out when the filter changes
        el.addEventListener('scroll', update, { passive: true });
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => {
            clearTimeout(t);
            el.removeEventListener('scroll', update);
            ro.disconnect();
        };
    }, [archive]);
    return (
        <ul ref={ref} className={`${more ? 'scroll-fade' : ''} flex flex-1 flex-col justify-between gap-1 min-h-0 overflow-y-auto -mx-2`}>
            <AnimatePresence>
                {archive.map((p) => (
                    <ArchiveRow key={p.id || p.name} p={p} />
                ))}
            </AnimatePresence>
        </ul>
    );
}

export default function ProjectsBoard({ projects, stars, sizes }) {
    const [tech, setTech] = useState('all');

    // Filter chips: the technologies at least two projects share, most common first. "All" is always the default view.
    const techs = useMemo(() => {
        const counts = {};
        for (const p of projects) for (const t of new Set(p.techStack || [])) counts[t] = (counts[t] ?? 0) + 1;
        return Object.entries(counts)
            .filter(([, n]) => n >= 2)
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, 8);
    }, [projects]);

    const matches = tech === 'all' ? projects : projects.filter((p) => (p.techStack || []).includes(tech));
    const shown = matches.slice(0, sizes.length);
    const archive = matches.slice(sizes.length);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)] gap-4"
        >
            <h1 className="sr-only">Projects</h1>

            {techs.length > 0 && (
                <motion.div
                    variants={item}
                    role="group"
                    aria-label="Filter by technology"
                    className="lg:col-span-12 flex gap-2 overflow-x-auto -mb-1 pb-1 select-none"
                >
                    {[['all', projects.length], ...techs].map(([id, n]) => {
                        const on = tech === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setTech(id)}
                                className={`relative shrink-0 cursor-pointer rounded-full border px-3 py-1 text-xs bg-tertiary/5 backdrop-blur transition-colors ${on ? 'border-transparent text-accent' : 'border-tertiary/20 hover:text-accent'}`}
                            >
                                {on && (
                                    <motion.span
                                        layoutId="tech-pill"
                                        className="absolute inset-0 rounded-full border border-primary/60 bg-primary/10"
                                        transition={{ duration: 0.4, ease }}
                                    />
                                )}
                                <span className="relative">
                                    {id === 'all' ? 'All' : id} <span className="tabular-nums text-tertiary/80">{n}</span>
                                </span>
                            </button>
                        );
                    })}
                </motion.div>
            )}

            <motion.div
                variants={container}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 lg:grid-rows-[1fr_1fr_0.8fr_0.8fr] gap-4 min-h-0 ${archive.length ? 'lg:col-span-9' : 'lg:col-span-12'}`}
            >
                <AnimatePresence>
                    {shown.map((p, i) => (
                        <Card key={p.id || p.name} project={p} stars={stars[p.id]} size={sizes[i]} cls={`${CLS[i]} ${i === 0 ? 'sm:col-span-2' : ''}`} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {archive.length > 0 && (
                <motion.section variants={item} aria-labelledby="archive-title" className="glass rounded-2xl p-5 lg:col-span-3 min-h-0 flex flex-col gap-3">
                    <h2 id="archive-title" className="tile-title tabular-nums">
                        More projects · {archive.length}
                    </h2>
                    <ArchiveList archive={archive} />
                </motion.section>
            )}
        </motion.div>
    );
}
