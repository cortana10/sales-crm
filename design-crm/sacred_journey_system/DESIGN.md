---
name: Sacred Journey System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3f4943'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6f7a72'
  outline-variant: '#bec9c1'
  surface-tint: '#0b6c4b'
  primary: '#004d34'
  on-primary: '#ffffff'
  primary-container: '#006747'
  on-primary-container: '#8fe2ba'
  inverse-primary: '#84d7af'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#712c29'
  on-tertiary: '#ffffff'
  tertiary-container: '#8e433e'
  on-tertiary-container: '#ffc3bd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f4ca'
  primary-fixed-dim: '#84d7af'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#3d0606'
  on-tertiary-fixed-variant: '#76312d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style
The design system is engineered for the high-stakes, spiritually significant task of Umrah travel management. It balances the precision of an enterprise SaaS with the reverence of pilgrimage services.

The design direction is **Modern Corporate** with a focus on **Tonal Minimalism**. It utilizes spacious layouts, high-fidelity surfaces, and purposeful color application to foster a sense of calm efficiency. The goal is to reduce cognitive load for agents managing complex itineraries while maintaining a premium, trustworthy aesthetic that honors the spiritual nature of the service.

## Colors
The palette is rooted in 'Nabawi Green', used strategically for primary actions and brand presence to signify growth and peace. 'Madinah Gold' serves as a sophisticated accent, reserved for high-value highlights, status indicators, and premium call-to-actions.

The neutral scale relies on a cool-toned palette of whites and grays to create a "clean-room" environment for data entry. Use #F8FAFC for the main application background and #FFFFFF for content containers to establish clear visual depth.

## Typography
The system employs a dual-sans stack. **Geist** is used for headlines, titles, and labels to provide a technical, modern edge that suggests precision and AI-driven capability. **Inter** is the workhorse for body text and data-heavy tables, chosen for its unparalleled legibility in complex UI environments.

Maintain tight tracking for headlines and generous leading for body copy to ensure long-form traveler notes and CRM entries remain readable during extended sessions.

## Layout & Spacing
The design system utilizes a **Fixed-Fluid Hybrid Grid**. Content is housed in a centered 12-column container (1440px max) on desktop to prevent visual fatigue, while sidebars and navigation utilize fixed widths.

A strict 4px baseline grid ensures vertical rhythm. Dashboards should prioritize whitespace (using 'lg' and 'xl' spacing tokens) to separate distinct functional areas like "Leads," "Itineraries," and "Payments," preventing the interface from feeling cluttered or overwhelming.

## Elevation & Depth
In line with the Shadcn philosophy, this design system uses **Tonal Layers** supplemented by **Low-Contrast Outlines**. 

- **Level 0 (Base):** #F8FAFC (The canvas).
- **Level 1 (Cards):** White background with a 1px border (#E2E8F0). No shadow.
- **Level 2 (Dropdowns/Modals):** White background with a soft, diffused shadow (0px 10px 15px -3px rgba(0,0,0,0.05)) to signify interactivity and temporary focus.

Avoid heavy shadows. Depth is primarily communicated through the subtle contrast between the cool gray background and pure white surfaces.

## Shapes
A **Rounded (0.5rem)** logic is applied throughout the system. This creates a soft, approachable professional feel without appearing too casual or "bubbly." 

Large containers like primary dashboard cards should use the `rounded-lg` (1rem) token, while smaller interactive elements like buttons and input fields stay consistent at 0.5rem. This hierarchy of roundedness helps distinguish between structural layout elements and actionable UI components.

## Components
### Buttons
- **Primary:** Nabawi Green (#006747) with white text. High-contrast, solid fill.
- **Secondary:** Madinah Gold (#C5A059) with white text. Used for "Add New" or "Convert Lead."
- **Ghost:** Transparent background with gray text; used for secondary navigation or utility actions.

### Data Tables
Tables are the core of this CRM. Use 0px borders between rows, replacing them with a subtle background hover state (#F1F5F9). Column headers should use the `label-sm` typography token in muted gray.

### Cards
Cards are the primary container for traveler profiles and booking summaries. They should feature a 1px border (#E2E8F0) and zero shadow. Use a vertical gold accent bar (2px wide) on the left side of cards to denote "Priority" or "VIP" pilgrims.

### Input Fields
Inputs use a white background, a 1px border (#CBD5E1), and 0.5rem roundedness. On focus, the border transitions to Nabawi Green with a subtle 2px outer glow in a semi-transparent green tint.

### Status Chips
- **Confirmed:** Soft green background with Nabawi Green text.
- **Pending:** Soft gold background with Madinah Gold text.
- **Urgent:** Soft red background with red text.