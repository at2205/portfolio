// Registry for the /components shelf. Each entry is a real self-contained file in src/shelf/.
export type ShelfKind =
  | "Text & type" | "Buttons & inputs" | "Cards & layout" | "Loaders & feedback"
  | "Marketing blocks" | "Data display" | "Navigation" | "AI interfaces" | "Forms"
  | "Media" | "3D objects" | "3D effects" | "Shader backgrounds";

export const shelfKinds: ShelfKind[] = [
  "Text & type", "Buttons & inputs", "Cards & layout", "Loaders & feedback",
  "Marketing blocks", "Data display", "Navigation", "AI interfaces", "Forms",
  "Media", "3D objects", "3D effects", "Shader backgrounds",
];

export type Helper = "_gl" | "_three";
export type ShelfItem = { file: string; title: string; kind: ShelfKind; blurb: string; helper?: Helper };

const s = (file: string, title: string, kind: ShelfKind, blurb: string, helper?: Helper): ShelfItem => ({ file, title, kind, blurb, helper });

export const shelf: ShelfItem[] = [
  s("SheenHeadline", "Sheen headline", "Text & type", "A metallic headline with a band of light that follows the pointer and sweeps on its own when idle."),
  s("DecodeText", "Decode text", "Text & type", "Text that resolves out of cycling glyphs, left to right. Hover to decode again."),
  s("VelocityMarquee", "Velocity marquee", "Text & type", "An endless marquee that listens to the page: scrolling speeds it up, leans it and flips its direction."),
  s("BlurRevealHeadline", "Blur reveal headline", "Text & type", "A headline that rises out of a blur, line by line and then letter by letter."),
  s("MaskedLineReveal", "Masked line reveal", "Text & type", "Lines of type that climb out from behind their own mask as they enter view."),
  s("SpringOdometer", "Spring odometer", "Text & type", "Digits that roll to a new number, each column trailing the last and overshooting slightly."),
  s("WeightHover", "Weight hover", "Text & type", "Variable-weight type that thickens under the pointer and thins behind it."),
  s("HumanisedTypewriter", "Humanised typewriter", "Text & type", "Typing with an uneven rhythm, longer pauses on punctuation and the occasional typo."),

  s("MagneticButton", "Magnetic button", "Buttons & inputs", "A button that leans toward the cursor; the label drifts further, and a colour flood pours in from the entry point."),
  s("SpringToggle", "Spring toggle", "Buttons & inputs", "A switch whose thumb overshoots, stretches in travel and squashes as it lands."),
  s("ShimmerBorder", "Shimmer border", "Buttons & inputs", "A point of light travelling the border of a button, leaving a short conic trail."),
  s("SplitFlapButton", "Split-flap button", "Buttons & inputs", "A label that changes like a departures board, each character flipping through the alphabet."),
  s("SpringSlider", "Spring slider", "Buttons & inputs", "A range slider with a value bubble that stretches as it moves and settles when it stops."),
  s("CommandPalette", "Command palette", "Buttons & inputs", "A ⌘K palette with fuzzy matching, grouped results, keyboard navigation and a scrim."),
  s("LiquidGlassPill", "Liquid glass pill", "Buttons & inputs", "A frosted pill with backdrop blur and a specular highlight that tracks the pointer."),
  s("OtpInput", "OTP input", "Buttons & inputs", "Six boxes with auto-advance, backspace-to-previous, arrow keys and paste support."),

  s("BentoGrid", "Bento grid", "Cards & layout", "Tiles that lift and re-light under the pointer, re-flowing at each breakpoint."),
  s("FaqAccordion", "FAQ accordion", "Cards & layout", "An accordion that animates its own height properly, one panel open at a time."),
  s("TiltCard", "Tilt card", "Cards & layout", "A card that tilts toward the pointer in 3D, with a specular highlight across its face."),
  s("CompareSlider", "Compare slider", "Cards & layout", "A before/after reveal on one handle, by drag, touch or arrow keys."),
  s("PricingToggle", "Pricing toggle", "Cards & layout", "A sliding pill between monthly and yearly, with the price rolling to its new value."),

  s("SkeletonShimmer", "Skeleton shimmer", "Loaders & feedback", "Placeholder blocks with a travelling highlight, cross-fading to content without a layout jump."),
  s("ToastStack", "Toast stack", "Loaders & feedback", "Toasts that stack into a pile and expand on hover, each dismissible and self-timing."),
  s("SpringTooltip", "Spring tooltip", "Loaders & feedback", "A tooltip that springs out of its trigger and flips side when it would leave the viewport."),
  s("InkPreloader", "Ink preloader", "Loaders & feedback", "A preloader that draws its mark as a stroke, fills it, then lifts the whole screen away."),

  s("SpotlightGrid", "Spotlight grid", "Marketing blocks", "Cards lit by one spotlight that follows the pointer across the group, glowing the nearest border."),
  s("CtaBanner", "CTA banner", "Marketing blocks", "A call-to-action band over a slow animated gradient, with a button that lights as it passes."),
  s("LogoCloud", "Logo cloud", "Marketing blocks", "A grid of marks that settle in on scroll and lift individually under the pointer."),
  s("NewsletterSignup", "Newsletter signup", "Marketing blocks", "An inline form with idle, sending and done states and a button that morphs between them."),

  s("KpiTicker", "KPI ticker", "Data display", "Figures that tick to new values, each with its own direction and a sparkline that redraws."),
  s("ProgressRings", "Progress rings", "Data display", "Concentric rings that fill with an overshoot, each with a gradient and a counting figure."),
  s("ActivityHeatmap", "Activity heatmap", "Data display", "A contribution-style grid in four intensity steps with a readout on hover."),

  s("TabIndicator", "Tab indicator", "Navigation", "Tabs whose pill slides and stretches between them, measured from real offsets."),
  s("MagnifyingDock", "Magnifying dock", "Navigation", "Icons that scale with their distance from the pointer, with a smooth falloff."),
  s("CapsuleNav", "Capsule nav", "Navigation", "A floating pill that collapses to the current page and expands to the full set."),

  s("AgentSteps", "Agent steps", "AI interfaces", "Agent steps that stream in, expand to show their tool call and collapse on success; failures stay open."),
  s("PromptChips", "Prompt chips", "AI interfaces", "Suggested prompts as chips that scroll sideways and drop their text into the field."),
  s("ThinkingText", "Thinking text", "AI interfaces", "A thinking label with a travelling shimmer and rotating verbs."),
  s("StreamingMessage", "Streaming message", "AI interfaces", "Tokens that arrive in uneven bursts behind a caret, the way a model streams."),
  s("ChatComposer", "Chat composer", "AI interfaces", "A composer that grows with its content, sends on Enter and keeps the send button on the last line."),

  s("FloatInput", "Float input", "Forms", "A label that floats on focus or when filled, with a line that draws under the field."),
  s("SegmentedControl", "Segmented control", "Forms", "Equal segments with a sliding thumb, built on a real radio group."),
  s("PasswordMeter", "Password meter", "Forms", "Four-segment strength meter with a show/hide toggle and one concrete hint."),

  s("AccordionGallery", "Accordion gallery", "Cards & layout", "A row of panels where the active one grows and the rest compress, driven by flex-grow."),
  s("StackCards", "Stack cards", "Cards & layout", "A pile where the top card flies to the back on click and the rest shuffle forward."),
  s("TestimonialWall", "Testimonial wall", "Cards & layout", "Columns of quotes drifting in alternating directions, fading at the edges, pausing on hover."),
  s("BlendCursor", "Blend cursor", "Loaders & feedback", "A large disc with mix-blend-mode: difference that inverts whatever it passes over."),
  s("CounterCurtainPreloader", "Counter curtain preloader", "Loaders & feedback", "A counter climbs 0 to 100, then the curtain splits and lifts away."),
  s("RingCursor", "Ring cursor", "Loaders & feedback", "A dot that tracks exactly with a ring that trails on a lerp and grows over interactive elements."),
  s("SpringModal", "Spring modal", "Loaders & feedback", "A modal that grows out of its trigger with an overshoot, traps focus and closes on Escape."),
  s("AnnouncementBar", "Announcement bar", "Marketing blocks", "A dismissible bar with a scrolling message that pauses on hover and collapses smoothly."),
  s("CookieSheet", "Cookie sheet", "Marketing blocks", "A consent sheet that slides up from the bottom with equal-weight Accept and Decline."),
  s("FeatureTabs", "Feature tabs", "Marketing blocks", "Tabs that auto-advance with a progress bar, pause on hover and cross-fade their panels."),
  s("NotFound404", "404 not found", "Marketing blocks", "A 404 whose zeros are rings of ticks rotating against each other, with one way home."),
  s("BarChartRace", "Bar chart race", "Data display", "Bars that re-rank as values change, sliding to new rows while widths animate."),
  s("DataTable", "Data table", "Data display", "Sortable columns, a live filter, tabular numerals and proper aria-sort."),
  s("LineChart", "Line chart", "Data display", "An SVG line that draws itself in, with a crosshair that snaps to the nearest point."),
  s("StatCards", "Stat cards", "Data display", "Cards whose figures count up when scrolled into view, each with a delta chip."),
  s("ScrollTimeline", "Scroll timeline", "Data display", "A vertical line that fills as its container scrolls, lighting each entry as it passes."),
  s("MasonryGallery", "Masonry gallery", "Media", "CSS columns with varied tile heights that fade up in sequence and lift on hover."),
  s("MomentumCarousel", "Momentum carousel", "Media", "Drag to scroll with real inertia: release velocity carries on and decays with friction."),
  s("SharedElementLightbox", "Shared-element lightbox", "Media", "The clicked tile becomes the lightbox, animating from its own box to the centre and back."),
  s("WaveformAudioPlayer", "Waveform audio player", "Media", "A bar waveform with played/unplayed split, click-to-seek and keyboard control."),
  s("FanOutAvatarStack", "Fan-out avatar stack", "Media", "Overlapping avatars that fan apart on hover or focus, each staggered."),
  s("StoryViewer", "Story viewer", "Media", "Segmented progress bars, tap sides to move, press and hold to pause, auto-advance."),
  s("ChapteredVideoPlayer", "Chaptered video player", "Media", "A scrubber split into labelled chapters with click-to-jump and the current chapter shown."),
  s("VinylRecordPlayer", "Vinyl record player", "Media", "A record that spins up and down, and a tonearm that swings onto it."),
  s("ScrollRail", "Scroll rail", "Navigation", "A dot rail that tracks the section in view, grows the active dot and scrolls on click."),
  s("BreadcrumbTrail", "Breadcrumb trail", "Navigation", "Collapses the middle of a long path into an ellipsis button that expands with a stagger."),
  s("MegaMenu", "Mega menu", "Navigation", "A nav whose panel opens under the hovered item, with hover-intent and keyboard support."),
  s("MobileSheetMenu", "Mobile sheet menu", "Navigation", "A bottom sheet menu that drags down to dismiss with a velocity-aware threshold."),
  s("WordmarkFooter", "Wordmark footer", "Navigation", "A footer with a huge outlined wordmark whose letters fill with the accent as the pointer passes."),
  s("SourceCards", "Source cards", "AI interfaces", "Numbered citation cards; hovering a marker in the text highlights its card and vice versa."),
  s("ImageGenGrid", "Image gen grid", "AI interfaces", "Tiles that develop from blurred noise to a finished image, staggered, with a pending shimmer."),
  s("VoiceOrb", "Voice orb", "AI interfaces", "An orb that breathes when idle, ripples when listening and pulses when speaking."),
  s("SearchSuggest", "Search suggest", "Forms", "As-you-type suggestions with the match highlighted and full arrow-key navigation."),
  s("CheckGroup", "Check group", "Forms", "Checkboxes with a draw-on tick and a correctly indeterminate select-all."),
  s("Combobox", "Combobox", "Forms", "The ARIA editable combobox pattern: input, listbox and activedescendant, committing a value."),
  s("DatePicker", "Date picker", "Forms", "A month grid with keyboard navigation, today marker and a slide between months."),
  s("Dropzone", "Dropzone", "Forms", "Drag files on or click to browse; the border animates on dragover and files are removable."),
  s("AudioSphere", "Audio sphere", "3D objects", "A wireframe icosphere whose vertices are pushed out by a beat and travelling noise.", "_three"),
  s("ChromeLogo", "Chrome logo", "3D objects", "A mirror-finish torus knot reflecting a studio environment.", "_three"),
  s("DataGlobe", "Data globe", "3D objects", "A dot-sphere with great-circle arcs that draw themselves between cities. Drag to spin.", "_three"),
  s("ExplodedView", "Exploded view", "3D objects", "A stack of layers that separate along one axis and settle back, like a teardown.", "_three"),
  s("Galaxy", "Galaxy", "3D objects", "Fourteen thousand additive points on spiral arms, warm core to cool rim.", "_three"),
  s("GlassOrb", "Glass orb", "3D objects", "A transmissive sphere refracting a glowing knot inside it.", "_three"),
  s("GrassField", "Grass field", "3D objects", "Instanced blades swaying on a wave and bending away from the pointer.", "_three"),
  s("HoloCard", "Holo card", "3D objects", "A card that tilts to the pointer under a holographic foil shader.", "_three"),
  s("InfiniteTunnel", "Infinite tunnel", "3D objects", "Rings recycled along z so the corridor never ends, leaning with the pointer.", "_three"),
  s("IridescentBlob", "Iridescent blob", "3D objects", "A displaced icosphere shaded by its normals, so orientation becomes colour.", "_three"),
  s("KeycapRow", "Keycap row", "3D objects", "Bevelled keys that depress under the pointer and spring back; click to hold one down.", "_three"),
  s("ParticleMorph", "Particle morph", "3D objects", "Three thousand points eased between sphere, cube, torus and helix. Click to advance.", "_three"),
  s("ProductTurntable", "Product turntable", "3D objects", "A bottle on a plinth that auto-rotates, drags, and keeps its momentum after release.", "_three"),
  s("RgbGlitch", "RGB glitch", "3D objects", "Text sampled three times with per-channel offsets and random slice jumps.", "_three"),
  s("SnowGlobe", "Snow globe", "3D objects", "Flakes that fall under gravity, bounce off the glass and are kicked up when you click.", "_three"),
  s("TextParticles", "Text particles", "3D objects", "Text sampled into points that spring home and are shoved away by the pointer.", "_three"),
  s("ClickRipple", "Click ripple", "3D effects", "Every click launches a decaying ring that refracts the pattern beneath it.", "_gl"),
  s("CurvedGallery", "Curved gallery", "3D effects", "Panels on a cylinder, spun by dragging with inertia.", "_three"),
  s("DepthPhoto", "Depth photo", "3D effects", "A 2.5D parallax from transparent layers at different depths.", "_three"),
  s("DissolveTransition", "Dissolve transition", "3D effects", "Two scenes cross-faded through a noise threshold with a glowing burn edge.", "_three"),
  s("ExtrudedText", "Extruded text", "3D effects", "Text rasterised then built from instanced boxes with depth, so any font works.", "_three"),
  s("FluidTrail", "Fluid trail", "3D effects", "A glowing ribbon that follows the pointer and fades like smoke. Canvas 2D, no WebGL."),
  s("HoverDistort", "Hover distort", "3D effects", "A textured plane that bulges toward the pointer with a chromatic fringe.", "_three"),
  s("PageWipe", "Page wipe", "3D effects", "A page-turn transition in CSS 3D: the top page rotates away and drops to the back."),
  s("Aurora", "Aurora", "Shader backgrounds", "Layered curtains of light over a star field, warmed to orange.", "_gl"),
  s("Caustics", "Caustics", "Shader backgrounds", "The bright net of light on a pool floor from an iterated sine-warp.", "_gl"),
  s("CloudSea", "Cloud sea", "Shader backgrounds", "Cloud banks lit from a low sun over a sunset sky, in three drifting layers.", "_gl"),
  s("GrainGradient", "Grain gradient", "Shader backgrounds", "Slow colour blobs with film grain dithered on top.", "_gl"),
  s("InkFluid", "Ink fluid", "Shader backgrounds", "Domain-warped noise that reads as ink diffusing in water.", "_gl"),
  s("LiquidChrome", "Liquid chrome", "Shader backgrounds", "Repeated sine warping shaded like a reflective liquid metal.", "_gl"),
  s("RainGlass", "Rain glass", "Shader backgrounds", "Beading, sliding drops on a pane, each refracting a blurred bokeh street.", "_gl"),
  s("WarpStarfield", "Warp starfield", "Shader backgrounds", "Stars streaming from a vanishing point that follows the pointer; click to burst.", "_gl"),
];

/** "SheenHeadline" -> "sheen-headline" */
export const slugOf = (file: string) => file.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
