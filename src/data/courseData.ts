import { ModuleItem, CapabilityItem } from '../types';

export const COURSE_MODULES: ModuleItem[] = [
  {
    id: 1,
    number: '1',
    duration: '2.5 Hours',
    title: 'Introduction to AI Website Tools & Ecosystem',
    summary: 'Exploring the modern AI tech stack: Framer, v0, Bolt, Claude 3.5 Sonnet, and comparing visual editors versus generative code pipelines.',
    topics: [
      'Comparative breakdown of v0, Framer AI, Bolt.new, and Cursor',
      'Understanding client-side vs full-stack generative outputs',
      'Setting up your workspace, API keys, and rapid deployment pipeline',
      'Choosing between no-code visual canvas vs prompt-driven code engines'
    ],
    toolsCovered: ['Framer AI', 'v0.dev', 'Bolt.new', 'Claude 3.5'],
    deliverable: 'Your first AI-generated landing page structure published live in under 15 minutes.'
  },
  {
    id: 2,
    number: '2',
    duration: '3.0 Hours',
    title: 'Crafting Perfect Prompts for High-Converting Layouts',
    summary: 'Writing structural instructions, specifying containers, hero blocks, testimonials, pricing cards, and interactive bento-grid layouts.',
    topics: [
      'Architectural prompting: tokens, spatial hierarchies, and responsive containers',
      'Formulating bento-box grid layouts and glassmorphic micro-surfaces',
      'Iterative refinement loops: how to correct layout defects without starting over',
      'Creating high-converting CTA zones and social-proof sections'
    ],
    toolsCovered: ['Prompt Syntax Rules', 'Bento Architecture', 'Figma AI'],
    deliverable: 'A custom multi-section SaaS marketing layout built exclusively with prompt directives.'
  },
  {
    id: 3,
    number: '3',
    duration: '2.0 Hours',
    title: 'AI-Assisted UI/UX Design Systems & Branding',
    summary: 'Generating accessible color tokens, responsive typographic hierarchies, custom micro-illustrations, and unified visual identities.',
    topics: [
      'Algorithmic color palettes with WCAG AAA contrast compliance',
      'Fluid typographic scales (Plus Jakarta Sans, Inter, JetBrains Mono)',
      'Generating cohesive iconography and vector-style branding elements',
      'Dark mode architecture and glassmorphism lighting tokens'
    ],
    toolsCovered: ['Coolors AI', 'Tailwind Design Tokens', 'Midjourney / Recraft'],
    deliverable: 'A complete exportable brand token system and responsive style guide.'
  },
  {
    id: 4,
    number: '4',
    duration: '3.5 Hours',
    title: 'Building Interactive Elements & Forms without Code',
    summary: 'Adding lead capture popups, interactive calendars, payment checkout flows, dynamic tabs, and custom interactive widgets.',
    topics: [
      'Multi-step registration wizards and lead capture validation forms',
      'Tabbed content switchers, pricing tier toggles, and modal drawers',
      'Stripe checkout embedding and frictionless 1-click payment workflows',
      'Micro-animations with CSS transforms and hardware-accelerated transitions'
    ],
    toolsCovered: ['Stripe Elements', 'Motion UI', 'Typeform AI', 'Tally'],
    deliverable: 'An interactive checkout terminal with client validation and webhook simulation.'
  },
  {
    id: 5,
    number: '5',
    duration: '2.5 Hours',
    title: 'SEO, Performance Tuning & Content Automation',
    summary: 'Automating semantic metadata, OpenGraph cards, schema markup, image optimization, and generating high-ranking blog articles.',
    topics: [
      'Automated meta description, title tag, and JSON-LD schema generation',
      'OpenGraph and Twitter card rendering for maximum social click-through',
      'Image asset compression, modern WebP/AVIF formats, and Lighthouse 100/100 scores',
      'Generative content pipelines for programmatic SEO pages'
    ],
    toolsCovered: ['Schema.org', 'Lighthouse AI Audit', 'Next-Gen Imagery'],
    deliverable: 'Full SEO audit suite with 98+ Lighthouse scores across performance and accessibility.'
  },
  {
    id: 6,
    number: '6',
    duration: '2.0 Hours',
    title: 'Launching, Custom Domains & Monetizing Client Sites',
    summary: 'Packaging your skills as an agency service: client pricing proposals, handover procedures, hosting billing, and retaining monthly clients.',
    topics: [
      'Custom domain DNS mapping, SSL certification, and zero-downtime publishing',
      'Pricing your services: how to bill $2,500 – $5,000 per website build',
      'Client onboarding templates, feedback revision portals, and handoff contracts',
      'Recurring revenue: selling maintenance, SEO retainers, and AI content updates'
    ],
    toolsCovered: ['Cloudflare DNS', 'Vercel / Netlify Deploy', 'Agency Contracts'],
    deliverable: 'Live production URL on custom domain and ready-to-send agency client pitch deck.'
  }
];

