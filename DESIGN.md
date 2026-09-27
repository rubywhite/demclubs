---
name: DemClubs
description: An annotated civic ledger for making governance decisions visible, traceable, and reviewable.
colors:
  civic-ink: "#0a2342"
  civic-ink-soft: "#40546d"
  ledger-paper: "#fbfcfe"
  blue-paper: "#eef4fb"
  canvas-blue: "#eaf0f7"
  ledger-rule: "#c7d3e0"
  ledger-rule-strong: "#8da4bd"
  action-cobalt: "#195fca"
  action-cobalt-dark: "#104a9f"
  conflict-vermilion: "#bd2c35"
  attention-amber: "#8a5a00"
  recorded-green: "#176a4f"
  focus-gold: "#f0b429"
typography:
  display:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "clamp(2rem, 3.3vw, 3.7rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "1.8rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.35
  body:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  document-body:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  tag: "4px"
  status: "6px"
  compact: "7px"
  control: "8px"
  action: "9px"
  framed: "10px"
  surface: "12px"
  dialog: "14px"
  pill: "99px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action-cobalt}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "0 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.action-cobalt-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.action}"
  button-secondary:
    backgroundColor: "#ffffff"
    textColor: "{colors.civic-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "42px"
  input-standard:
    backgroundColor: "#ffffff"
    textColor: "{colors.civic-ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "42px"
  authority-chip:
    backgroundColor: "#e3eaf2"
    textColor: "#294664"
    typography: "{typography.label}"
    rounded: "{rounded.status}"
    padding: "5px 8px"
  status-recorded:
    backgroundColor: "#daeee6"
    textColor: "#0b5a43"
    typography: "{typography.label}"
    rounded: "{rounded.status}"
    padding: "0 8px"
    height: "25px"
  status-needed:
    backgroundColor: "#fff0d6"
    textColor: "#754b00"
    typography: "{typography.label}"
    rounded: "{rounded.status}"
    padding: "0 8px"
    height: "25px"
---

# Design System: DemClubs

## Overview

**Creative North Star: "The Annotated Civic Ledger"**

DemClubs feels like a public record being completed carefully in real time. The interface is calm, precise, and workmanlike: cool paper surfaces, midnight civic ink, disciplined rules, and annotations that keep authority, readiness, and clause impact beside the decision that produced them. It avoids both campaign energy and legal-tech severity.

The visual hierarchy always serves traceability. A choice is visibly recorded, its effect appears in the document margin, and unresolved work remains legible without being punitive. Controls feel durable rather than decorative; restrained curvature and sparse elevation soften the system without turning it into a generic card dashboard.

**Key Characteristics:**

- One continuous ledger organized by rules and paper tones, not a collection of equal cards.
- High-contrast workhorse typography with tabular numerals for progress and counts.
- Cobalt reserved for action and selection; status colors always paired with explicit text.
- Privacy, source basis, readiness, and draft impact remain visible at the point of work.
- Complete English and Spanish states share the same hierarchy and component behavior.

## Colors

The palette combines midnight civic ink and cool filed-paper neutrals with one cobalt action voice; green, amber, and vermilion communicate specific record states rather than decoration.

### Primary

- **Action Cobalt:** Drives primary actions, active tabs, progress, selected controls, and text selection. Its darker companion is reserved for links and hover states.

### Secondary

- **Recorded Green:** Marks a decision or document state as complete and appears on recommended safeguards.
- **Attention Amber:** Marks missing, working, unresolved, or review-needed states.
- **Conflict Vermilion:** Appears only when the readiness engine identifies a potential conflict or when a destructive/error condition requires it.

### Neutral

- **Civic Ink:** The masthead, footer, primary text, and strongest structural rule.
- **Civic Ink Soft:** Supporting copy, explanations, and secondary metadata.
- **Ledger Paper:** The primary working surface.
- **Blue Paper and Canvas Blue:** Recede behind the active record to distinguish rails, margins, and the application canvas.
- **Ledger Rules:** Hairline separators and input strokes that make the interface feel filed and durable.

### Named Rules

**The One Action Voice Rule.** Cobalt means act, select, or advance; it is not ambient decoration.

**The Status Is a Sentence Rule.** Green, amber, and vermilion never carry meaning alone; every state includes a plain-language label and contextual explanation.

**The Vermilion Reserve Rule.** Conflict color is reserved for genuine conflicts and errors, never routine emphasis.

## Typography

