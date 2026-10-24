import fs from 'fs';
import path from 'path';
import { Project, SkillCategory, ContactMessage, Review } from '../types/portfolio';

// Initial Seed Data
const initialProjects: Project[] = [
  {
    _id: 'proj_01',
    title: 'ShopSphere — Full-Stack MERN E-Commerce',
    slug: 'shopsphere-ecommerce',
    category: 'Full-Stack',
    tagline: 'High-performance digital marketplace with real-time inventory, Stripe payments, and admin analytics.',
    description: 'A production-grade e-commerce application built on the MERN stack with JWT authentication, Redux Toolkit state management, order tracking, and a comprehensive seller analytics dashboard.',
    longDescription: 'ShopSphere was engineered to solve high-concurrency cart synchronization and real-time inventory updates. Built using React on the frontend with custom Tailwind UI components, Express REST APIs on Node.js, and MongoDB with compound indexes for instant sub-20ms product searches.',
    image: '/src/assets/images/project_ecommerce_mern_1792811661296.jpg',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit', 'Stripe API'],
    features: [
      'JWT Authentication & Role-Based Access Control (Admin / Vendor / Customer)',
      'MongoDB Aggregation Pipelines for daily sales & conversion analytics',
      'Real-time inventory deduction with atomic transaction handling',
      'Instant search and faceted filtering across categories and price ranges',
      'Fully responsive checkout flow optimized for mobile conversions'
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Redux Toolkit', 'Vite'],
      backend: ['Node.js', 'Express.js', 'JWT Auth', 'Stripe SDK'],
      database: ['MongoDB', 'Mongoose Schemas', 'Aggregation Pipelines']
    },
    demoUrl: 'https://shopsphere-preview.web.app',
    githubUrl: 'https://github.com/SuhailDE/shopsphere-mern',
    metrics: '$42k+ Mock Volume · <20ms Query Times · 99.8% Uptime',
    apiEndpoints: [
      'POST /api/auth/register & /login',
      'GET /api/products?category=&search=&sort=',
      'POST /api/orders (atomic transaction)',
      'GET /api/analytics/sales-overview'
    ],
    dbSchemaSummary: 'Collections: users, products, orders, categories, reviews. Indexed on product title, slug, and vendorId.',
    featured: true
  },
  {
    _id: 'proj_02',
    title: 'DevPulse — Developer Collaboration Hub',
    slug: 'devpulse-hub',
    category: 'Full-Stack',
    tagline: 'Real-time collaborative developer platform for sharing code snippets, repository architecture, and sprint reviews.',
    description: 'Full-stack platform empowering engineering teams to share syntax-highlighted snippets, engage in threaded technical discussions, and review pull requests collaboratively.',
    longDescription: 'DevPulse enables teams to create modular engineering workspaces. Features rich markdown parsing, interactive code run preview, granular team permissions, and optimized MongoDB document nesting for high-speed discussion rendering.',
    image: '/src/assets/images/project_devpulse_hub_1792811662342.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'WebSockets', 'Tailwind CSS'],
    features: [
      'Live syntax highlighting with instant multi-language formatting',
      'MongoDB threaded comment architecture with parent-child references',
      'Real-time notifications via lightweight WebSocket events',
      'GitHub OAuth and personal access token repository synchronization',
      'Clean dark-mode interface built for prolonged developer focus'
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Prism.js', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'Socket.io', 'Bcrypt.js'],
      database: ['MongoDB', 'Mongoose', 'Nested Discussion Documents']
    },
    demoUrl: 'https://devpulse-preview.web.app',
    githubUrl: 'https://github.com/SuhailDE/devpulse-hub',
    metrics: '150+ Daily Active Users · 1.2s Page Load · 100% Mobile Ready',
    apiEndpoints: [
      'GET /api/snippets/trending',
      'POST /api/snippets/:id/discussions',
      'GET /api/workspaces/:workspaceId',
      'POST /api/sync/github'
    ],
    dbSchemaSummary: 'Collections: users, workspaces, snippets, discussions, tags. Compound index on (workspaceId, createdAt).',
    featured: true
  },
  {
    _id: 'proj_03',
    title: 'TaskFlow — Agile Kanban Workflow Manager',
    slug: 'taskflow-kanban',
    category: 'Full-Stack',
    tagline: 'Streamlined project tracking with drag-and-drop boards, sprint planning, and team velocity metrics.',
    description: 'An agile task management solution engineered for rapid sprint execution. Provides interactive drag-and-drop reordering, assignee filtering, and instant MongoDB state synchronization.',
    longDescription: 'Built to streamline sprint ceremonies. Utilizes optimized MongoDB arrays with positional updates (`$set`, `$position`) for sub-millisecond task column shifts, combined with optimistic UI updates in React.',
    image: '/src/assets/images/project_taskflow_kanban_1792811662391.jpg',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST API'],
    features: [
      'Fluid Drag and Drop task board with optimistic client-side feedback',
      'Custom workflows: Backlog, To Do, In Progress, Review, Blocked, Done',
      'MongoDB atomic positional updates for priority reordering',
      'Sprint velocity calculation and burndown chart analytics',
      'Export sprint summary to JSON / CSV format'
    ],
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Lucide Icons', 'HTML5 DnD'],
      backend: ['Node.js', 'Express.js', 'CORS', 'Validator'],
      database: ['MongoDB', 'Mongoose Array Subdocuments']
    },
    demoUrl: 'https://taskflow-preview.web.app',
    githubUrl: 'https://github.com/SuhailDE/taskflow-kanban',
    metrics: '60 FPS Interactions · Zero Stutter Drag & Drop · 100% Type-Safe',
    apiEndpoints: [
      'GET /api/boards/:id',
      'PATCH /api/tasks/:id/move',
      'POST /api/sprints/create',
      'GET /api/boards/:id/velocity'
    ],
    dbSchemaSummary: 'Collections: boards, columns, tasks, sprints. Subdocument indexing for ultra-fast column rendering.',
    featured: true
  },
  {
    _id: 'proj_04',
    title: 'StreamSync — Video & Media Streaming Platform',
    slug: 'streamsync-media',
    category: 'Full-Stack',
    tagline: 'Modern media platform with adaptive bit-rate playback, creator channels, and real-time interaction.',
    description: 'A responsive video sharing and streaming application featuring user channel management, video metadata indexing, custom playlists, and live stream notifications.',
    longDescription: 'StreamSync is designed with high-throughput video metadata streaming in mind. Uses MongoDB GridFS and CDN-backed storage references, with optimized pagination and video recommendation algorithms.',
    image: '/src/assets/images/project_streamsync_media_1792811662393.jpg',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloud Storage'],
    features: [
      'Custom HTML5 video player with keyboard shortcuts and playback speed control',
      'Channel subscriptions, video liking, and nested comments',
      'MongoDB cursor-based infinite scroll pagination for feed performance',
      'Responsive video grid layout with dark mode first aesthetics',
      'Video tag search with fuzzy matching indexing'
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Video.js API', 'Context API'],
      backend: ['Node.js', 'Express', 'Multer', 'FFmpeg Transcoding'],
      database: ['MongoDB', 'Text Indexes', 'Cursor Pagination']
    },
    demoUrl: 'https://streamsync-preview.web.app',
    githubUrl: 'https://github.com/SuhailDE/streamsync-platform',
    metrics: '450k+ Mock Views · Adaptive Streaming · <150ms API Latency',
    apiEndpoints: [
      'GET /api/videos/feed?cursor=',
      'POST /api/videos/upload',
      'POST /api/videos/:id/like',
      'GET /api/channels/:username'
    ],
    dbSchemaSummary: 'Collections: videos, channels, comments, playlists. MongoDB text indexes on title and description.',
    featured: true
  }
];

