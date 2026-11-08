import { cacheLife } from 'next/cache';

const headers = () => ({
    accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN && { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
});

async function fetchStars(repos) {
    'use cache';
    cacheLife({ stale: 3600, revalidate: 21600, expire: 86400 });
    const out = {};
    await Promise.all(
        repos.map(async (r) => {
            const res = await fetch(`https://api.github.com/repos/${r}`, { headers: headers(), signal: AbortSignal.timeout(5000) });
            if (!res.ok) throw new Error(`stars ${r} ${res.status}`);
            out[r] = (await res.json()).stargazers_count;
        })
    );
    return out;
}

// Live stars for owner/name repos; {} on failure so callers fall back to stored numbers.
export async function getStars(repos) {
    if (!repos.length) return {};
    try {
        return await fetchStars([...new Set(repos)].sort());
    } catch {
        return {};
    }
}

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`;

async function fetchCalendar() {
    'use cache';
    cacheLife({ stale: 3600, revalidate: 14400, expire: 86400 });
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { ...headers(), 'content-type': 'application/json' },
        body: JSON.stringify({ query: QUERY, variables: { login: 'SakshhamTheCoder' } }),
        signal: AbortSignal.timeout(5000),
    });
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!res.ok || !cal) throw new Error('calendar fetch failed');
    return cal;
}

// null when no token or API failure: the chart tile is then hidden.
export async function getContributions() {
    if (!process.env.GITHUB_TOKEN) return null;
    try {
        return await fetchCalendar();
    } catch {
        return null;
    }
}

// What counts as "mine" (hidden from the default Pull requests view): everything under my account, plus
// repos I own that live in a friend's org. Matching adbt by repo, not by org, keeps PRs to the org's other
// projects visible as contributions to other people.
// shortcut: hard-coded lists, move into admin if they change often.
export const SELF_OWNERS = ['sakshhamthecoder'];
export const SELF_REPOS = ['ergane-foundation/adbt'];

const PR_QUERY = `query($login:String!){user(login:$login){pullRequests(first:100,orderBy:{field:CREATED_AT,direction:DESC}){nodes{title url number state createdAt repository{nameWithOwner isPrivate owner{login}}}}}}`;

async function fetchPullRequests() {
    'use cache';
    cacheLife({ stale: 3600, revalidate: 14400, expire: 86400 });
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { ...headers(), 'content-type': 'application/json' },
        body: JSON.stringify({ query: PR_QUERY, variables: { login: 'SakshhamTheCoder' } }),
        signal: AbortSignal.timeout(5000),
    });
    const json = await res.json();
    const nodes = json?.data?.user?.pullRequests?.nodes;
    if (!res.ok || !nodes) throw new Error('pull requests fetch failed');
    // Private repos are dropped here, before anything reaches a page payload.
    return nodes
        .filter((n) => !n.repository.isPrivate)
        .map((n) => ({
            title: n.title.split('\n')[0].slice(0, 140),
            url: n.url,
            number: n.number,
            state: n.state, // OPEN | CLOSED | MERGED
            createdAt: n.createdAt,
            repo: n.repository.nameWithOwner,
            external:
                !SELF_OWNERS.includes(n.repository.owner.login.toLowerCase()) &&
                !SELF_REPOS.includes(n.repository.nameWithOwner.toLowerCase()),
        }));
}

// [] when no token or API failure: the tab is then hidden.
export async function getPullRequests() {
    if (!process.env.GITHUB_TOKEN) return [];
    try {
        return await fetchPullRequests();
    } catch {
        return [];
    }
}
