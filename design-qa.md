# Image Watermark Tool — Design QA

## Evidence

- Source visual truth: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/memberrender-audit/03-adjusted-grid.png`
- Source pixels: 1280 × 720 at 1× density. The source is a scrolled desktop state showing an uploaded image with a repeated text watermark.
- Primary implementation capture: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/03-repeat-desktop.png`
- Implementation pixels and CSS size: 1040 × 1116 at 1× density, captured from the rendered `.image-watermark-tool` at a 1440 × 1000 browser viewport.
- Full-view comparison: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/06-reference-comparison.png`
- Focused controls comparison: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/08-controls-comparison.png`
- Additional implementation captures:
  - Empty desktop: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/01-empty-desktop.png`
  - Single text watermark: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/02-text-desktop.png`
  - Repeated logo watermark: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/04-logo-desktop.png`
  - Mobile text watermark: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/05-text-mobile.png`
  - Dark theme: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/07-text-dark.png`
  - Text watermark shadow: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/09-shadow-text-desktop.png`
  - Logo watermark shadow and edge positioning: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/12-shadow-logo-position-fixed.png`
  - Mobile shadow controls: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/11-shadow-mobile.png`
  - Compact desktop settings: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/13-compact-settings-desktop.png`
  - Compact mobile settings: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/14-compact-settings-mobile.png`
  - Aligned panel headers: `/Users/sunzhenxuan/.codex/visualizations/2026/08/08/019fdf44-dad4-7772-9513-1bed70385f68/image-watermark-implementation/15-aligned-panel-headers.png`

The source and implementation represent the same core interaction state, but not the same product shell or crop. The reference was used for workflow and information hierarchy; the implementation intentionally uses the repository's VitePress and Element Plus visual system. The combined comparison preserves each screenshot's natural aspect ratio and compares the split workspace, preview prominence, control grouping, and export hierarchy rather than claiming pixel identity.

## Browser Verification

- Desktop viewport: 1440 × 1000, device scale factor 1.
- Mobile viewport: 390 × 844, device scale factor 1; captured component width 342 px.
- Tested routes: `/zh/tools/image-watermark` and `/tools/image-watermark`.
- Tested interactions: source image upload, live text watermark render, repeated-grid selection, logo watermark upload/render, shared shadow enable/disable, shadow color/blur/offset disclosure, option reset availability, PNG download, English localization, mobile reflow, and dark theme rendering.
- Download result: `image-watermarked.png`.
- Output verification: 1280 × 720 PNG, preserving the sample image's aspect ratio.
- Shadow verification: enabling the shadow changes the generated PNG for single text, single logo, and repeated logo watermarks. The bottom-right logo remains inside the output after accounting for its rotated and shadowed bounds.
- Layout verification: no horizontal document overflow at either tested viewport.
- Compact-panel verification: the 1440 × 1000 desktop viewport produces a 760 px workspace with equal preview/settings heights. Only the 544 px settings body scrolls, while the header and export area remain visible. Mobile restores natural document flow with no nested settings scroll.
- Header alignment verification: empty and uploaded desktop states both render 76 px preview/settings headers with a measured divider offset of 0 px.
- Console check: no component exceptions or failed application resources. Chrome requested the development-only root `/favicon.ico`, which the base-path VitePress dev server returns as 404; the configured site favicon and production build are unaffected.

## Findings

No actionable P0, P1, or P2 issues remain.

### Required fidelity surfaces

- Fonts and typography: the implementation preserves the existing documentation font stack, hierarchy, and Element Plus control typography. Labels remain readable at desktop and mobile widths; file names truncate safely.
- Spacing and layout rhythm: the reference's preview/settings split and grouped controls are retained. Desktop uses a 1.65:0.85 workspace ratio; mobile changes to task-order stacking without removing controls. Dividers, spacing, and radii match the existing documentation system.
- Colors and visual tokens: all surfaces, text, dividers, brand states, success states, and dark mode use VitePress/Element Plus tokens. The deliberate blue accent replaces the reference site's orange because project-style alignment is a stated constraint.
- Image quality and asset fidelity: the supplied image is rendered at 1280 × 720 in the tested case, with no crop or aspect distortion. Text and supplied PNG logo watermarks are generated through `ImageWatermark`; no placeholder or handcrafted image asset replaces the result.
- Copy and content: visible instructions are localized in English and Simplified Chinese, state that processing is local, identify accepted image types and limits, and keep the export format explicit.
- Icons: all functional icons come from `@element-plus/icons-vue` and use a consistent stroke family.
- Accessibility and states: upload, type, position, reset, remove, and download controls are semantic buttons; type and position selections expose checked/pressed states; touch targets are at least 44 px; empty, loading, ready, disabled, error, focus, and reduced-motion behavior are present.

## Comparison History

- Pass 1: the combined full-view and focused-control comparisons found no P0/P1/P2 mismatch. The reference's batch/video, compression, shadow, and ZIP controls were initially excluded because this page is a single-image `ImageWatermark` tool with PNG output. No visual correction loop was required.
- Pass 2: shared shadow controls were added for text and logo watermarks. Browser verification found and corrected the logo's custom-coordinate origin at edge placements; repeat, desktop, mobile, and type-switch states then passed without overflow or layout shift.
- Pass 3: the desktop workspace was capped to prevent the settings column from stretching the preview. Shadow details can remain enabled while collapsed into a parameter summary, and desktop offset controls use a compact two-column layout. Mobile retains a single-column, natural-scroll flow.
- Pass 4: preview file metadata was compacted onto the filename row and both desktop panel headers were normalized to 76 px, aligning their lower dividers without adding unnecessary height.

## Follow-up Polish

- P3 test gap: verify touch behavior on a physical iOS or Android device when available; emulation found no overflow or unusable target.
- P3 development note: the VitePress base-path dev server emits a root `/favicon.ico` 404 in Chrome. This is unrelated to the tool and does not occur for the configured base-path favicon in the production build.

final result: passed
