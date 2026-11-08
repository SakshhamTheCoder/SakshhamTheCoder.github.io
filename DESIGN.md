# Design system

Dark red glass bento. Derived from the shipped code (`src/app/globals.css`, pages) on 2026-11-08. Replace by running `/impeccable document` after bigger changes.

## Color (tokens in `globals.css` `@theme`)
- `background` #130909, page gradient to `background-end` #191210.
- `tertiary` #c49d9d: all body text, borders (`/10`), tile fill (`/5`). Never below `/80` for text.
- `primary` #da0037: fills, icons, borders, large display type only (3.8:1 on bg).
- `accent` #ff3b5f: any small red text (4.9:1 on glass). Use for tile titles, links, status pills, errors, active nav.

## Type
- Fira Sans 400/700 (body, UI) plus the real 400 italic (`--font-fira-italic`, applied to `.italic` that is not `.font-serif`; do not rely on browser-faked italics). Newsreader italic (loaded in `layout.js`, mapped to `--font-serif`, so the same on every OS) for tile labels (`.tile-label`, 30px) and statements.
- Roles, each with one size: hero `clamp(2rem, 6.4vh, 3.75rem)` bold | serif label 30px (`.tile-label`) | serif statement 24px (focus quote, big project description, Music tile name) | project card title 30/20/16px by card size | name 14 to 16px bold | body 14 to 16px | meta 12px (dates, chips, pills, tooltips).
- Uppercase labels all use `tracking-[0.16em]` bold: `.tile-title` (12px, accent, one per tile), `.tile-subtitle` (12px, tertiary, a level below), nav links (14px).
- Secondary text is `tertiary` (full) or `tertiary/80`. No other opacities for text (`/60` is for dimmed icons only).
- Pills (filter chips, scope, tech): 12px regular, `px-2.5 py-0.5` to `px-3 py-1`, border tertiary/20. Never bold.
- Status is plain text with a primary dot (not clickable). The Live link is a filled primary button with an open-in-new icon (clickable). Never style one like the other.
- Text cut by a line clamp (project descriptions, "+N" technologies, archive rows) shows in full in a hover popover (mouse only).
- A list that scrolls inside a tile fades at the bottom only while more content is below.
- Icons: no text glyphs (no ★); use `react-icons`. Arrow on a tile label 26px, card arrows 20px (26px on the big card), social icons 24px, entry icons 20px.
- Colour and fill transitions 200ms (`--default-transition-duration`); movement 350ms with `--ease-out-expo`.

## Surfaces
- `.glass`: static tile (tertiary/5, 1px tertiary/10 border, backdrop blur). Radius `rounded-2xl`, padding `p-5` (hero and experience `p-6`, small icon tiles `p-4`).
- `.glass` also carries a 1px inner highlight on its top edge.
- `.glass-link`: add to tiles that are links or buttons. Hover lifts 2px, fills, lights the border (primary/40) and nudges `.link-arrow`. It does not scale, so text stays sharp. Link tiles are not text-selectable. Off under reduced motion.
- Text selection: allowed everywhere except link tiles, the hero card, the photo and filter chips.
- `.glass-navbar-popup`: modal only.
- Gap between tiles is always `gap-4`.

## Layout
- Scale: design size is 1440x808. From 1024px up, root font-size = `clamp(90%, min(1.1111vw, 1.9802vh), 160%)`, so every rem size (type, padding, gaps, icons) grows together on big screens and shrinks slightly on small laptops. Use rem for every size, never px. Content is capped at 112.5rem wide, centred.
- Shell (`BodyLayout`): at `fit` (>=1024px wide and >=47rem tall) the page is `h-dvh` and never scrolls. Tiles that can outgrow their space (About tiles, Projects grid, admin panels) scroll inside themselves. Below `fit` the page scrolls normally.
- Home: 12 columns. Row 1: three 4-column stacks (hero + About | photo + Resume/Projects + socials | Experience). Row 2: contribution chart (6) | latest release from the music site (2) | pull requests (4). A missing tile gives its width back; the Music tile is hidden when the music backend is unreachable.
- About: left column tiles grow in proportion to their entries (no stretched empty tiles); skills tile sets the height of the top row. Content must fit at the 1440x808 design size: check there first.
- Projects: filter chips (technologies shared by 2+ projects, "All" is the default) above the bento; filtering re-slots the matches into the same sizes. 1/2/3/4 columns at base/sm/lg/xl; no page title (sr-only h1).
- Admin: sidebar tabs + one panel; forms max 3xl wide, 2-column field grid, Save bar pinned under the scroll area.

## Contribution chart
Cells fill the tile (`grid-rows-7`, `aspect-square`). Levels: tertiary/15, primary/35, primary/60, primary, accent.

## Motion
One ease everywhere: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out-expo` in CSS, `ease` exported from `Transition.js`).
Page: 0.45s fade and 8px rise. Tiles: stagger entrance (spring, bounce 0.3). One focal moment: the hero headline lifts word by word out of a mask (`HeroTitle`).
Sliding pills (`layoutId`) mark the active nav link, the active filter chip and the pull request scope. Chart cells arrive as a left-to-right wave. The photo leans toward the pointer (fine pointers only).
`MotionConfig reducedMotion="user"`; particles hold still under reduced motion. The navbar sits outside the page transition. No custom cursor.
