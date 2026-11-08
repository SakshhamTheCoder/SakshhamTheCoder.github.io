// Single source of truth for content shape: drives admin forms and server validation.
export const ICONS = [
    'work', 'school', 'github', 'groups', 'google', 'music', 'code', 'terminal', 'cloud', 'devices', 'build', 'graph',
];

const humanize = (n) => n.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
const f = (name, type, extra = {}) => ({ name, label: extra.label || humanize(name), type, ...extra });

// Projects page tiers by list position (visible projects only); anything past the end goes in "More projects".
export const PROJECT_SLOTS = ['large', 'medium', 'medium', 'small', 'small', 'small', 'small', 'small', 'small'];
export const SLOT_LABEL = { large: 'Big card', medium: 'Medium card', small: 'Small card' };

// Per schema: `desc` is shown under the tab title, `page` is the public page to preview, `addAt` is where new items go.
// Per field: `group` makes a form section, `help` is the hint under the input.
export const SCHEMAS = {
    projects: {
        label: 'Projects',
        title: 'name',
        list: true,
        page: '/projects',
        addAt: 'bottom',
        desc: 'The order of this list is the order on the site. Slot 1 is the big card, slots 2-3 are medium cards, slots 4-9 are small cards, and the rest go in "More projects". Drag to reorder.',
        fields: [
            f('name', 'text', { required: true, group: 'Basics' }),
            f('description', 'textarea', { required: true, group: 'Basics', help: 'Cards show 2-6 lines depending on size, so lead with the point.' }),
            f('link', 'url', { label: 'Source link', group: 'Links', help: 'Makes the whole card clickable.' }),
            f('liveLink', 'url', { label: 'Live link', group: 'Links', help: 'Adds a "Live" button.' }),
            f('githubRepo', 'repo', { label: 'GitHub repo', group: 'Links', help: 'owner/name. Shows a live star count.' }),
            f('stars', 'number', { label: 'Stars (fallback)', group: 'Links', help: 'Shown only when the repo is empty or GitHub is unreachable.' }),
            f('techStack', 'strings', { label: 'Tech stack', group: 'Details', help: 'One per line. Big card shows 8, medium 4, small none.' }),
            f('status', 'enum', { options: ['active', 'maintained', 'ended'], group: 'Details', help: 'Shown as a pill on big and medium cards.' }),
            f('visible', 'bool', { group: 'Details', help: 'Untick to hide from the site.' }),
            f('position', 'number', { hidden: true }),
        ],
    },
    experience: {
        label: 'Experience',
        title: 'org',
        list: true,
        page: '/about',
        addAt: 'top',
        desc: 'Order is manual: newest first is the usual choice. "Kind" decides the About tile, "Show on home" decides the Home tile (first 6 shown).',
        fields: [
            f('org', 'text', { required: true, label: 'Organisation', group: 'Basics' }),
            f('role', 'text', { required: true, group: 'Basics' }),
            f('startDate', 'month', { group: 'Dates', help: 'Optional. Shown as a range like "Jul 2025 – Present".' }),
            f('endDate', 'month', { label: 'End date', group: 'Dates', help: 'Leave empty if it is ongoing and the start date is set.' }),
            f('kind', 'enum', {
                options: ['work', 'research', 'open-source', 'position', 'other'],
                group: 'Where it shows',
                help: 'work and research go in "Work & research" on About. The rest go in "Community, open source & music".',
            }),
            f('icon', 'enum', { options: ICONS, group: 'Where it shows' }),
            f('showOnHome', 'bool', { label: 'Show on home', group: 'Where it shows' }),
            f('visible', 'bool', { group: 'Where it shows', help: 'Untick to hide from the site.' }),
            f('position', 'number', { hidden: true }),
        ],
    },
    skills: {
        label: 'Skills',
        title: 'title',
        list: true,
        page: '/about',
        addAt: 'bottom',
        desc: 'Each item is one group on About. Order here is the order on the page.',
        fields: [
            f('title', 'text', { required: true, group: 'Group' }),
            f('icon', 'enum', { options: ICONS, group: 'Group' }),
            f('items', 'strings', { required: true, label: 'Skills', group: 'Group', help: 'One per line.' }),
            f('position', 'number', { hidden: true }),
        ],
    },
    achievements: {
        label: 'Achievements',
        title: 'title',
        list: true,
        page: '/about',
        addAt: 'bottom',
        desc: 'Order here is the order on About. Hidden items do not show.',
        fields: [
            f('title', 'text', { required: true, group: 'Basics' }),
            f('detail', 'text', { group: 'Basics' }),
            f('date', 'text', { label: 'Date', group: 'Basics', help: 'Free text, for example 2025.' }),
            f('kind', 'enum', { options: ['award', 'certification'], group: 'Basics', help: 'Award gets a trophy icon, certification a check badge.' }),
            f('visible', 'bool', { group: 'Basics', help: 'Untick to hide from the site.' }),
            f('position', 'number', { hidden: true }),
        ],
    },
    profile: {
        label: 'Profile',
        single: true,
        page: '/',
        desc: 'Text used on Home and About, plus links.',
        fields: [
            f('heroLine', 'text', { label: 'Hero line', group: 'Home', help: 'Shown after "I am a". An & splits it into two colours.' }),
            f('aboutShort', 'textarea', { label: 'About blurb', group: 'Home', help: 'The text in the Home About tile.' }),
            f('aboutHighlight', 'text', { label: 'Highlighted phrase', group: 'Home', help: 'Must match a phrase inside the blurb exactly to be highlighted.' }),
            f('email', 'text', { group: 'Home', help: 'Used by the Home email tile.' }),
            f('socials', 'pairs', { label: 'Socials', group: 'Home', help: 'One per line: id url. Ids linkedin, github and music have icons; others get a globe. Shown in this order.' }),
            f('resumeLink', 'url', { group: 'Home', help: 'Used by the Resume tile, the navbar and /resume.' }),
            f('focus', 'textarea', { label: 'Primary focus', group: 'About', help: 'The large statement on About.' }),
            f('interests', 'textarea', { label: 'Technical interests', group: 'About', help: 'Small text under the focus statement.' }),
            f('location', 'text', { group: 'About' }),
            f('educationDegree', 'text', { group: 'Education (About)' }),
            f('educationSchool', 'text', { group: 'Education (About)' }),
            f('educationDates', 'text', { group: 'Education (About)' }),
            f('educationCgpa', 'text', { label: 'CGPA', group: 'Education (About)' }),
            f('headline', 'text', { label: 'Site description', group: 'Search and sharing', help: 'Not shown on the page. Used for search results and link previews.' }),
        ],
    },
    now: {
        label: 'Now',
        single: true,
        page: '/',
        desc: 'One short line under the Home hero. Leave empty to hide it.',
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