**Display Font:** Avenir Next, with Avenir and Segoe UI fallbacks  
**Body Font:** Avenir Next, with Avenir and Segoe UI fallbacks  
**Document Font:** Georgia, with Times New Roman fallback

**Character:** Avenir Next provides direct, civic, highly legible interface copy. The generated bylaws alone switch to a traditional serif, separating document prose from the surrounding builder without making the application itself feel legalistic.

### Hierarchy

- **Display** (extra-bold, fluid, 1.02 line-height): Current decisions and result-page titles; use tight tracking and balanced wrapping.
- **Headline** (extra-bold, 1.8rem, 1.2 line-height): Dialog and major supporting headings.
- **Title** (extra-bold, 1rem, 1.35 line-height): Findings, document articles, choice labels, and compact section headings.
- **Body** (regular, 1rem, 1.65 line-height): Prompts and explanations; working copy generally stays below roughly 670px for readable scanning.
- **Document Body** (regular serif, 1rem, 1.7 line-height): Generated bylaws prose only.
- **Label** (extra-bold, 0.72rem, 0.05em tracking): Uppercase field labels, margin annotations, compact statuses, and metadata.

### Named Rules

**The Interface–Document Divide Rule.** Sans serif explains and operates; serif renders the bylaws artifact. Do not use the serif for builder controls or navigation.

**The Counted Record Rule.** Progress percentages, section counts, and decision numbers use tabular numerals.

## Layout

The desktop builder is a continuous three-column ledger capped at 1600px: a 230px section rail, a broad decision sheet that never narrows below 480px, and a 260–330px annotated record margin. The masthead, project strip, and view tabs span the page as stacked civic bands. The center column carries the primary task; rail and margin remain visibly subordinate through blue-paper tones and hairline boundaries.

Spacing follows an 8px-biased rhythm with compact 4–12px gaps inside controls, 16–24px component spacing, and 32–60px separation between task regions. Decision content uses fluid horizontal padding and caps question, choice, rationale, and navigation widths at 670–760px so long bilingual copy remains readable.

At 1120px and below, the masthead becomes two rows, the section rail narrows to 190px, project fields wrap, and the record margin moves below the decision sheet as three equal annotations. At 760px and below, the ledger becomes a single flow: the rail becomes a progress block plus native section selector, the record margin follows the question, export actions may wrap or scroll, and result headers stack. Controls retain a minimum 44px target where they are primary interactive elements. The minimum supported viewport is 320px, and the layout must remain operable at 200% text zoom without hidden decisions or actions.

**The Continuous Record Rule.** Use rules, bands, and adjacent paper tones to organize related work. Do not break the builder into floating dashboard cards.

**The Margin Follows the Decision Rule.** On desktop the annotation margin sits beside the current decision; on smaller screens it moves immediately after it rather than disappearing.

## Elevation & Depth

The system is flat by default. Depth comes first from paper-tone changes, borders, and structural bands. Shadows are sparse and functional: a low shadow lifts the active section in the rail, a focused shadow emphasizes the primary action, the document preview reads as a physical sheet, and dialogs/toasts sit above the working record.

### Shadow Vocabulary

- **Active record** (`0 5px 18px rgba(23, 55, 88, .08)`): The current section in the left rail.
- **Primary action** (`0 8px 18px rgba(25, 95, 202, .18)`): Cobalt actions that advance or export.
- **Document sheet** (`0 18px 45px rgba(34, 55, 80, .12)`): The generated bylaws preview only.
- **Dialog** (`0 30px 80px rgba(0, 0, 0, .32)`): Modal source and method information.

**The Flat-by-Default Rule.** If a rule or paper-tone change can express hierarchy, do not add a shadow.

## Shapes

The form language is restrained and gently squared. Core controls use 8–10px corners, framed surfaces use 10–14px corners, and compact tags use 4–6px corners. Circles are reserved for radio controls, unresolved document markers, and count badges; pill geometry is not used for ordinary buttons. Hairline solid rules structure the record, while dashed rules distinguish explanatory annotations and clause impact.

**The Filed Edge Rule.** Controls may be approachable, but they should retain enough edge definition to feel administrative and durable.

## Components

### Buttons

