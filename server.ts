import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dbService } from './src/server/db';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Routes
  // 1. Health & Database Status
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json(dbService.getStatus());
  });

  // 2. Profile Information
  app.get('/api/profile', (_req: Request, res: Response) => {
    res.json({
      name: 'Suhail Hossain',
      role: 'MERN Stack Developer',
      location: 'Available Globally / Remote',
      email: 'suhail0168@gmail.com',
      github: 'https://github.com/SuhailDE',
      linkedin: 'https://linkedin.com/in/suhail-hossain',
      bio: 'Enthusiastic entry-level Full-Stack MERN developer dedicated to crafting modern, responsive web applications with clean UI, robust backend architecture, and smooth user experiences.',
      experienceYears: 'Entry-Level / Project-Driven',
      availability: 'Open to opportunities (Junior / Entry-Level / Internship / Freelance)',
      stats: {
        projectsCompleted: '4+ Major Apps',
        clientSatisfaction: '100%',
        githubCommits: '500+ Commits',
        codeUptime: '99.9%'
      }
    });
  });

  // 3. Projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const { category, tag } = req.query;
      const projects = await dbService.getProjects(
        typeof category === 'string' ? category : undefined,
        typeof tag === 'string' ? tag : undefined
      );
      res.json(projects);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const project = await dbService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 4. Skills
  app.get('/api/skills', async (_req: Request, res: Response) => {
    try {
      const skills = await dbService.getSkills();
      res.json(skills);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 5. Testimonials / Reviews
  app.get('/api/reviews', async (_req: Request, res: Response) => {
    try {
      const reviews = await dbService.getReviews();
      res.json(reviews);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post('/api/reviews', async (req: Request, res: Response) => {
    try {
      const { name, role, company, content, rating } = req.body;
      if (!name || !content || !role) {
        return res.status(400).json({ error: 'Name, role, and feedback content are required.' });
      }
      const newReview = await dbService.addReview({
        name: String(name).trim(),
        role: String(role).trim(),
        company: company ? String(company).trim() : 'Tech Industry',
        content: String(content).trim(),
        rating: Math.min(5, Math.max(1, Number(rating) || 5))
      });
      res.status(201).json(newReview);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 6. Messages / Contact submissions
  app.get('/api/messages', async (_req: Request, res: Response) => {
    try {
      const messages = await dbService.getMessages();
      res.json(messages);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message, projectType } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required fields.' });
      }

      // Basic email check
      if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }

      const newMessage = await dbService.addMessage({
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: subject ? String(subject).trim() : 'General Inquiry',
        message: String(message).trim(),
        projectType: projectType ? String(projectType).trim() : 'Web Development'
      });

      res.status(201).json({
        success: true,
        message: 'Your message has been successfully saved to the database. Suhail will reply promptly!',
        data: newMessage
      });
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.patch('/api/messages/:id/read', async (req: Request, res: Response) => {
    try {
      const updated = await dbService.toggleMessageRead(req.params.id);
      if (!updated) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(updated);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.delete('/api/messages/:id', async (req: Request, res: Response) => {
    try {
      const deleted = await dbService.deleteMessage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ success: true, deletedId: req.params.id });
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 7. Interactive MongoDB Playground query
  app.post('/api/mongo/query', async (req: Request, res: Response) => {
    try {
      const { collection, operation, filter } = req.body;
      if (!collection || !operation) {
        return res.status(400).json({ error: 'Collection and operation are required.' });
      }
      const result = await dbService.executePlaygroundQuery(collection, operation, filter);
      res.json({ ok: 1, result });
    } catch (err: unknown) {
      res.status(400).json({ ok: 0, error: (err as Error).message });
    }
  });

  // Vite Integration
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Suhail Hossain Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
