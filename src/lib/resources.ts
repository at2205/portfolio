// Registry for the /resources page. Each entry maps to a real, self-contained
// file in src/resources/ — the page reads that file at build time, so the
// "Copy the component" button always copies the exact code running on the card.

export type Kind = "Interaction" | "Motion" | "Surface";

export type Resource = {
  slug: string;
  file: string; // file name inside src/resources/
  kind: Kind;
  readMin: number;
  title: string;
  blurb: string;
  tags: string[];
  traps: string[];
  prompt: string;
};

export const resources: Resource[] = [
  {
    slug: "hero-section",
    file: "HeroSection.tsx",
    kind: "Surface",
    readMin: 5,
    title: "Hero section",
    blurb:
      "A name split to both margins with the portrait set between, and a colour copy of the portrait uncovered by the pointer — drifting on its own where there is no pointer.",
    tags: ["Pointer mask", "Layout", "Letter rise"],
    traps: [
      "A mask is positioned against its own element. Make both image layers fill the section, or the spotlight lands in the wrong place.",
      "mix-blend-mode: difference on the name keeps it readable over light and dark parts of the photo — but only if the name sits above the image in the stacking order.",
      "Touch has no hover. Without the idle drift the colour layer is simply never seen on a phone.",
    ],
    prompt:
      "Build a full-viewport hero: the first name pinned to the left margin and the last name to the right, in a condensed variable display font, with a portrait centred between them. Stack two copies of the portrait — a dark greyscale base and a full-colour copy masked by a radial-gradient that follows the pointer (lerped in requestAnimationFrame, written to CSS variables, never React state). When there is no pointer, drift the mask along a slow sine path. Letters rise from a blur with staggered delays.",
  },
  {
    slug: "header-mega-menu",
    file: "HeaderMegaMenu.tsx",
    kind: "Interaction",
    readMin: 4,
    title: "Header and mega menu",
    blurb:
      "A bar that rides tall in the hero and pins smaller on scroll, opening a grouped panel the page still shows around — with the letters rolling one after another.",
    tags: ["Sticky", "Letter roll", "Clip-path"],
    traps: [
      "Animate the panel with clip-path, not height. Height forces layout on every frame and the contents reflow as it opens.",
      "visibility must switch after the clip finishes closing — give it a delayed transition or links stay focusable while hidden.",
      "Roll each letter with its own delay, but stack two copies of the glyph inside an overflow-hidden box. One copy leaves a gap mid-roll.",
    ],
    prompt:
      "Build a fixed site header with brand, a Menu toggle and a CTA. At scroll 0 the bar is tall and transparent; after 24px it shrinks and gains a blurred background. The toggle opens a panel at 80% of the viewport height with grouped links and a feature card, revealed with an animated clip-path. Every link label is split into letters, each a two-line overflow-hidden box, and rolls on hover with a 24ms stagger. Close on Escape and outside click.",
  },
  {
    slug: "rotary-card-deck",
    file: "RotaryCardDeck.tsx",
    kind: "Motion",
    readMin: 4,
    title: "Rotary card deck",
    blurb:
      "Cards on an arc, one upright in front and the rest tilting away. Placement and tilt are kept separate so the spread and the lean can be tuned independently.",
    tags: ["CSS sin/cos", "Transforms", "Drag"],
    traps: [
      "Put the arc in CSS with sin() and cos() driven by one custom property per card. JS only owns a single position number.",
      "Turn the transition off while dragging and back on at release, or the cards lag behind the finger.",
      "A drag ends in a click. Swallow it if the pointer moved more than a few pixels or every swipe opens a link.",
    ],
    prompt:
      "Build a carousel where cards sit on a circular arc. Each card gets a unitless --d (its distance from the active card, fractional while dragging). Position with translate(calc(sin(var(--d)*var(--spread))*var(--r)), calc((1 - cos(var(--d)*var(--spread)))*var(--r)*.55)) and lean with rotate(calc(var(--d)*var(--tilt))). Support drag with pointer capture, arrow keys, buttons, and snap to the nearest card on release.",
  },
  {
    slug: "depth-stack",
    file: "DepthStack.tsx",
    kind: "Motion",
    readMin: 4,
    title: "Depth stack",
    blurb:
      "A deck seen almost edge-on, each card smaller and turned further than the last. A table of measured numbers, and a flick that moves one card however hard you throw it.",
    tags: ["Transforms", "Pointer events", "Flick"],
    traps: [
      "Keep the placement in a small table indexed by depth. Tuning four rows of numbers beats tuning four formulas.",
      "Decide the direction from the dominant axis of the gesture, and ignore its magnitude — that is what makes it one card per flick.",
      "perspective-origin at the top of the stage is what makes the deck read as seen from above.",
    ],
    prompt:
      "Build a stack of cards in 3D, viewed almost edge-on from above. Define a ROWS table of {y, scale, rotateX, opacity} per depth. Cards behind the front one use rows 1..4; the card that was in front slides away and fades. A pointer flick (distance > 28px or speed > 0.45px/ms) moves exactly one card — up/left is next, down/right is previous. Clicking a card behind brings it forward.",
  },
  {
    slug: "side-drawer",
    file: "SideDrawer.tsx",
    kind: "Interaction",
    readMin: 5,
    title: "Side drawer",
    blurb:
      "A panel that arrives tilted and straightens, carrying a page of content without taking the reader off the page they were on.",
    tags: ["Dialog", "Focus", "Scroll lock"],
    traps: [
      "Locking scroll removes the scrollbar and the page jumps sideways. Measure the gap first and pad the body by it.",
      "Mount, wait two frames, then add the open state — otherwise the entry transition never plays.",
      "Restore focus to whatever opened the drawer, not to the body. Keyboard users lose their place otherwise.",
    ],
    prompt:
      "Build a modal side drawer. Closed, it sits translateX(108%) rotateY(-22deg) with transform-origin on its right edge inside a perspective parent; open, the transform is none. Mount first, show two animation frames later, unmount after the exit transition. Trap Tab inside, close on Escape and scrim click, lock body scroll while compensating for the scrollbar width, and restore focus to the opener on close.",
  },
  {
    slug: "rolling-label",
    file: "RollingLabel.tsx",
    kind: "Motion",
    readMin: 3,
    title: "Rolling label",
    blurb:
      "A button whose word turns over on hover. Three copies on a wheel — and the one number you cannot copy from somebody else's implementation.",
    tags: ["Grid stacking", "translateZ", "3D wheel"],
    traps: [
      "The wheel radius is lineHeight ÷ (2 × tan(180° ÷ faces)). For three faces that is 0.2887 × the line height. Eyeballed values leave the faces visibly apart.",
      "Faces are absolutely positioned, so the button has no width. Keep an invisible copy of the label in flow to size it.",
      "Always add to the rotation, never reset it. Resetting to 0 spins the wheel backwards.",
    ],
    prompt:
      "Build a pill button whose label rolls like a drum on hover. Three absolutely-positioned faces at rotateX(0/120/240deg), each pushed out by translateZ(lineHeight × 0.2887). Rotate the wheel by an extra -120deg on every mouseenter and mouseleave so it always turns the same way. Size the button with a hidden in-flow copy of the text and use backface-visibility: hidden.",
  },
  {
    slug: "cursor-pill",
    file: "CursorPill.tsx",
    kind: "Interaction",
    readMin: 4,
    title: "Cursor pill",
    blurb:
      "A drawn cursor that opens into a labelled pill over anything that says what it does, with the label read off the element rather than written in.",
    tags: ["Pointer events", "Refs over state", "a11y"],
    traps: [
      "Never put the cursor position in React state. Write the transform from a requestAnimationFrame loop through a ref.",
      "Hide the system cursor only when (hover: hover) and (pointer: fine) match, and bring it back over inputs — a text caret you cannot see is a bug.",
      "Read the label from data-cursor, then aria-label, then title. Falling back to text content only when it is short stops a 200-character card from becoming the label.",
    ],
    prompt:
      "Build a custom cursor: a 12px dot that eases toward the pointer (lerp 0.22 in rAF, transform written via a ref). On pointerover, find the closest [data-cursor], a, button or [role=button]; read its label from data-cursor, aria-label, title, or short text. Grow the dot into a pill showing that label. Show a thin caret over inputs. Shrink slightly on pointerdown. Disable entirely on touch.",
  },
  {
    slug: "scroll-revealed-rows",
    file: "ScrollRows.tsx",
    kind: "Interaction",
    readMin: 5,
    title: "Scroll-revealed rows",
    blurb:
      "A list that opens on hover to show an image behind its type — and opens itself as you scroll where there is no hover to use.",
    tags: ["Height transitions", "Breakpoint gating", "IntersectionObserver"],
    traps: [
      "Animate grid-template-rows from 0fr to 1fr. It is the one height transition that needs no measuring — but the child needs overflow hidden and min-height 0.",
      "Gate by (hover: hover), not by screen width. A tablet with a mouse and a laptop with a touchscreen both exist.",
      "A negative rootMargin of -42% top and bottom makes the observer fire only for the row crossing the middle of the screen.",
    ],
    prompt:
      "Build a list of large uppercase rows. On devices with hover, a row opens on pointer enter: a background image fades in behind the text and a body panel expands using grid-template-rows 0fr → 1fr. On devices without hover, use an IntersectionObserver with rootMargin '-42% 0px -42% 0px' so the row crossing the middle of the viewport opens itself. Keyboard focus also opens a row.",
  },
  {
    slug: "dashed-ring",
    file: "DashedRing.tsx",
    kind: "Surface",
    readMin: 3,
    title: "Dashed ring",
    blurb:
      "The ticked circle behind a title, drawn with a conic gradient and a mask. No asset, scales with the viewport, and one keyword decides whether it exists at all.",
    tags: ["Conic gradient", "Masking", "No asset"],
    traps: [
      "repeating-conic-gradient draws the ticks; a radial-gradient mask with a one-pixel hard stop cuts out the middle. Anything softer smears the ring.",
      "Size it with min(vw, px) and aspect-ratio: 1. Using height as well breaks on short screens.",
      "Make the whole ring a single keyword prop. Rendering nothing is the only reliable way to turn a decoration off.",
    ],
    prompt:
      "Build a decorative ring of tick marks behind a heading. Use repeating-conic-gradient(accent 0 .9deg, transparent .9deg calc(360deg / N)) on a circle, then mask it with radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px)) so only a thin ring remains. Size with min(88vw, 720px) and aspect-ratio 1, rotate slowly, and accept ring='dashed' | 'none'.",
  },
];

export const kinds: Kind[] = ["Interaction", "Motion", "Surface"];
