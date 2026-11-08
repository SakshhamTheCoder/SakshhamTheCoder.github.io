'use client';
import { useCallback, useEffect, useState } from 'react';
import { SCHEMAS, toText } from '@/lib/schema';
import { listAction, saveAction, deleteAction, moveAction, logoutAction } from './actions';
import { input, btn, btnPrimary } from './ui';

const initVals = (schema, doc = {}) =>
    Object.fromEntries(
        schema.fields.map((f) => [
            f.name,
            f.type === 'bool' ? doc[f.name] ?? (f.name === 'visible' ? true : false) : f.type === 'strings' || f.type === 'pairs' ? toText(f, doc[f.name]) : doc[f.name] ?? '',
        ])
    );

function Field({ f, value, onChange }) {
    if (f.type === 'bool')
        return (
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
                {f.label}
            </label>
        );
    const common = { value, onChange: (e) => onChange(e.target.value), className: input };
    return (
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wide">
            {f.label}
            {f.type === 'textarea' || f.type === 'strings' || f.type === 'pairs' ? (
                <textarea rows={f.type === 'textarea' ? 4 : 5} {...common} className={input + ' normal-case tracking-normal'} />
            ) : f.type === 'enum' ? (
                <select {...common}>
                    <option value="">—</option>
                    {f.options.map((o) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
            ) : (
                <input type={f.type === 'month' ? 'month' : f.type === 'number' ? 'number' : 'text'} {...common} className={input + ' normal-case tracking-normal'} />
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
    return (
        <form onSubmit={submit} className="glass-navbar rounded-2xl p-5 flex flex-col gap-3">
            {schema.fields
                .filter((f) => !f.hidden)
                .map((f) => (
                    <Field key={f.name} f={f} value={vals[f.name]} onChange={(v) => setVals((s) => ({ ...s, [f.name]: v }))} />
                ))}
            {err && <p className="text-sm text-primary">{err}</p>}
            <div className="flex gap-2">
                <button disabled={busy} className={btnPrimary}>
                    {busy ? 'Saving…' : 'Save'}
                </button>
                {!schema.single && (
                    <button type="button" onClick={onCancel} className={btn}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default function AdminApp() {
    const [tab, setTab] = useState('projects');
    const [items, setItems] = useState(null);
    const [editing, setEditing] = useState(null); // {doc?} ; doc undefined = new
    const [err, setErr] = useState('');
    const schema = { ...SCHEMAS[tab], key: tab };

    const load = useCallback(async () => {
        setItems(null);
        setEditing(null);
        try {
            setItems(await listAction(tab));
        } catch (e) {
            setErr(e.message);
            setItems([]);
        }
    }, [tab]);
    useEffect(() => {
        load();
    }, [load]);

    const act = async (fn) => {
        const r = await fn();
        r?.error ? setErr(r.error) : load();
    };

    return (
        <div className="flex flex-col gap-4 select-text">
            <div className="glass-navbar rounded-2xl p-4 flex flex-wrap items-center gap-2">
                {Object.entries(SCHEMAS).map(([k, s]) => (
                    <button key={k} onClick={() => setTab(k)} className={`${btn} ${k === tab ? 'border-primary text-primary' : ''}`}>
                        {s.label}
                    </button>
                ))}
                <button onClick={() => logoutAction()} className={btn + ' ml-auto'}>
                    Log out
                </button>
            </div>
            {err && <p className="text-sm text-primary">{err}</p>}
            {items === null ? (
                <p className="text-sm">Loading…</p>
            ) : schema.single ? (
                <DocForm key={tab} schema={schema} doc={items[0]} onSave={load} />
            ) : editing ? (
                <DocForm key={editing.doc?.id || 'new'} schema={schema} doc={editing.doc} onSave={load} onCancel={() => setEditing(null)} />
            ) : (
                <div className="flex flex-col gap-2">
                    <button onClick={() => setEditing({})} className={btnPrimary + ' self-start'}>
                        + New
                    </button>
                    {items.map((it, i) => (
                        <div key={it.id} className="glass-navbar rounded-xl px-4 py-2 flex items-center gap-2">
                            <span className={`flex-1 text-sm ${it.visible === false ? 'opacity-50' : ''}`}>
                                {it[schema.title] || it.id}
                                {it.visible === false && ' (hidden)'}
                            </span>
                            <button disabled={i === 0} onClick={() => act(() => moveAction(tab, it.id, 'up'))} className={btn}>
                                ↑
                            </button>
                            <button disabled={i === items.length - 1} onClick={() => act(() => moveAction(tab, it.id, 'down'))} className={btn}>
                                ↓
                            </button>
                            <button onClick={() => setEditing({ doc: it })} className={btn}>
                                Edit
                            </button>
                            <button
                                onClick={() => confirm(`Delete ${it[schema.title] || it.id}?`) && act(() => deleteAction(tab, it.id))}
                                className={btn}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
