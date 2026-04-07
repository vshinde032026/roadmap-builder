import type { RoadmapGenerateResponse } from '@/lib/api/roadmaps';

export const FIXTURE_ROADMAP: RoadmapGenerateResponse = {
  objective: 'Become a frontend developer',
  nodes: [
    { id: 'n1', title: 'Become a frontend developer', description: 'Roadmap to: Become a frontend developer', parent_id: null },

    { id: 'n2', title: 'Internet & Web Basics', description: 'Understand how the web works end-to-end.', parent_id: 'n1' },
    { id: 'n3', title: 'How the internet works', description: 'Packets, routing, and the client-server model.', parent_id: 'n2' },
    { id: 'n4', title: 'What is HTTP?', description: 'Requests, responses, methods, and status codes.', parent_id: 'n2' },
    { id: 'n5', title: 'DNS & domain names', description: 'How names resolve to IP addresses.', parent_id: 'n2' },
    { id: 'n6', title: 'Browsers & rendering', description: 'How a browser turns HTML/CSS/JS into pixels.', parent_id: 'n2' },

    { id: 'n7', title: 'HTML', description: 'Semantic markup for structuring web content.', parent_id: 'n1' },
    { id: 'n8', title: 'Document structure', description: 'doctype, head, body, and metadata.', parent_id: 'n7' },
    { id: 'n9', title: 'Semantic elements', description: 'header, nav, main, article, section, footer.', parent_id: 'n7' },
    { id: 'n10', title: 'Forms & inputs', description: 'Collecting and validating user input.', parent_id: 'n7' },
    { id: 'n11', title: 'Accessibility (a11y)', description: 'ARIA roles, labels, and keyboard navigation.', parent_id: 'n7' },

    { id: 'n12', title: 'CSS', description: 'Styling and layout for the web.', parent_id: 'n1' },
    { id: 'n13', title: 'Selectors & specificity', description: 'How CSS rules target elements and resolve conflicts.', parent_id: 'n12' },
    { id: 'n14', title: 'Box model', description: 'Margin, border, padding, content.', parent_id: 'n12' },
    { id: 'n15', title: 'Flexbox', description: 'One-dimensional layout for rows and columns.', parent_id: 'n12' },
    { id: 'n16', title: 'CSS Grid', description: 'Two-dimensional layout for complex pages.', parent_id: 'n12' },
    { id: 'n17', title: 'Responsive design', description: 'Media queries and mobile-first layouts.', parent_id: 'n12' },

    { id: 'n18', title: 'JavaScript', description: 'The programming language of the web.', parent_id: 'n1' },
    { id: 'n19', title: 'Syntax & types', description: 'Variables, functions, control flow.', parent_id: 'n18' },
    { id: 'n20', title: 'DOM manipulation', description: 'Selecting and updating elements with JS.', parent_id: 'n18' },
    { id: 'n21', title: 'Async & promises', description: 'Callbacks, promises, and async/await.', parent_id: 'n18' },
    { id: 'n22', title: 'Fetch & APIs', description: 'Calling backends from the browser.', parent_id: 'n18' },

    { id: 'n23', title: 'Version Control', description: 'Track and collaborate on code changes.', parent_id: 'n1' },
    { id: 'n24', title: 'Git basics', description: 'commit, branch, merge, rebase.', parent_id: 'n23' },
    { id: 'n25', title: 'GitHub workflows', description: 'Pull requests, reviews, and CI.', parent_id: 'n23' },

    { id: 'n26', title: 'A Frontend Framework', description: 'Build component-based UIs at scale.', parent_id: 'n1' },
    { id: 'n27', title: 'React fundamentals', description: 'Components, props, state, hooks.', parent_id: 'n26' },
    { id: 'n28', title: 'Routing', description: 'Multi-page navigation with React Router.', parent_id: 'n26' },
    { id: 'n29', title: 'State management', description: 'Local state, context, and external stores.', parent_id: 'n26' },
    { id: 'n30', title: 'Data fetching', description: 'React Query / SWR for server state.', parent_id: 'n26' },

    { id: 'n31', title: 'Tooling & Build', description: 'Modern frontend build and dev tooling.', parent_id: 'n1' },
    { id: 'n32', title: 'Package managers', description: 'npm, pnpm, yarn.', parent_id: 'n31' },
    { id: 'n33', title: 'Vite / bundlers', description: 'Dev server, HMR, and production builds.', parent_id: 'n31' },
    { id: 'n34', title: 'Linters & formatters', description: 'ESLint and Prettier for code quality.', parent_id: 'n31' },
  ],
};
