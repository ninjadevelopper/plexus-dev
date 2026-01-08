
export interface Project {
  id: string;
  name: string;
  description: string;
  stars: number;
  tags: string[];
  owner: User;
  updatedAt: string;
  githubUrl?: string;
}

export interface Reply {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: User;
  category: 'General' | 'Q&A' | 'Showcase' | 'Ideas';
  replies: number;
  upvotes: number;
  createdAt: string;
  repliesList?: Reply[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  followers?: number;
  following?: number;
}

export type View = 'home' | 'discussions' | 'projects' | 'explore' | 'notifications' | 'profile' | 'settings' | 'auth' | 'terms' | 'privacy' | 'docs' | 'contact';

export const MOCK_REPLIES: Reply[] = [
  {
    id: 'r1',
    content: 'Acredito que para times grandes, CSS Modules ainda é a opção mais segura pela tipagem e isolamento sem o custo de runtime de algumas libs de CSS-in-JS.',
    author: { id: 'u4', name: 'Julia Silva', username: 'jsilva_dev', avatar: 'https://picsum.photos/seed/u4/40/40' },
    createdAt: '2h atrás',
    upvotes: 12
  },
  {
    id: 'r2',
    content: 'Zustand é sensacional. Migrei um projeto enorme de Redux para Zustand em 2 dias e o bundle size caiu bastante.',
    author: { id: 'u5', name: 'Ricardo Santos', username: 'rick_code', avatar: 'https://picsum.photos/seed/u5/40/40' },
    createdAt: '5h atrás',
    upvotes: 8
  }
];

export const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    title: 'What are the best practices for scalable CSS in 2024?',
    content: 'I have been using Tailwind for a while, but I wonder if large teams prefer CSS-in-JS or modules for enterprise apps. My current project is growing fast and class management is becoming a challenge.',
    author: { id: 'u1', name: 'Alex Rivera', username: 'arivera', avatar: 'https://picsum.photos/seed/u1/40/40' },
    category: 'General',
    replies: 24,
    upvotes: 142,
    createdAt: 'Oct 24, 2023',
    repliesList: [MOCK_REPLIES[0]]
  },
  {
    id: '2',
    title: 'Showcase: My minimal pomodoro app',
    content: 'Just finished building a tiny pomodoro timer with no dependencies. Looking for feedback on the UI/UX. It uses native notifications and local storage.',
    author: { id: 'u2', name: 'Elena Gilbert', username: 'egilbert', avatar: 'https://picsum.photos/seed/u2/40/40' },
    category: 'Showcase',
    replies: 12,
    upvotes: 88,
    createdAt: 'Nov 01, 2023',
    repliesList: []
  },
  {
    id: '3',
    title: 'How to handle global state without Redux?',
    content: 'Redux feels overkill for my small app. What are your favorite lightweight alternatives? I heard about Zustand and Jotai, but I am not sure which one fits a multi-step form better.',
    author: { id: 'u3', name: 'Marcus Aurelius', username: 'stoic_coder', avatar: 'https://picsum.photos/seed/u3/40/40' },
    category: 'Q&A',
    replies: 56,
    upvotes: 231,
    createdAt: 'Oct 15, 2023',
    repliesList: [MOCK_REPLIES[1]]
  },
  {
    id: '4',
    title: 'A ética da arte generativa em 2024',
    content: 'Com o avanço rápido das ferramentas de IA, como devemos nos posicionar em relação aos direitos autorais dos artistas originais?',
    author: { id: 'u4', name: 'Julia Silva', username: 'jsilva_dev', avatar: 'https://picsum.photos/seed/u4/40/40' },
    category: 'Ideas',
    replies: 89,
    upvotes: 110,
    createdAt: 'Ontem',
    repliesList: []
  }
];