const initialSkills: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Engineering responsive, accessible, high-performance user interfaces with clean architecture.',
    skills: [
      { name: 'React.js (18 / 19)', level: 90, experience: 'Core Focus', highlight: true, description: 'Hooks, Suspense, Context, Custom Hooks, Functional Components' },
      { name: 'Tailwind CSS', level: 95, experience: 'Proficient', highlight: true, description: 'Modern responsive utility-first design, dark mode, custom styling' },
      { name: 'JavaScript (ES6+)', level: 92, experience: 'Strong Foundation', highlight: true, description: 'Async/Await, Closures, Event Loop, DOM API, Functional Patterns' },
      { name: 'TypeScript', level: 85, experience: 'Hands-on Projects', highlight: true, description: 'Generics, Strict type-checking, Utility types, Interfaces' },
      { name: 'HTML5 & Modern CSS3', level: 95, experience: 'Proficient', highlight: false, description: 'Semantic markup, Flexbox, Grid, CSS Variables, SVG' },
      { name: 'Redux Toolkit / Context', level: 84, experience: 'Practical Application', highlight: false, description: 'Global state management, slices, store dispatching' },
      { name: 'Next.js (App Router)', level: 80, experience: 'Continuous Learning', highlight: false, description: 'SSR, Server Components, Route Handlers' }
    ]
  },
  {
    title: 'Backend Engineering',
    description: 'Building secure, scalable, event-driven RESTful APIs and server architectures.',
    skills: [
      { name: 'Node.js', level: 88, experience: 'Core Focus', highlight: true, description: 'Event-driven I/O, File System, Streams, Modules, npm ecosystem' },
      { name: 'Express.js', level: 90, experience: 'Proficient', highlight: true, description: 'Middleware chaining, routing, error handling, CORS, status codes' },
      { name: 'RESTful API Design', level: 92, experience: 'Proficient', highlight: true, description: 'HTTP methods, URI conventions, JSON formatting, validation' },
      { name: 'Authentication & Security', level: 86, experience: 'Hands-on Projects', highlight: true, description: 'JWT tokens, Bcrypt password hashing, protected routes' },
      { name: 'WebSockets', level: 80, experience: 'Practical Application', highlight: false, description: 'Real-time bidirectional event listeners and chat' },
      { name: 'MVC Architecture', level: 85, experience: 'Strong Foundation', highlight: false, description: 'Separation of concerns: Controllers, Routes, Models' }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Designing normalized & denormalized schemas, query optimization, and transaction handling.',
    skills: [
      { name: 'MongoDB', level: 90, experience: 'Core Focus', highlight: true, description: 'NoSQL architecture, BSON document modeling, CRUD operations' },
      { name: 'Mongoose ODM', level: 90, experience: 'Proficient', highlight: true, description: 'Schemas, models, validation, middleware, population' },
      { name: 'Aggregation & Queries', level: 85, experience: 'Hands-on Projects', highlight: true, description: '$match, $group, $lookup, sorting, filtering, and indexing' },
      { name: 'MongoDB Atlas', level: 88, experience: 'Hands-on Projects', highlight: false, description: 'Cloud database clusters, network access, connection strings' },
      { name: 'Relational SQL Basics', level: 78, experience: 'Academic Foundation', highlight: false, description: 'Tables, keys, JOIN concepts, basic relational modeling' }
    ]
  },
  {
    title: 'DevOps & Development Tools',
    description: 'Version control, automated builds, testing, and modern cloud deployment environments.',
    skills: [
      { name: 'Git & GitHub', level: 90, experience: 'Daily Use', highlight: true, description: 'Commits, branch workflows, pull requests, issue tracking' },
      { name: 'Postman & API Testing', level: 90, experience: 'Proficient', highlight: true, description: 'Endpoint testing, header validation, automated requests' },
      { name: 'Vite & Tooling', level: 88, experience: 'Proficient', highlight: false, description: 'Fast dev server, bundle builds, modern toolchains' },
      { name: 'Cloud Deployment', level: 85, experience: 'Hands-on Projects', highlight: false, description: 'Vercel, Render, Cloud Run, GitHub Pages' },
      { name: 'Linux / Bash Basics', level: 82, experience: 'Practical Application', highlight: false, description: 'Command line terminal navigation, npm scripts, git CLI' }
    ]
  }
];

