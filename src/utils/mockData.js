// Initial Mock Data for DSNOVE

import dharani from '../assets/team/dharani.jpeg';
import shriharan from '../assets/team/shri-haran.jpeg';
import naveen from '../assets/team/naveen.jpeg';
import naveenraj from '../assets/team/naveenraj.jpeg';
import portfolioAiImg from '../assets/brand/portfolio-ai.svg';
import portfolioCloudImg from '../assets/brand/portfolio-cloud.svg';
import portfolioSecurityImg from '../assets/brand/portfolio-security.svg';
import portfolioMobileImg from '../assets/brand/portfolio-mobile.svg';
import portfolioWebImg from '../assets/brand/portfolio-web.svg';
import avatarClientImg from '../assets/brand/avatar-client.svg';

export const DATA_VERSION = '2.0.0';

export const COMPANY_SOCIALS = {
  linkedin: 'https://www.linkedin.com/company/dsnove',
  github: 'https://github.com/dsnove',
};

export const initialServices = [
  {
    id: 'srv-ai',
    title: 'Artificial Intelligence & Machine Learning',
    shortDesc: 'Automate complex operations, extract strategic insights, and build cognitive systems.',
    description: 'We design and deploy production-grade AI solutions including LLM custom finetuning, computer vision pipelines, predictive analytics engines, and neural search systems tailored to[...]
    icon: 'FaBrain',
    category: 'Advanced Tech',
    features: ['Custom LLM Integrations', 'Predictive Analysis Engines', 'Computer Vision Pipeline', 'Natural Language Processing'],
  },
  {
    id: 'srv-soft',
    title: 'Enterprise Software Development',
    shortDesc: 'Scalable, high-performance software systems matching modern architectural standards.',
    description: 'Custom enterprise platforms engineered using microservices, event-driven designs, and cloud-native frameworks to ensure zero downtime and peak transactional performance.',
    icon: 'FaCode',
    category: 'Core Dev',
    features: ['Microservices Architecture', 'API Gateways & Integrations', 'Legacy Code Modernization', 'Robust Backends'],
  },
  {
    id: 'srv-cloud',
    title: 'Cloud Computing & Infrastructure',
    shortDesc: 'Accelerate infrastructure efficiency, cloud migrations, and serverless architectures.',
    description: 'End-to-end cloud strategies spanning AWS, Azure, and Google Cloud. We optimize cloud spend, orchestrate Kubernetes clusters, and build disaster-recovery plans.',
    icon: 'FaCloud',
    category: 'Infrastructure',
    features: ['Multi-Cloud Management', 'Kubernetes Orchestration', 'Cost Optimization Systems', 'Serverless Migration'],
  },
  {
    id: 'srv-cyber',
    title: 'Cybersecurity & Compliance',
    shortDesc: 'Shield your critical assets and ensure compliance with ISO, SOC2, and GDPR standards.',
    description: 'Comprehensive threat modeling, continuous penetration testing, security operations center (SOC) setups, identity management (IAM), and compliance auditing.',
    icon: 'FaShieldAlt',
    category: 'Security',
    features: ['Penetration Testing & Audits', 'Zero-Trust Architecture', 'Compliance Certification Support', 'Threat Detection & Monitoring'],
  },
  {
    id: 'srv-devops',
    title: 'DevOps & CI/CD Pipelines',
    shortDesc: 'Automate build pipelines and deployments to achieve daily code releases.',
    description: 'Infrastructure as Code (IaC) using Terraform, streamlined continuous integration pipelines (GitHub Actions/GitLab CI), and monitoring suites like Prometheus/Grafana.',
    icon: 'FaTerminal',
    category: 'Infrastructure',
    features: ['Infrastructure as Code (Terraform)', 'CI/CD Automation Assemblies', 'Prometheus & Grafana Alerting', 'Containerization (Docker)'],
  },
  {
    id: 'srv-ux',
    title: 'UI/UX Design & Prototyping',
    shortDesc: 'Aesthetic, intuitive, and highly research-driven web and mobile user interfaces.',
    description: 'We transform complex workflows into beautiful digital products. Our design process covers wireframing, high-fidelity interactive prototyping, design systems, and user testing.',
    icon: 'FaPalette',
    category: 'Design',
    features: ['UX Research & Wireframing', 'Figma Design System Libraries', 'Interactive Prototypes', 'Usability Testing Campaigns'],
  },
  {
    id: 'srv-data',
    title: 'Data Analytics & Big Data',
    shortDesc: 'Convert petabytes of raw system data into dashboards that drive board-level decisions.',
    description: 'Data engineering pipelines utilizing Apache Spark, Snowflake, and DBT, combined with rich business intelligence dashboard solutions using PowerBI, Tableau, and custom React chart[...]
    icon: 'FaChartBar',
    category: 'Advanced Tech',
    features: ['Data Pipeline Orchestration', 'Snowflake & BigQuery Data Warehousing', 'BI Custom Dashboard Engines', 'Real-time Analytics Streams'],
  },
  {
    id: 'srv-mobile',
    title: 'Mobile App Development',
    shortDesc: 'High-performance native and cross-platform applications for iOS and Android.',
    description: 'React Native and Flutter applications incorporating native module integrations, offline syncing databases, and frictionless animations that captivate mobile users.',
    icon: 'FaMobileAlt',
    category: 'Core Dev',
    features: ['Cross-Platform Apps', 'Offline-First Synchronization', 'Native Device API Access', 'App Store Optimization & Deployment'],
  },
];