export const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'tools',
    title: 'AI Website Generators & Tools',
    description: 'Deep dive into industry standards including Framer AI, v0 by Vercel, Bolt.new, and Webflow AI assistants.',
    tags: ['Framer', 'v0.dev', 'Bolt'],
    icon: 'widgets',
    examplePrompt: 'Create a dark-themed cyber enterprise landing page with hero bento grid and interactive live metrics.'
  },
  {
    id: 'prompts',
    title: 'Prompt Engineering for Web UI',
    description: 'Formulate syntax-specific prompts that generate consistent visual hierarchies, grids, and modular layouts.',
    tags: ['Tokens', 'Layout Logic'],
    icon: 'psychology',
    examplePrompt: 'Structure a 12-column responsive layout with 5:7 split, sticky floating sidebar, and frosted glass cards.'
  },
  {
    id: 'design',
    title: 'Design Systems & Branding',
    description: 'Create harmonious color palettes, accessible font scales, and cohesive UI styling using intelligent generator assistants.',
    tags: ['Tokens', 'Accessibility'],
    icon: 'palette',
    examplePrompt: 'Generate a dark slate palette with neon cyan #4cd7f6 and indigo #c0c1ff accents with WCAG 2.1 AAA contrast.'
  },
  {
    id: 'assets',
    title: 'Asset Creation & Copywriting',
    description: 'Generate stunning custom images, vector graphics, logos, and persuasive marketing copy directly in your workspace.',
    tags: ['AI Imagery', 'Copywriting'],
    icon: 'auto_stories',
    examplePrompt: 'Write high-conversion value propositions and generate 3D holographic neural visual assets.'
  },
  {
    id: 'responsive',
    title: 'Responsive Optimization',
    description: 'Ensure seamless touch experiences, fluid transitions, and lightning-fast loading speeds on all screen dimensions.',
    tags: ['Mobile-First', 'Speed'],
    icon: 'devices',
    examplePrompt: 'Optimize touch target sizes to 48px+, implement bottom sheet navigation for mobile screens.'
  },
  {
    id: 'deployment',
    title: 'Domains, Hosting & Deployment',
    description: 'One-click publishing setups, SSL configuration, DNS mapping, and ongoing maintenance strategies for clients.',
    tags: ['Custom DNS', '1-Click Live'],
    icon: 'cloud_done',
    examplePrompt: 'Automate GitHub actions with zero-config edge caching, edge SSL certificate renewal, and CDN routing.'
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: 'speed',
    title: 'Fast & Efficient',
    description: 'Build complete multi-page sites in hours instead of weeks with automated workflows.',
    badge: '90% faster build time'
  },
  {
    icon: 'code_off',
    title: 'Zero Coding Needed',
    description: 'No HTML, CSS, or JS required—purely visual, prompt-driven structural architecture.',
    badge: 'Pure natural language'
  },
  {
    icon: 'diamond',
    title: 'Professional Results',
    description: 'Clean layouts, typography, responsiveness, and SEO built right into every screen from day one.',
    badge: 'Client-ready grade'
  },
  {
    icon: 'rocket_launch',
    title: 'Future-Proof Skills',
    description: 'Stay ahead of the curve with cutting-edge generative web design and AI tool stacks.',
    badge: 'Modern agency workflow'
  }
];