- **Shape:** Gently squared action controls (8–9px radius) with a minimum 42–44px height.
- **Primary:** White text on Action Cobalt with compact horizontal padding and a restrained cobalt shadow.
- **Hover / Focus:** Primary buttons darken; all controls use the shared high-contrast gold 3px focus outline with 3px offset.
- **Secondary:** White paper, civic ink, and a strong ledger-rule border; hover changes the border and text to cobalt.
- **Disabled:** Retains its label and structure at 45% opacity with a not-allowed cursor.

### Inputs / Fields

- **Style:** White background, civic ink, strong ledger-rule border, 8px corners, and 38–42px height depending on viewport.
- **Labels:** Uppercase compact labels precede every field; placeholders are examples, never substitutes for labels.
- **Focus:** The global gold outline remains visible outside the field edge.
- **Selects:** Use a visible chevron and reserve right padding for it; native semantics remain intact.

### Navigation

- **Mode switch:** A navy segmented control in the masthead. The selected mode becomes a raised white segment and exposes `aria-pressed`.
- **View tabs:** Flat text tabs on blue paper. A 3px cobalt underline marks the current view; readiness includes a labeled numeric count.
- **Section rail:** Each section shows a label and tabular completion count. The active section uses white paper, bold ink, and low elevation.
- **Mobile:** The section list becomes a labeled select; workspace tabs remain horizontally available rather than collapsing behind a menu.

### Choice Rows

Choice rows are full-width ledger entries separated by hairlines. Selection uses pale cobalt paper, a filled cobalt radio with a soft halo, and a visible check; keyboard focus uses the gold outline plus warm focus paper. Recommended options carry a small green text badge. The description stays directly beneath its choice label.

### Authority and Status Chips

Authority chips describe why a question exists; status chips describe the record state. Both use compact squared tags and explicit text. Required/essential uses quiet blue-gray, safeguards use green, recorded uses green, decision-needed and working use amber, and conflict uses vermilion.

### Record Margin

The record margin is the system's signature component. It combines status, source basis, and live draft impact in the same reading order for every decision. When no option is recorded, it says so and explains that the clause will update after a selection; when an option is recorded, its affected clause appears immediately. The region announces updates politely and atomically to assistive technology.

### Draft and Findings

The draft preview is a centered white sheet with serif body copy and visible amber markers beside unresolved sections. Findings are ruled rows, not cards: each pairs a textual status and heading with a plain-language detail. Ready, missing, conflict, and recommended states always remain distinguishable without color.

### Privacy and Trust Controls

Local persistence is stated in the masthead as a live save status: saved, saving, or failed with a backup instruction. Project import/export and deletion are explicit; deletion requires confirmation and explains irreversibility. Uploaded text is described as browser-local. Optional AI review remains unavailable until imported text exists and the user checks an explicit consent statement describing exactly what will be sent. The source/method dialog identifies the classification method and links to its public evidence. The footer keeps the educational-not-legal-advice disclaimer visible.

### Interaction and Accessibility

All primary state changes use native buttons, inputs, selects, fieldsets, labels, and dialogs. Icon-only controls require accessible names; icons accompanying text are supplemental. A keyboard skip link moves directly to the current decision, navigation returns focus to the new decision heading, and live regions announce save, status, and copy changes. Hover never substitutes for focus. Reduced-motion preference collapses transitions and smooth scrolling to effectively instantaneous behavior. English and Spanish must retain equivalent content, labels, hierarchy, and state descriptions.

## Do's and Don'ts

### Do:

- **Do** preserve the continuous ledger: section rail, active decision, and annotated margin should read as one record.
- **Do** keep authority, source basis, readiness, and clause impact adjacent to the governance choice they explain.
- **Do** pair every semantic color with visible status text and, where needed, explanatory copy.
- **Do** keep local persistence, export, deletion, AI consent, method sources, and the disclaimer explicit.
- **Do** use native semantics, a visible gold focus ring, 44px primary targets, reduced-motion support, and bilingual parity.
- **Do** mark incomplete work visibly while still allowing the user to export a working draft.

### Don't:

- **Don't** turn the surface into a generic dashboard of floating cards, detached metrics, or decorative charts.
- **Don't** use cobalt for passive decoration, green for generic positivity, or vermilion for routine emphasis.
- **Don't** hide unresolved decisions, infer policy choices, or make generated prose appear more authoritative than the recorded answer and governing basis.
- **Don't** send imported text off-device before explicit, specific consent.
- **Don't** replace persistent labels with placeholders, icons, color, hover, or untranslated shorthand.
- **Don't** introduce campaign imagery, fundraising visual cues, legal-tech intimidation, or invented endorsement marks.