export const initialPortfolios = [
  {
    id: 'port-01',
    title: 'DSNOVE AI Diagnostics Platform',
    category: 'AI',
    client: 'MediCore Solutions',
    image: portfolioAiImg,
    tags: ['Artificial Intelligence', 'HealthTech', 'Python', 'AWS'],
    challenge: 'Diagnosing medical scans manually creates substantial delays in high-priority clinical contexts, risking client outcome quality.',
    solution: 'DSNOVE engineered an AI vision classifier using Convolutional Neural Networks hosted on serverless GPUs, integrating seamlessly with clinic systems via secure REST APIs.',
    result: 'Reduced medical scan interpretation latency by 72% while maintaining a verified 98.4% diagnostic sensitivity rating.',
  },
  {
    id: 'port-02',
    title: 'Global Retail Cloud Migration',
    category: 'Cloud',
    client: 'Apex Retailers Inc.',
    image: portfolioCloudImg,
    tags: ['DevOps', 'Cloud Computing', 'Terraform', 'GCP'],
    challenge: 'Legacy on-premise transactional hardware struggled to scale under sudden e-commerce traffic spikes during holiday shopping seasons.',
    solution: 'DSNOVE migrated active retail microservices to Google Cloud Platform using Terraform GKE, creating dynamic autoscaling policies based on real-time requests.',
    result: 'Achieved 99.99% availability throughout Black Friday peak hours with a 38% reduction in overall hosting overhead costs.',
  },
  {
    id: 'port-03',
    title: 'Next-Gen Financial Security Core',
    category: 'Cybersecurity',
    client: 'Vault Mutual Bank',
    image: portfolioSecurityImg,
    tags: ['Cybersecurity', 'FinTech', 'Zero-Trust', 'React'],
    challenge: 'Rising sophisticated phishing and credential stuffing attacks targeted vault accounts, requiring advanced real-time security blocks.',
    solution: 'DSNOVE implemented zero-trust user authorization, hardware security token key integrations, and machine learning transaction threat monitoring.',
    result: 'Zero security breaches documented over a 12-month post-launch period, saving an estimated $4.2M in potential threat incidents.',
  },
  {
    id: 'port-04',
    title: 'Logistics Tracker Cross-Platform App',
    category: 'Mobile',
    client: 'SwiftCargo International',
    image: portfolioMobileImg,
    tags: ['React Native', 'Mobile Apps', 'NodeJS', 'MongoDB'],
    challenge: 'Delivery operators lost signal in rural regions, leading to tracking failures and communication gaps with the central shipping database.',
    solution: 'DSNOVE built a React Native app equipped with a local SQLite buffer database. Changes sync back to MongoDB automatically upon cellular signal restoration.',
    result: 'Successfully handled over 50,000 daily routes with 100% data integrity and real-time offline tracking accuracy.',
  },
  {
    id: 'port-05',
    title: 'Enterprise ERP Workspace System',
    category: 'Web',
    client: 'NovaCorp Industries',
    image: portfolioWebImg,
    tags: ['React.js', 'Enterprise Software', 'Data Analytics', 'PostgreSQL'],
    challenge: 'Department managers utilized separate, disconnected software systems for inventory, payroll, and invoicing, causing heavy scheduling conflicts.',
    solution: 'DSNOVE built a unified enterprise resource planning platform connecting inventory levels directly with client invoicing and logistics databases.',
    result: 'Saved administrative staff an average of 14 labor hours per week through consolidated reporting automations.',
  },
];

