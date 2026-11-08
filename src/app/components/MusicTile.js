import { MdArrowOutward } from 'react-icons/md';

// The latest release from the music site, as one tile. The whole tile links to that release there.
// The cover is plain <img>: it comes straight from Spotify's CDN and next/image would add nothing here.
export default function MusicTile({ release }) {
    return (
        <a
            href={`https://skshhm.vercel.app/releases?r=${release.id}`}
            target="_blank"
            rel="noreferrer"
            className="glass glass-link group rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-44 lg:min-h-0 lg:absolute lg:inset-0 p-4"
        >
            {release.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={release.cover}
                    alt=""
                    width="640"
                    height="640"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-background/10" />
            <div className="relative flex items-start justify-between gap-2">
                <span className="tile-title">Music</span>
                <MdArrowOutward size="1.375rem" className="link-arrow text-accent shrink-0" aria-hidden="true" />
            </div>
            <div className="relative min-w-0">
                <p className="font-serif italic text-2xl leading-tight text-tertiary line-clamp-2">{release.name}</p>
                <p className="text-xs tabular-nums text-tertiary/80">
                    Latest {release.kind.toLowerCase()}
                    {release.year && ` · ${release.year}`}
                </p>
            </div>
        </a>
    );
}
