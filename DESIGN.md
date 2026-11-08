# Design system

Dark red glass bento. Derived from the shipped code (`src/app/globals.css`, pages) on 2026-11-08. Replace by running `/impeccable document` after bigger changes.

## Color (tokens in `globals.css` `@theme`)
- `background` #130909, page gradient to `background-end` #191210.
- `tertiary` #c49d9d: all body text, borders (`/10`), tile fill (`/5`). Never below `/80` for text.
- `primary` #da0037: fills, icons, borders, large display type only (3.8:1 on bg).
- `accent` #ff3b5f: any small red text (4.9:1 on glass). Use for tile titles, links, status pills, errors, active nav.

## Type
- Fira Sans 400/500/700 (body, UI). Platform serif (Tailwind default `ui-serif` stack) italic for tile labels (`.tile-label`, 30px).
- `.tile-title`: 12px bold uppercase tracked accent. One per tile.
- Hero: `clamp(2rem, 6.4vh, 3.75rem)` bold, primary and tertiary.

## Surfaces
- `.glass`: static tile (tertiary/5, 1px tertiary/10 border, backdrop blur). Radius `rounded-2xl`, padding `p-5` (hero and experience `p-6`, small icon tiles `p-4`).
- `.glass-link`: add to tiles that are links or buttons. Adds hover fill and 1.02 scale; off under reduced motion.
- `.glass-navbar-popup`: modal only.
- Gap between tiles is always `gap-4`.

## Layout
- Shell (`BodyLayout`): at `fit` (>=1024px wide and >=47rem tall) the page is `h-dvh` and never scrolls. Tiles that can outgrow their space (About tiles, Projects grid, admin panels) scroll inside themselves. Below `fit` the page scrolls normally.
- Home: 3 columns. Row 1: hero + About | photo + Resume/Projects | Experience. Row 2: contribution chart (2 columns) + socials grid.
- About: Profile | Skills (2 cols), then Experience (2 cols) | Achievements.
- Projects: 1/2/3/4 columns at base/sm/lg/xl; no page title (sr-only h1).
- Admin: sidebar tabs + one panel; forms max 3xl wide, 2-column field grid, Save bar pinned under the scroll area.

## Contribution chart
Cells fill the tile (`grid-rows-7`, `aspect-square`). Levels: tertiary/15, primary/35, primary/60, primary, accent.

## Motion
Stagger entrance (spring, bounce 0.3). `MotionConfig reducedMotion="user"`. The navbar sits outside the page transition.