export const initialBlogs = [
  {
    id: 'blog-01',
    title: 'The Future of Generative AI in Enterprise Environments',
    summary: 'Explore how large language models are transitioning from simple chatbots to agentic workflows that redefine business processes.',
    content: 'Generative AI is shifting from conversational tools to autonomous agents. Enterprises are no longer just asking models to summarize text; they are designing agent loops that can que[...]
    author: 'Dharani D, Founder & Full Stack Developer',
    avatar: dharani,
    date: '2026-06-15',
    readTime: '6 min read',
    category: 'Artificial Intelligence',
    tags: ['AI', 'LLM', 'Enterprise', 'Security'],
  },
  {
    id: 'blog-02',
    title: 'Securing Cloud Environments: A Zero-Trust Framework Guide',
    summary: 'Standard security perimeters are obsolete. Learn why zero-trust architecture is the only way to safeguard decentralized networks.',
    content: 'With hybrid workspaces and multi-cloud architectures, the concept of a "trusted internal network" has vanished. Hackers who breach a perimeter firewall can easily traverse adjacent [...]
    author: 'Naveen, Backend Developer',
    avatar: naveen,
    date: '2026-06-20',
    readTime: '8 min read',
    category: 'Cybersecurity',
    tags: ['Security', 'Cloud', 'Infrastructure', 'Compliance'],
  },
  {
    id: 'blog-03',
    title: 'Building Accessible React Interfaces with Design Systems',
    summary: 'How DSNOVE crafts premium user experiences using component libraries, motion design, and accessibility-first workflows.',
    content: 'Modern enterprise dashboards demand more than functional layouts — they require intuitive navigation, consistent visual language, and inclusive design patterns that work across de[...]
    author: 'Naveen Raj, UI/UX Designer',
    avatar: naveenraj,
    date: '2026-06-24',
    readTime: '5 min read',
    category: 'Design',
    tags: ['UI/UX', 'React', 'Accessibility', 'Figma'],
  },
];

export const initialCareers = [
  {
    id: 'job-01',
    title: 'Senior React Frontend Developer',
    department: 'Web Development',
    location: 'Chennai, India / Remote',
    type: 'Full-time',
    description: 'Join the DSNOVE frontend team to build state-of-the-art interactive dashboards and client portals utilizing React, Vite, Framer Motion, and Three.js.',
    requirements: [
      '3+ years of experience with React and modern JavaScript',
      'In-depth knowledge of React hooks, context APIs, and component architecture',
      'Strong portfolio featuring responsive CSS and interactive animations',
      'Familiarity with performance optimization for SPAs',
    ],
    benefits: ['Competitive Salary', 'Flexible Remote Work', 'Health Coverage', 'Learning Budget'],
  },
  {
    id: 'job-02',
    title: 'Backend Engineer (Node.js / Python)',
    department: 'Backend Engineering',
    location: 'Chennai, India / Hybrid',
    type: 'Full-time',
    description: 'DSNOVE is seeking a backend engineer to design RESTful APIs, manage database schemas, and deploy scalable microservices on cloud infrastructure.',
    requirements: [
      '3+ years building production APIs with Node.js or Python',
      'Experience with PostgreSQL, MongoDB, or similar databases',
      'Understanding of authentication, caching, and message queues',
      'Familiarity with Docker and CI/CD pipelines',
    ],
    benefits: ['Top-tier Salary', 'Annual Tech Allowance', 'Paid Time Off', 'Team Events'],
  },
  {
    id: 'job-03',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote (India)',
    type: 'Full-time',
    description: 'Help DSNOVE clients visualize complex enterprise workflows through research-driven wireframes, high-fidelity prototypes, and cohesive design systems.',
    requirements: [
      '2+ years of product design experience',
      'Expert proficiency in Figma and prototyping tools',
      'Portfolio demonstrating web and mobile interface design',
      'Understanding of accessibility and responsive design principles',
    ],
    benefits: ['Flexible Hours', 'Creative Freedom', 'Professional Training Budget', 'Remote-first Culture'],
  },
];

export const initialTeam = [
  {
    id: 'team-01',
    name: 'Dharani D',
    role: 'Founder & Full Stack Developer',
    image: dharani,
    bio: 'Founder of DSNOVE. Leads full-stack architecture, AI integrations, and enterprise delivery across cloud-native platforms.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/dharani-d-dsnove',
      github: 'https://github.com/dharani-d',
    },
  },
  {
    id: 'team-02',
    name: 'Shri Haran',
    role: 'Frontend Developer',
    image: shriharan,
    bio: 'Builds high-performance React interfaces, animation systems, and client-facing portals with a focus on accessibility and polish.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/shriharan-dev',
      github: 'https://github.com/shriharan-dev',
    },
  },
  {
    id: 'team-03',
    name: 'Naveen',
    role: 'Backend Developer',
    image: naveen,
    bio: 'Architects robust APIs, database schemas, and DevOps pipelines. Specializes in Node.js, Python, and cloud infrastructure automation.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/naveen-dev',
      github: 'https://github.com/naveen-dev',
    },
  },
  {
    id: 'team-04',
    name: 'Naveen Raj',
    role: 'UI/UX Designer',
    image: naveenraj,
    bio: 'Crafts research-driven design systems, wireframes, and interactive prototypes that transform complex workflows into intuitive experiences.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/naveenraj-ui',
      github: 'https://github.com/naveenraj-ui',
    },
  },
];