const initialReviews: Review[] = [
  {
    _id: 'rev_01',
    name: 'David Reynolds',
    role: 'Tech Mentor & Senior Engineer',
    company: 'Open Source Community',
    content: "Suhail's ability to quickly grasp full-stack concepts and build complete end-to-end applications in React and Express is remarkable. His code is clean, modular, and he shows great curiosity and dedication to learning best practices.",
    rating: 5,
    date: 'February 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
  },
  {
    _id: 'rev_02',
    name: 'Sarah Chen',
    role: 'Project Collaborator',
    company: 'Web Developers Guild',
    content: 'Collaborating with Suhail on MERN stack projects has been fantastic. He tackled the MongoDB schema and REST API endpoints with precision, delivering a responsive user experience with great attention to detail.',
    rating: 5,
    date: 'January 2026',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80'
  },
  {
    _id: 'rev_03',
    name: 'Marcus Vance',
    role: 'Startup Founder & Reviewer',
    company: 'NextGen Projects',
    content: 'Suhail built a responsive, modern web application with impressive enthusiasm and reliability. He is a fast learner, communicates proactively, and has a strong foundation across both frontend and backend.',
    rating: 5,
    date: 'December 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
  }
];

const initialMessages: ContactMessage[] = [
  {
    _id: 'msg_01',
    name: 'Alexandria Miller',
    email: 'alex@innovatetech.io',
    subject: 'Full-Stack MERN Developer Contract Opportunity',
    projectType: 'Full-time / Contract',
    message: 'Hi Suhail, we reviewed your MERN stack portfolio and were very impressed with your ShopSphere architecture and MongoDB query handling. We have an upcoming SaaS portal project and would love to schedule a brief intro call with you.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isRead: false
  }
];

// Document database manager
class MongoDatabaseService {
  private dataDir = path.resolve(process.cwd(), '.data');
  private dbPath = path.resolve(process.cwd(), '.data', 'mongo_portfolio.json');
  private isConnected = true;
  private isAtlas = false;
  private startTime = Date.now();

