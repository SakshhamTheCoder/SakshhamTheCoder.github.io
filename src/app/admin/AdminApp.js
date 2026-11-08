'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdArrowUpward, MdArrowDownward, MdEdit, MdDeleteOutline, MdAdd, MdLogout, MdOpenInNew, MdRefresh } from 'react-icons/md';
import { SCHEMAS, toText } from '@/lib/schema';
import { listAction, saveAction, deleteAction, moveAction, logoutAction } from './actions';
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

function Field({ f, value, onChange, wide }) {
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
    const fields = schema.fields.filter((f) => !f.hidden);
    const set = (name) => (v) => setVals((s) => ({ ...s, [name]: v }));
    return (
        <form onSubmit={submit} className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 max-w-3xl">
                    {fields
                        .filter((f) => f.type !== 'bool')
                        .map((f) => (
                            <Field key={f.name} f={f} value={vals[f.name]} onChange={set(f.name)} wide={schema.single} />
                        ))}
                    {fields.some((f) => f.type === 'bool') && (
                        <fieldset className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-2">
                            <legend className="sr-only">Options</legend>
                            {fields
                                .filter((f) => f.type === 'bool')
                                .map((f) => (
                                    <label key={f.name} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            className="size-4 accent-primary"
                                            checked={vals[f.name]}
                                            onChange={(e) => set(f.name)(e.target.checked)}
                                        />
                                        {f.label}
                                    </label>
                                ))}
                        </fieldset>
                    )}
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

const chips = (it) =>
    [it.visible === false && 'hidden', it.featured && 'featured', it.showOnHome && 'on home', it.status, it.kind].filter(Boolean);

export default function AdminApp() {
    const [tab, setTab] = useState('projects');
    const [items, setItems] = useState(null);
    const [editing, setEditing] = useState(null); // {doc?} ; doc undefined = new
    const [confirmId, setConfirmId] = useState(null);
    const [err, setErr] = useState('');
    const [notice, setNotice] = useState('');
    const schema = { ...SCHEMAS[tab], key: tab };

    // Per-tab list cache. Only this panel writes (via server actions), so a tab switch can reuse the list;
    // every save/delete/move forces a refetch, and TTL + the Refresh button cover edits made elsewhere.
    const cache = useRef({});
    const current = useRef(tab);
    current.current = tab;

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
                const fresh = await listAction(tab);
                cache.current[tab] = { items: fresh, at: Date.now() };
                if (current.current === tab) setItems(fresh);
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
                const fresh = await listAction(t);
                cache.current[t] = { items: fresh, at: Date.now() };
                if (current.current === t) setItems(fresh);
            } catch {}
        };
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, []);
    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(''), 3000);
        return () => clearTimeout(t);
    }, [notice]);

    const act = async (fn, msg) => {
        const r = await fn();
        r?.error ? setErr(r.error) : load(msg, true);
    };

    const tabs = Object.entries(SCHEMAS);
    return (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 select-text">
            <aside className="glass rounded-2xl p-3 flex lg:flex-col gap-1 lg:w-56 shrink-0 overflow-x-auto">
                <div role="tablist" aria-label="Content" className="flex lg:flex-col gap-1 flex-1">
                    {tabs.map(([k, s], i) => (
                        <button
                            key={k}
                            role="tab"
                            aria-selected={k === tab}
                            onClick={() => setTab(k)}
                            className={`text-left whitespace-nowrap rounded-lg px-3 min-h-10 text-sm font-bold transition-colors ${
                                k === tab ? 'bg-primary/20 text-accent' : 'hover:bg-tertiary/10'
                            } ${s.single && !tabs[i - 1]?.[1].single ? 'lg:mt-3' : ''}`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className="flex lg:flex-col gap-1 lg:pt-3 lg:border-t border-tertiary/10">
                    <a href="/" target="_blank" rel="noreferrer" className={btn + ' justify-start'}>
                        <MdOpenInNew aria-hidden="true" /> View site
                    </a>
                    <button onClick={() => logoutAction()} className={btn + ' justify-start'}>
                        <MdLogout aria-hidden="true" /> Log out
                    </button>
                </div>
            </aside>

            <section role="tabpanel" aria-label={schema.label} className="glass rounded-2xl p-5 flex-1 min-h-0 min-w-0 flex flex-col gap-4">
                <header className="flex items-center gap-3 min-h-9">
                    <h1 className="text-xl font-bold text-primary">
                        {schema.label}
                        {editing && <span className="text-tertiary font-normal"> / {editing.doc ? editing.doc[schema.title] || 'Edit' : 'New'}</span>}
                    </h1>
                    {!schema.single && !editing && items && <span className="text-sm">{items.length}</span>}
                    <div role="status" className="ml-auto text-sm text-accent">
                        {notice}
                    </div>
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
                    <DocForm
                        key={editing.doc?.id || 'new'}
                        schema={schema}
                        doc={editing.doc}
                        onSave={() => load('Saved', true)}
                        onCancel={() => setEditing(null)}
                    />
                ) : items.length === 0 ? (
                    <p className="text-sm">Nothing here yet. Use New to add the first one.</p>
                ) : (
                    <ul className="flex flex-col gap-2 min-h-0 overflow-y-auto">
                        {items.map((it, i) => {
                            const name = it[schema.title] || it.id;
                            const sub = it.role || it.detail || it.description;
                            return (
                                <li key={it.id} className="rounded-xl border border-tertiary/10 bg-black/10 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <div className={`flex-1 min-w-0 ${it.visible === false ? 'opacity-60' : ''}`}>
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="font-bold text-sm">{name}</span>
                                            {chips(it).map((c) => (
                                                <span key={c} className="text-[11px] leading-5 px-2 rounded-full border border-tertiary/20">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                        {sub && <p className="text-xs truncate">{sub}</p>}
                                    </div>
                                    {confirmId === it.id ? (
                                        <div className="flex items-center gap-2" role="group" aria-label={`Confirm delete ${name}`}>
                                            <span className="text-sm text-accent">Delete?</span>
                                            <button onClick={() => act(() => deleteAction(tab, it.id), 'Deleted')} className={btnPrimary}>
                                                Delete
                                            </button>
                                            <button onClick={() => setConfirmId(null)} className={btn}>
                                                Keep
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5">
                                            <button aria-label={`Move ${name} up`} disabled={i === 0} onClick={() => act(() => moveAction(tab, it.id, 'up'))} className={iconBtn}>
                                                <MdArrowUpward />
                                            </button>
                                            <button
                                                aria-label={`Move ${name} down`}
                                                disabled={i === items.length - 1}
                                                onClick={() => act(() => moveAction(tab, it.id, 'down'))}
                                                className={iconBtn}
                                            >
                                                <MdArrowDownward />
                                            </button>
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