export const initialTestimonials = [
  {
    id: 'test-01',
    name: 'Robert Carter',
    role: 'Director of Technology',
    company: 'MediCore Solutions',
    quote: 'The AI diagnostic platform developed by DSNOVE transformed our operations. Dharani and the team delivered a complex neural model under tight timelines with remarkable precision.',
    avatar: avatarClientImg,
  },
  {
    id: 'test-02',
    name: 'Elena Rostova',
    role: 'VP of Operations',
    company: 'Apex Retailers Inc.',
    quote: 'DSNOVE handled our massive GCP cloud migration with surgical precision. Our hosting costs dropped immediately, and system stability is the best it has ever been.',
    avatar: avatarClientImg,
  },
  {
    id: 'test-03',
    name: 'Jonathan Miller',
    role: 'Information Security Lead',
    company: 'Vault Mutual Bank',
    quote: 'Their zero-trust cybersecurity blueprint gave us the confidence to launch our digital banking platform. The DSNOVE team are extremely skilled operators.',
    avatar: avatarClientImg,
  },
];

const seedClientData = () => {
  if (!localStorage.getItem('dsnove_clients')) {
    const defaultClients = [
      {
        id: 'client-demo',
        name: 'John Doe',
        email: 'client@company.com',
        password: 'client123',
        company: 'MediCore Solutions',
        phone: '+91 (987) 654-3210',
        avatar: avatarClientImg,
      },
    ];
    localStorage.setItem('dsnove_clients', JSON.stringify(defaultClients));
  }

  if (!localStorage.getItem('dsnove_invoices')) {
    const seedInvoices = [
      { id: 'INV-4829', project: 'AI Diagnostic Classifier', date: '2026-05-10', amount: 24500.0, status: 'Paid' },
      { id: 'INV-5011', project: 'API Gateway Integration', date: '2026-06-01', amount: 8900.0, status: 'Paid' },
      { id: 'INV-5203', project: 'Support & Maintenance (Q2)', date: '2026-06-25', amount: 3500.0, status: 'Pending' },
    ];
    localStorage.setItem('dsnove_invoices', JSON.stringify(seedInvoices));
  }

  if (!localStorage.getItem('dsnove_milestones')) {
    const seedMilestones = [
      { id: 'm-1', title: 'Phase 1: Architecture Blueprint & UX Wireframes', date: '2026-05-15', status: 'completed' },
      { id: 'm-2', title: 'Phase 2: Core ML Pipeline Setup & API Testing', date: '2026-06-05', status: 'completed' },
      { id: 'm-3', title: 'Phase 3: Client Portal & Analytics Panel Integration', date: '2026-06-20', status: 'active' },
      { id: 'm-4', title: 'Phase 4: Multi-Cloud Deployment Dry-Runs (GCP/AWS)', date: '2026-07-10', status: 'pending' },
      { id: 'm-5', title: 'Phase 5: Production Handover & Penetration Audit', date: '2026-07-25', status: 'pending' },
    ];
    localStorage.setItem('dsnove_milestones', JSON.stringify(seedMilestones));
  }

  if (!localStorage.getItem('dsnove_tickets')) {
    const seedTickets = [
      {
        id: 'TCK-2940',
        subject: 'Slow scan API requests under load',
        department: 'Engineering',
        priority: 'High',
        status: 'In-Progress',
        createdAt: '2026-06-22',
        messages: [
          { sender: 'client', text: 'Hi, we notice latency spikes up to 4.2 seconds when processing concurrent scans. Can you look into this?', date: '2026-06-22 10:14 AM' },
          { sender: 'admin', text: 'Hello John, we are analyzing the container logs. It looks like auto-scaling triggers are set slightly too high. We are lowering the CPU thresholds to trigger s[...]
        ],
      },
      {
        id: 'TCK-3011',
        subject: 'Billing info update request',
        department: 'Billing',
        priority: 'Low',
        status: 'Resolved',
        createdAt: '2026-06-24',
        messages: [
          { sender: 'client', text: 'Please update our VAT registration details on the next billing invoice cycle.', date: '2026-06-24 09:00 AM' },
          { sender: 'admin', text: 'Details updated. You can check the refreshed invoice INV-5203 inside your billing panel.', date: '2026-06-24 11:30 AM' },
        ],
      },
    ];
    localStorage.setItem('dsnove_tickets', JSON.stringify(seedTickets));
  }

  if (!localStorage.getItem('dsnove_messages')) {
    const seedMessages = [
      { sender: 'pm', text: 'Welcome to your DSNOVE Client Portal! Here you can check progress, review tickets, and chat with me directly.', date: '2026-06-01 10:00 AM' },
      { sender: 'client', text: 'Thanks! The UI design is incredibly sleek. Excited to kick off.', date: '2026-06-01 10:15 AM' },
      { sender: 'pm', text: 'Perfect. We have uploaded the wireframe PDF. You can view it under your projects tab.', date: '2026-06-15 03:00 PM' },
    ];
    localStorage.setItem('dsnove_messages', JSON.stringify(seedMessages));
  }

  if (!localStorage.getItem('dsnove_enquiries')) {
    const seedEnquiries = [
      { id: 'enq-01', name: 'James Carter', email: 'james@vertex.com', subject: 'Enterprise Cloud Support Query', message: 'Hello, we are seeking custom Kubernetes support and architectural asses[...]
      { id: 'enq-02', name: 'Laura Bailey', email: 'laura@cyberdyn.co', subject: 'Custom AI Chatbot Implementation', message: 'Hi! We would like to configure a private RAG database utilizing our [...]
    ];
    localStorage.setItem('dsnove_enquiries', JSON.stringify(seedEnquiries));
  }
};

const seedCmsData = () => {
  localStorage.setItem('dsnove_services', JSON.stringify(initialServices));
  localStorage.setItem('dsnove_portfolios', JSON.stringify(initialPortfolios));
  localStorage.setItem('dsnove_blogs', JSON.stringify(initialBlogs));
  localStorage.setItem('dsnove_careers', JSON.stringify(initialCareers));
  localStorage.setItem('dsnove_testimonials', JSON.stringify(initialTestimonials));
  localStorage.setItem('dsnove_team', JSON.stringify(initialTeam));
  localStorage.setItem('dsnove_settings', JSON.stringify({
    companyName: 'DSNOVE',
    tagline: 'Futuristic Enterprise Technology Systems',
    email: 'contact@dsnove.com',
    phone: '+91 (800) 555-NOVE',
    address: 'DSNOVE Tech Park, Chennai, India',
    showPromoBanner: true,
    promoBannerText: '🔥 DSNOVE recognized as top digital innovator in Q2 2026!',
  }));
};

export const initializeDatabase = () => {
  try {
    const storedVersion = localStorage.getItem('dsnove_data_version');

    if (storedVersion !== DATA_VERSION) {
      localStorage.setItem('dsnove_data_version', DATA_VERSION);
      seedCmsData();
    } else {
      if (!localStorage.getItem('dsnove_services')) {
        localStorage.setItem('dsnove_services', JSON.stringify(initialServices));
      }
      if (!localStorage.getItem('dsnove_portfolios')) {
        localStorage.setItem('dsnove_portfolios', JSON.stringify(initialPortfolios));
      }
      if (!localStorage.getItem('dsnove_blogs')) {
        localStorage.setItem('dsnove_blogs', JSON.stringify(initialBlogs));
      }
      if (!localStorage.getItem('dsnove_careers')) {
        localStorage.setItem('dsnove_careers', JSON.stringify(initialCareers));
      }
      if (!localStorage.getItem('dsnove_testimonials')) {
        localStorage.setItem('dsnove_testimonials', JSON.stringify(initialTestimonials));
      }
      if (!localStorage.getItem('dsnove_team')) {
        localStorage.setItem('dsnove_team', JSON.stringify(initialTeam));
      }
      if (!localStorage.getItem('dsnove_settings')) {
        localStorage.setItem('dsnove_settings', JSON.stringify({
          companyName: 'DSNOVE',
          tagline: 'Futuristic Enterprise Technology Systems',
          email: 'contact@dsnove.com',
          phone: '+91 (800) 555-NOVE',
          address: 'DSNOVE Tech Park, Chennai, India',
          showPromoBanner: true,
          promoBannerText: '🔥 DSNOVE recognized as top digital innovator in Q2 2026!',
        }));
      }
    }

    seedClientData();
  } catch (error) {
    console.error('Failed to initialize DSNOVE localStorage database:', error);
  }
};