  private projects: Project[] = [];
  private skills: SkillCategory[] = [];
  private reviews: Review[] = [];
  private messages: ContactMessage[] = [];

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.projects = parsed.projects || initialProjects;
        this.skills = parsed.skills || initialSkills;
        this.reviews = parsed.reviews || initialReviews;
        this.messages = parsed.messages || initialMessages;
      } else {
        this.projects = [...initialProjects];
        this.skills = [...initialSkills];
        this.reviews = [...initialReviews];
        this.messages = [...initialMessages];
        this.saveToFile();
      }
    } catch (err) {
      console.warn('Error reading local db file, defaulting to memory store:', err);
      this.projects = [...initialProjects];
      this.skills = [...initialSkills];
      this.reviews = [...initialReviews];
      this.messages = [...initialMessages];
    }
  }

  private saveToFile() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      const data = {
        projects: this.projects,
        skills: this.skills,
        reviews: this.reviews,
        messages: this.messages,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to local database store:', err);
    }
  }

  // Database status
  public getStatus() {
    return {
      status: 'online' as const,
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      nodeVersion: process.version,
      database: {
        type: this.isAtlas ? ('MongoDB Atlas' as const) : ('Embedded Mongo-Compatible Store' as const),
        connected: this.isConnected,
        collections: {
          projects: this.projects.length,
          skills: this.skills.length,
          messages: this.messages.length,
          reviews: this.reviews.length
        }
      }
    };
  }

  // Projects CRUD
  public async getProjects(category?: string, tag?: string): Promise<Project[]> {
    let result = [...this.projects];
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      result = result.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    return result;
  }

  public async getProjectById(id: string): Promise<Project | null> {
    return this.projects.find(p => p._id === id || p.slug === id) || null;
  }

  // Skills
  public async getSkills(): Promise<SkillCategory[]> {
    return this.skills;
  }

  // Reviews CRUD
  public async getReviews(): Promise<Review[]> {
    return this.reviews;
  }

  public async addReview(reviewData: Omit<Review, '_id' | 'date'>): Promise<Review> {
    const newReview: Review = {
      _id: `rev_${Date.now()}`,
      ...reviewData,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    this.reviews.unshift(newReview);
    this.saveToFile();
    return newReview;
  }

  // Messages CRUD
  public async getMessages(): Promise<ContactMessage[]> {
    return this.messages;
  }

  public async addMessage(messageData: Omit<ContactMessage, '_id' | 'createdAt' | 'isRead'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      _id: `msg_${Date.now()}`,
      ...messageData,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    this.messages.unshift(newMessage);
    this.saveToFile();
    return newMessage;
  }

  public async toggleMessageRead(id: string): Promise<ContactMessage | null> {
    const msg = this.messages.find(m => m._id === id);
    if (!msg) return null;
    msg.isRead = !msg.isRead;
    this.saveToFile();
    return msg;
  }

  public async deleteMessage(id: string): Promise<boolean> {
    const initialLen = this.messages.length;
    this.messages = this.messages.filter(m => m._id !== id);
    if (this.messages.length !== initialLen) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // Interactive Mongo Playground query executor
  public async executePlaygroundQuery(collection: string, operation: string, filterStr?: string): Promise<unknown> {
    let targetData: unknown[] = [];
    if (collection === 'projects') targetData = this.projects;
    else if (collection === 'skills') targetData = this.skills;
    else if (collection === 'reviews') targetData = this.reviews;
    else if (collection === 'messages') targetData = this.messages;
    else {
      throw new Error(`Collection "${collection}" does not exist. Available: projects, skills, reviews, messages.`);
    }

    if (operation === 'countDocuments') {
      return { collection, count: targetData.length, executedAt: new Date().toISOString() };
    }

    if (operation === 'find') {
      let filtered = [...targetData];
      if (filterStr && filterStr.trim()) {
        try {
          const filter = JSON.parse(filterStr);
          filtered = filtered.filter(item => {
            const record = item as Record<string, unknown>;
            for (const key of Object.keys(filter)) {
              if (Array.isArray(record[key])) {
                const arr = record[key] as unknown[];
                if (!arr.includes(filter[key])) return false;
              } else if (record[key] !== filter[key]) {
                return false;
              }
            }
            return true;
          });
        } catch {
          // If not valid json, ignore filter and return all
        }
      }
      return {
        collection,
        operation: 'find',
        count: filtered.length,
        results: filtered
      };
    }

    if (operation === 'stats') {
      return {
        ns: `portfolio_db.${collection}`,
        count: targetData.length,
        size: `${(JSON.stringify(targetData).length / 1024).toFixed(2)} KB`,
        storageSize: '16 KB',
        indexes: 2,
        ok: 1
      };
    }

    throw new Error(`Unsupported operation: ${operation}. Try "find", "countDocuments", or "stats".`);
  }
}

export const dbService = new MongoDatabaseService();
