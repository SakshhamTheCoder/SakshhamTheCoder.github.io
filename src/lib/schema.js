// Single source of truth for content shape: drives admin forms and server validation.
export const ICONS = [
    'work', 'school', 'github', 'groups', 'google', 'music', 'code', 'terminal', 'cloud', 'devices', 'build', 'graph',
];

const humanize = (n) => n.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
const f = (name, type, extra = {}) => ({ name, label: extra.label || humanize(name), type, ...extra });

export const SCHEMAS = {
    projects: {
        label: 'Projects',
        title: 'name',
        list: true,
        fields: [
            f('name', 'text', { required: true }),
            f('description', 'textarea', { required: true }),
            f('link', 'url', { label: 'Source link' }),
            f('liveLink', 'url', { label: 'Live link' }),
            f('techStack', 'strings', { label: 'Tech stack (one per line)' }),
            f('rank', 'number', { label: 'Rank on Projects page (1 = big card, empty = automatic)' }),
            f('featured', 'bool'),
            f('visible', 'bool'),
            f('status', 'enum', { options: ['active', 'maintained', 'ended'] }),
            f('githubRepo', 'repo', { label: 'GitHub repo (owner/name, for live stars)' }),
            f('stars', 'number', { label: 'Stars (fallback)' }),
            f('startedAt', 'month'),
            f('endedAt', 'month'),
            f('position', 'number', { hidden: true }),
        ],
    },
    experience: {
        label: 'Experience',
        title: 'org',
        list: true,
        fields: [
            f('org', 'text', { required: true, label: 'Organisation' }),
            f('role', 'text', { required: true }),
            f('startDate', 'month'),
            f('endDate', 'month', { label: 'End date (empty = present)' }),
            f('bullets', 'strings', { label: 'Bullets (one per line)' }),
            f('skills', 'strings', { label: 'Skills (one per line)' }),
            f('icon', 'enum', { options: ICONS }),
            f('kind', 'enum', { options: ['work', 'research', 'open-source', 'position', 'other'] }),
            f('showOnHome', 'bool'),
            f('visible', 'bool'),
            f('position', 'number', { hidden: true }),
        ],
    },
    skills: {
        label: 'Skills',
        title: 'title',
        list: true,
        fields: [
            f('title', 'text', { required: true }),
            f('icon', 'enum', { options: ICONS }),
            f('items', 'strings', { required: true, label: 'Items (one per line)' }),
            f('position', 'number', { hidden: true }),
        ],
    },
    achievements: {
        label: 'Achievements',
        title: 'title',
        list: true,
        fields: [
            f('title', 'text', { required: true }),
            f('detail', 'text'),
            f('date', 'text', { label: 'Date (free text, e.g. 2025)' }),
            f('kind', 'enum', { options: ['award', 'certification'] }),
            f('visible', 'bool'),
            f('position', 'number', { hidden: true }),
        ],
    },
    profile: {
        label: 'Profile',
        single: true,
        fields: [
            f('headline', 'text', { label: 'Headline (meta description)' }),
            f('heroLine', 'text', { label: 'Hero line (after "I am a")' }),
            f('aboutShort', 'textarea', { label: 'Home about blurb' }),
            f('aboutHighlight', 'text', { label: 'Highlighted phrase inside blurb' }),
            f('focus', 'textarea', { label: 'Primary focus' }),
            f('interests', 'textarea', { label: 'Technical interests' }),
            f('location', 'text'),
            f('educationDegree', 'text'),
            f('educationSchool', 'text'),
            f('educationDates', 'text'),
            f('educationCgpa', 'text'),
            f('email', 'text'),
            f('socials', 'pairs', { label: 'Socials (one per line: id url)' }),
            f('resumeLink', 'url'),
        ],
    },
    now: {
        label: 'Now',
        single: true,
        fields: [f('text', 'text', { label: 'What I am working on now' })],
    },
};

export const toText = (f, v) =>
    f.type === 'strings' ? (v || []).join('\n') : f.type === 'pairs' ? (v || []).map((p) => `${p.id} ${p.href}`).join('\n') : v ?? '';

const lines = (s) => String(s).split('\n').map((x) => x.trim()).filter(Boolean);
const URL_RE = /^https?:\/\/\S+$/;

// Returns cleaned object; empty optional fields become undefined (callers delete them).
export function clean(schema, data) {
    const known = new Set(schema.fields.map((x) => x.name));
    for (const k of Object.keys(data)) if (!known.has(k)) throw new Error(`Unknown field: ${k}`);

    const out = {};
    for (const fl of schema.fields) {
        let v = data[fl.name];
        if (fl.type === 'strings' || fl.type === 'pairs') v = typeof v === 'string' ? lines(v) : v;
        if (typeof v === 'string') v = v.trim();
        const empty = v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
        if (fl.type === 'bool') {
            out[fl.name] = Boolean(v);
            continue;
        }
        if (empty) {
            if (fl.required) throw new Error(`${fl.label} is required`);
            out[fl.name] = undefined;
            continue;
        }
        const bad = (m) => {
            throw new Error(`${fl.label}: ${m}`);
        };
        switch (fl.type) {
            case 'text':
            case 'textarea':
                if (typeof v !== 'string' || v.length > 5000) bad('invalid text');
                break;
            case 'url':
                if (!URL_RE.test(v)) bad('must be an http(s) URL');
                break;
            case 'repo':
                if (!/^[\w.-]+\/[\w.-]+$/.test(v)) bad('must look like owner/name');
                break;
            case 'month':
                if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(v)) bad('must be YYYY-MM');
                break;
            case 'enum':
                if (!fl.options.includes(v)) bad('invalid option');
                break;
            case 'number':
                v = Number(v);
                if (!Number.isFinite(v)) bad('must be a number');
                break;
            case 'strings':
                if (!Array.isArray(v) || v.length > 60 || v.some((s) => typeof s !== 'string' || s.length > 1000))
                    bad('invalid list');
                break;
            case 'pairs':
                v = v.map((p) => {
                    if (typeof p === 'string') {
                        const [id, href] = p.split(/\s+/);
                        p = { id, href };
                    }
                    if (!p.id || !URL_RE.test(p.href || '')) bad('each line must be "id https://url"');
                    return { id: String(p.id), href: p.href };
                });
                break;
        }
        out[fl.name] = v;
    }
    return out;
}
