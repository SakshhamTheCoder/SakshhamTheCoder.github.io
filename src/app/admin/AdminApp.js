'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    MdArrowUpward,
    MdArrowDownward,
    MdEdit,
    MdDeleteOutline,
    MdAdd,
    MdLogout,
    MdOpenInNew,
    MdRefresh,
    MdDragIndicator,
    MdVisibility,
    MdVisibilityOff,
} from 'react-icons/md';
import { SCHEMAS, PROJECT_SLOTS, SLOT_LABEL, toText } from '@/lib/schema';
import { listAction, saveAction, deleteAction, reorderAction, setVisibleAction, logoutAction } from './actions';
import { input, btn, btnPrimary, iconBtn } from './ui';

const initVals = (schema, doc = {}) =>
    Object.fromEntries(
        schema.fields.map((f) => [
            f.name,
            f.type === 'bool' ? doc[f.name] ?? (f.name === 'visible' ? true : false) : f.type === 'strings' || f.type === 'pairs' ? toText(f, doc[f.name]) : doc[f.name] ?? '',
        ])
    );

const TTL = 5 * 60 * 1000;
const LONG = ['textarea', 'strings', 'pairs'];
const hint = 'text-xs font-normal normal-case tracking-normal text-tertiary/80';

function Field({ f, value, onChange, wide }) {
    if (f.type === 'bool')
        return (
            <label className="flex flex-col gap-1 sm:col-span-2">
                <span className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="size-4 accent-primary" checked={value} onChange={(e) => onChange(e.target.checked)} />
                    {f.label}
                </span>
                {f.help && <span className={hint}>{f.help}</span>}
            </label>
        );
    const common = { value, onChange: (e) => onChange(e.target.value), required: f.required, className: input };
    return (
        <label className={`flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide ${wide || LONG.includes(f.type) ? 'sm:col-span-2' : ''}`}>
            <span>
                {f.label}
                {f.required && (
                    <span className="text-accent" aria-hidden="true">
                        {' *'}
                    </span>
                )}
            </span>
            {LONG.includes(f.type) ? (
                <textarea rows={f.type === 'textarea' ? 4 : 5} {...common} className={input + ' normal-case tracking-normal font-normal'} />
            ) : f.type === 'enum' ? (
                <select {...common}>
                    <option value="">—</option>
                    {f.options.map((o) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={f.type === 'month' ? 'month' : f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                    {...common}
                    className={input + ' normal-case tracking-normal font-normal'}
                />
            )}
            {f.help && <span className={hint}>{f.help}</span>}
        </label>
    );
}

function DocForm({ schema, doc, onSave, onCancel }) {
    const [vals, setVals] = useState(() => initVals(schema, doc));
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setErr('');
        const r = await saveAction(schema.key, doc?.id, { ...vals, ...(doc?.position !== undefined && { position: doc.position }) });
        setBusy(false);
        r.error ? setErr(r.error) : onSave();
    };
    const set = (name) => (v) => setVals((s) => ({ ...s, [name]: v }));
    // Fields keep schema order; consecutive fields with the same group share a section.
    const sections = [];
    for (const f of schema.fields.filter((x) => !x.hidden)) {
        const last = sections[sections.length - 1];
        if (last && last.group === f.group) last.fields.push(f);
        else sections.push({ group: f.group, fields: [f] });
    }
    return (
        <form onSubmit={submit} className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                <div className="flex flex-col gap-6 max-w-3xl">
                    {sections.map((sec, i) => (
                        <fieldset key={sec.group || i} className="flex flex-col gap-3 min-w-0">
                            {sec.group && <legend className="tile-title mb-3">{sec.group}</legend>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                {sec.fields.map((f) => (
                                    <Field key={f.name} f={f} value={vals[f.name]} onChange={set(f.name)} wide={schema.single} />
                                ))}
                            </div>
                        </fieldset>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-tertiary/10">
                <button disabled={busy} className={btnPrimary}>
                    {busy ? 'Saving…' : 'Save'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className={btn}>
                        Cancel
                    </button>
                )}
                {err && (
                    <p role="alert" className="text-sm text-accent">
                        {err}
                    </p>
                )}
            </div>
        </form>
    );
}

// Where an item lands on the site, shown next to it so list order is never ambiguous.
function placement(tab, it, visibleIndex) {
    if (it.visible === false) return { label: 'Hidden', hidden: true };
    if (tab === 'projects') return { label: PROJECT_SLOTS[visibleIndex] ? SLOT_LABEL[PROJECT_SLOTS[visibleIndex]] : 'More projects', n: visibleIndex + 1 };
    return { n: visibleIndex + 1 };
}

const chips = (tab, it) => [tab === 'experience' && it.showOnHome && 'on home', it.status, it.kind].filter(Boolean);

export default function AdminApp() {
    const [tab, setTab] = useState('projects');
    const [items, setItems] = useState(null);
    const [editing, setEditing] = useState(null); // {doc?} ; doc undefined = new
    const [confirmId, setConfirmId] = useState(null);
    const [drag, setDrag] = useState({ from: null, over: null });
    const [err, setErr] = useState('');
    const [notice, setNotice] = useState('');
    const schema = { ...SCHEMAS[tab], key: tab };

    // Per-tab list cache. Only this panel writes (via server actions), so a tab switch can reuse the list;
    // saves and deletes force a refetch, reorder/visibility update the cache in place, and TTL + the
    // Refresh button cover edits made elsewhere.
    const cache = useRef({});
    const current = useRef(tab);
    current.current = tab;
    const put = (t, list) => {
        cache.current[t] = { items: list, at: Date.now() };
        if (current.current === t) setItems(list);
    };

    const load = useCallback(
        async (msg = '', force = false) => {
            setEditing(null);
            setConfirmId(null);
            setErr('');
            setNotice(msg);
            const hit = cache.current[tab];
            setItems(hit && !force ? hit.items : null);
            if (hit && !force && Date.now() - hit.at < TTL) return;
            try {
                put(tab, await listAction(tab));
            } catch (e) {
                if (current.current !== tab) return;
                setErr(e.message);
                setItems((hit && hit.items) || []);
            }
        },
        [tab]
    );
    useEffect(() => {
        load();
    }, [load]);
    useEffect(() => {
        // Quiet revalidate on return to the tab: never touches an open edit form.
        const onFocus = async () => {
            const t = current.current;
            const hit = cache.current[t];
            if (hit && Date.now() - hit.at < TTL) return;
            try {
                put(t, await listAction(t));
            } catch {}
        };
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, []);
    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(''), 4000);
        return () => clearTimeout(t);
    }, [notice]);

    const run = async (fn, msg) => {
        const r = await fn();
        r?.error ? setErr(r.error) : load(msg, true);
    };

    // Optimistic: update the list now, save in the background, reload only if the save failed.
    const move = async (from, to) => {
        if (from === to || to < 0 || to >= items.length) return;
        const next = [...items];
        next.splice(to, 0, next.splice(from, 1)[0]);
        put(tab, next);
        setNotice('');
        const r = await reorderAction(tab, next.map((x) => x.id));
        if (r.error) {
            setErr(r.error);
            load('', true);
        } else setNotice('Order saved');
    };
    const toggleVisible = async (it) => {
        put(tab, items.map((x) => (x.id === it.id ? { ...x, visible: it.visible === false } : x)));
        const r = await setVisibleAction(tab, it.id, it.visible === false);
        if (r.error) {
            setErr(r.error);
            load('', true);
        } else setNotice(it.visible === false ? 'Now visible on the site' : 'Hidden from the site');
    };
    const savedMsg = editing?.doc ? 'Saved' : schema.addAt === 'top' ? 'Added at the top of the list' : 'Added at the end of the list. Drag it where you want it.';

    const tabs = Object.entries(SCHEMAS);
    let visibleIndex = -1;
    return (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 select-text">
            <aside className="glass rounded-2xl p-3 flex lg:flex-col gap-1 lg:w-56 shrink-0 overflow-x-auto">
                <div role="tablist" aria-label="Content" className="flex lg:flex-col gap-1 flex-1">
                    {tabs.map(([k, s], i) => (
                        <div key={k} className="contents">
                            {(i === 0 || s.single !== tabs[i - 1][1].single) && (
                                <p className="hidden lg:block tile-title px-3 pt-2 pb-1">{s.single ? 'Text & links' : 'Lists'}</p>
                            )}
                            <button
                                role="tab"
                                aria-selected={k === tab}
                                onClick={() => setTab(k)}
                                className={`text-left whitespace-nowrap rounded-lg px-3 min-h-10 text-sm font-bold transition-colors ${k === tab ? 'bg-primary/20 text-accent' : 'hover:bg-tertiary/10'}`}
                            >
                                {s.label}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex lg:flex-col gap-1 lg:pt-3 lg:border-t border-tertiary/10">
                    <button onClick={() => logoutAction()} className={btn + ' justify-start'}>
                        <MdLogout aria-hidden="true" /> Log out
                    </button>
                </div>
            </aside>

            <section role="tabpanel" aria-label={schema.label} className="glass rounded-2xl p-5 flex-1 min-h-0 min-w-0 flex flex-col gap-4">
                <header className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 min-h-9">
                        <h1 className="text-xl font-bold text-primary">
                            {schema.label}
                            {editing && <span className="text-tertiary font-normal"> / {editing.doc ? editing.doc[schema.title] || 'Edit' : 'New'}</span>}
                        </h1>
                        {!schema.single && !editing && items && <span className="text-sm">{items.length}</span>}
                        <div role="status" className="ml-auto text-sm text-accent">
                            {notice}
                        </div>
                        <a href={schema.page} target="_blank" rel="noreferrer" className={btn}>
                            <MdOpenInNew aria-hidden="true" /> View on site
                        </a>
                        {!editing && (
                            <button onClick={() => load('', true)} aria-label="Refresh from database" title="Refresh from database" className={iconBtn}>
                                <MdRefresh />
                            </button>
                        )}
                        {!schema.single && !editing && (
                            <button onClick={() => setEditing({})} className={btnPrimary}>
                                <MdAdd aria-hidden="true" /> New
                            </button>
                        )}
                    </div>
                    {schema.desc && !editing && <p className="text-sm max-w-3xl">{schema.desc}</p>}
                </header>

                {err && !editing && !schema.single && (
                    <p role="alert" className="text-sm text-accent">
                        {err}
                    </p>
                )}

                {items === null ? (
                    <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading">
                        {[0, 1, 2].map((n) => (
                            <div key={n} className="h-14 rounded-xl bg-tertiary/10 animate-pulse" />
                        ))}
                    </div>
                ) : schema.single ? (
                    <DocForm key={tab} schema={schema} doc={items[0]} onSave={() => load('Saved', true)} />
                ) : editing ? (
                    <DocForm key={editing.doc?.id || 'new'} schema={schema} doc={editing.doc} onSave={() => load(savedMsg, true)} onCancel={() => setEditing(null)} />
                ) : items.length === 0 ? (
                    <p className="text-sm">Nothing here yet. Use New to add the first one.</p>
                ) : (
                    <ul className="flex flex-col gap-2 min-h-0 overflow-y-auto pr-1">
                        {items.map((it, i) => {
                            if (it.visible !== false) visibleIndex += 1;
                            const place = placement(tab, it, visibleIndex);
                            const name = it[schema.title] || it.id;
                            const sub = it.role || it.detail || it.description;
                            const over = drag.over === i && drag.from !== i;
                            return (
                                <li
                                    key={it.id}
                                    draggable
                                    onDragStart={() => setDrag({ from: i, over: i })}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        if (drag.over !== i) setDrag((d) => ({ ...d, over: i }));
                                    }}
                                    onDrop={() => {
                                        move(drag.from, i);
                                        setDrag({ from: null, over: null });
                                    }}
                                    onDragEnd={() => setDrag({ from: null, over: null })}
                                    className={`rounded-xl border bg-black/10 px-3 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 transition-colors ${
                                        over ? 'border-primary' : 'border-tertiary/10'
                                    } ${drag.from === i ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className="cursor-grab text-xl text-tertiary/70" title="Drag to reorder" aria-hidden="true">
                                            <MdDragIndicator />
                                        </span>
                                        <span className="w-6 text-sm text-tertiary/80 tabular-nums text-right shrink-0">{place.n ?? '–'}</span>
                                        <div className={`flex-1 min-w-0 ${place.hidden ? 'opacity-60' : ''}`}>
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="font-bold text-sm">{name}</span>
                                                {place.label && (
                                                    <span className={`text-[0.6875rem] leading-5 px-2 rounded-full border ${place.hidden ? 'border-tertiary/20' : 'border-primary/50 text-accent'}`}>
                                                        {place.label}
                                                    </span>
                                                )}
                                                {chips(tab, it).map((c) => (
                                                    <span key={c} className="text-[0.6875rem] leading-5 px-2 rounded-full border border-tertiary/20">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                            {sub && <p className="text-xs truncate">{sub}</p>}
                                        </div>
                                    </div>
                                    {confirmId === it.id ? (
                                        <div className="flex items-center gap-2" role="group" aria-label={`Confirm delete ${name}`}>
                                            <span className="text-sm text-accent">Delete?</span>
                                            <button onClick={() => run(() => deleteAction(tab, it.id), 'Deleted')} className={btnPrimary}>
                                                Delete
                                            </button>
                                            <button onClick={() => setConfirmId(null)} className={btn}>
                                                Keep
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5">
                                            <button aria-label={`Move ${name} up`} disabled={i === 0} onClick={() => move(i, i - 1)} className={iconBtn}>
                                                <MdArrowUpward />
                                            </button>
                                            <button aria-label={`Move ${name} down`} disabled={i === items.length - 1} onClick={() => move(i, i + 1)} className={iconBtn}>
                                                <MdArrowDownward />
                                            </button>
                                            {schema.fields.some((f) => f.name === 'visible') && (
                                                <button
                                                    aria-label={it.visible === false ? `Show ${name} on site` : `Hide ${name} from site`}
                                                    title={it.visible === false ? 'Hidden. Click to show' : 'Visible. Click to hide'}
                                                    onClick={() => toggleVisible(it)}
                                                    className={iconBtn}
                                                >
                                                    {it.visible === false ? <MdVisibilityOff /> : <MdVisibility />}
                                                </button>
                                            )}
                                            <button aria-label={`Edit ${name}`} onClick={() => setEditing({ doc: it })} className={iconBtn}>
                                                <MdEdit />
                                            </button>
                                            <button aria-label={`Delete ${name}`} onClick={() => setConfirmId(it.id)} className={iconBtn}>
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}
