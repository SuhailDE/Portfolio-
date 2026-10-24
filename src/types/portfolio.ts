export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Database';
  tagline: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  features: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
  };
  demoUrl: string;
  githubUrl: string;
  metrics?: string;
  apiEndpoints?: string[];
  dbSchemaSummary?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    experience: string;
    icon?: string;
    highlight?: boolean;
    description?: string;
  }[];
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  createdAt: string;
  isRead: boolean;
}

export interface Review {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface ServerStatus {
  status: 'online' | 'degraded';
  uptimeSeconds: number;
  nodeVersion: string;
  database: {
    type: 'MongoDB Atlas' | 'Embedded Mongo-Compatible Store';
    connected: boolean;
    collections: {
      projects: number;
      skills: number;
      messages: number;
      reviews: number;
    };
  };
}
