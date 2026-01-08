
import React, { useState } from 'react';
import { 
  Layers, 
  Star, 
  Users, 
  ExternalLink, 
  Calendar, 
  Search, 
  Plus, 
  X, 
  Save, 
  AlertCircle, 
  Globe, 
  Lock,
  Edit3,
  Trash2,
  ArrowLeft,
  BookOpen,
  Info,
  Code2,
  ChevronDown,
  Eye,
  Github,
  MoreHorizontal
} from 'lucide-react';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Nebula UI Kit',
    description: 'A comprehensive, accessible, and fast UI component library for modern React applications. Built with Tailwind and accessibility first.',
    stars: 1240,
    tags: ['React', 'Tailwind', 'A11y'],
    owner: { id: 'u1', name: 'Design Co', username: 'designco', avatar: 'https://picsum.photos/seed/p1/40/40' },
    updatedAt: '2 days ago',
    githubUrl: 'https://github.com/designco/nebula-ui'
  },
  {
    id: 'p2',
    name: 'Ocean Cleaner AI',
    description: 'An open-source initiative to identify ocean waste using satellite imagery and machine learning models. Contribution welcome!',
    stars: 450,
    tags: ['ML', 'Python', 'GreenTech'],
    owner: { id: 'u4', name: 'Green Earth', username: 'greenearth', avatar: 'https://picsum.photos/seed/p2/40/40' },
    updatedAt: '5 hours ago',
    githubUrl: 'https://github.com/greenearth/ocean-cleaner'
  },
  {
    id: 'p3',
    name: 'Cookbook Studio',
    description: 'Collaborative platform for chefs to share, branch, and fork recipes. Version control your kitchen.',
    stars: 89,
    tags: ['Next.js', 'Food', 'Social'],
    owner: { id: 'u5', name: 'Chef Mario', username: 'mariocook', avatar: 'https://picsum.photos/seed/p3/40/40' },
    updatedAt: '1 week ago',
    githubUrl: 'https://github.com/mariocook/cookbook-studio'
  }
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMyProjectsModalOpen, setIsMyProjectsModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  
  // Create Project Form State
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    tags: '',
    githubUrl: '',
    visibility: 'public' as 'public' | 'private'
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    const createdProject: Project = {
      id: `p${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      stars: 0,
      tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      githubUrl: newProject.githubUrl,
      owner: { 
        id: 'me', 
        name: 'Alexandre Souza', 
        username: 'alex_souza', 
        avatar: 'https://picsum.photos/seed/user1/40/40' 
      },
      updatedAt: 'Agora mesmo'
    };

    setProjects([createdProject, ...projects]);
    setIsCreateProjectModalOpen(false);
    setNewProject({ name: '', description: '', tags: '', githubUrl: '', visibility: 'public' });
  };

  const myProjects = projects.filter(p => p.owner.id === 'me');

  // Project Detail Component
  const renderProjectDetail = (project: Project) => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedProject(null)}
            className="p-2 hover:bg-gh-hover rounded-md transition-colors text-gh-muted hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-xl font-bold">
            <img src={project.owner.avatar} className="w-6 h-6 rounded-full border border-gh-border" />
            <span className="text-gh-blue hover:underline cursor-pointer">{project.owner.username}</span>
            <span className="text-gh-muted">/</span>
            <span className="text-white">{project.name}</span>
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full border border-gh-border text-gh-muted uppercase font-bold">Public</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-gh-hover border border-gh-border rounded-md px-3 py-1.5 text-xs font-semibold hover:border-gh-muted">
            <Eye size={14} /> Watch <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 bg-gh-hover border border-gh-border rounded-md px-3 py-1.5 text-xs font-semibold hover:border-gh-muted">
             <Star size={14} className="text-yellow-500" /> Star <span className="ml-1 bg-gh-border px-1.5 rounded-full text-[10px]">{project.stars}</span>
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-8 border-b border-gh-border overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-1 py-3 text-sm font-semibold text-white border-b-2 border-orange-400 whitespace-nowrap">
          <BookOpen size={16} className="text-gh-muted" /> Code
        </button>
        <button className="flex items-center gap-2 px-1 py-3 text-sm font-semibold text-gh-muted hover:text-white border-b-2 border-transparent hover:border-gh-muted whitespace-nowrap">
          <Info size={16} /> Issues <span className="bg-gh-hover px-1.5 py-0.5 rounded-full text-[10px]">4</span>
        </button>
        <button className="flex items-center gap-2 px-1 py-3 text-sm font-semibold text-gh-muted hover:text-white border-b-2 border-transparent hover:border-gh-muted whitespace-nowrap">
          <Layers size={16} /> Projects
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* GitHub Repository Link Card */}
          <a 
            href={project.githubUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gh-card border border-gh-border rounded-lg overflow-hidden p-6 flex items-center justify-between hover:border-gh-muted transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                <Github size={32} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-0.5">Repositório no GitHub</h4>
                <p className="text-xs text-gh-muted">
                  {project.githubUrl ? project.githubUrl.replace('https://', '') : `github.com/${project.owner.username}/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                </p>
              </div>
            </div>
            <ExternalLink size={20} className="text-gh-muted group-hover:text-gh-blue transition-colors" />
          </a>

          <div className="bg-gh-card border border-gh-border rounded-lg p-8">
            <div className="flex items-center justify-between border-b border-gh-border pb-4 mb-6">
              <div className="flex items-center gap-2 font-bold text-white">
                 <BookOpen size={18} className="text-gh-muted" /> README.md
              </div>
              <button className="p-1 hover:bg-gh-hover rounded"><Edit3 size={16} className="text-gh-muted" /></button>
            </div>
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
              <p className="text-gh-text text-lg mb-6 leading-relaxed">
                {project.description}
              </p>
              <h2 className="text-xl font-bold border-b border-gh-border pb-2 mb-4">Introduction</h2>
              <p className="text-gh-muted mb-4">
                This project was created to solve common problems in the modern digital ecosystem. We focus on scalability, clean architecture, and exceptional user experience.
              </p>
              <h2 className="text-xl font-bold border-b border-gh-border pb-2 mb-4">Installation</h2>
              <div className="bg-gh-header p-4 rounded-md font-mono text-sm mb-6 border border-gh-border">
                npm install {project.name.toLowerCase().replace(/\s+/g, '-')}
              </div>
              <h2 className="text-xl font-bold border-b border-gh-border pb-2 mb-4">Contribution</h2>
              <p className="text-gh-muted">
                We are open to contributions from the community. Feel free to open issues or submit pull requests on GitHub.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold">About</h3>
            <p className="text-sm text-gh-text leading-relaxed">
              {project.description}
            </p>
            <div className="space-y-3 pt-2">
               <div className="flex items-center gap-2 text-xs text-gh-muted hover:text-gh-blue cursor-pointer">
                 <ExternalLink size={14} /> {project.name.toLowerCase()}.plexus.app
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map(tag => (
                   <span key={tag} className="px-2 py-0.5 bg-gh-blue/10 text-gh-blue text-[10px] font-bold uppercase rounded border border-gh-blue/20">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gh-border">
            <h3 className="text-sm font-bold">Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gh-text hover:text-gh-blue cursor-pointer">
                <Star size={16} className="text-gh-muted" /> <span className="font-bold">{project.stars}</span> stars
              </div>
              <div className="flex items-center gap-2 text-sm text-gh-text hover:text-gh-blue cursor-pointer">
                <Eye size={16} className="text-gh-muted" /> <span className="font-bold">42</span> watchers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedProject) {
    return renderProjectDetail(selectedProject);
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 relative">
      <div className="flex items-center justify-between border-b border-gh-border pb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Layers className="text-orange-400" />
            Projects
          </h2>
          <p className="text-gh-muted mt-1 text-sm">Discover and contribute to the community's creative works.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMyProjectsModalOpen(true)}
            className="hidden sm:block px-4 py-1.5 border border-gh-border rounded-md text-sm hover:bg-gh-hover transition-colors"
          >
            My Projects
          </button>
          <button 
            onClick={() => setIsCreateProjectModalOpen(true)}
            className="bg-gh-blue hover:bg-blue-400 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Create Project
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-gh-card border border-gh-border rounded-md pl-10 pr-4 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Featured', 'Recent', 'Most Starred'].map(f => (
            <button key={f} className="px-3 py-2 border border-gh-border rounded-md text-xs whitespace-nowrap hover:bg-gh-hover transition-colors">{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="bg-gh-card border border-gh-border rounded-lg p-5 flex flex-col h-full hover:shadow-xl hover:shadow-gh-blue/5 transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <img src={project.owner.avatar} className="w-5 h-5 rounded-full" />
                <span className="text-xs text-gh-blue font-semibold hover:underline">
                  {project.owner.username}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Logic for star toggle could go here
                }}
                className="flex items-center gap-1.5 bg-gh-hover border border-gh-border rounded-md px-2 py-0.5 text-xs font-semibold hover:border-gh-muted transition-colors"
              >
                <Star size={12} className="text-yellow-500" /> Star
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-gh-blue hover:underline mb-2">
              {project.name}
            </h3>
            
            <p className="text-sm text-gh-muted flex-1 mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gh-blue/10 text-gh-blue text-[10px] font-bold uppercase tracking-wider rounded border border-gh-blue/20">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-gh-muted pt-4 border-t border-gh-border/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star size={12} /> {project.stars}</span>
                <span className="flex items-center gap-1"><Users size={12} /> 12</span>
              </div>
              <span className="flex items-center gap-1"><Calendar size={12} /> {project.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isCreateProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-gh-card border border-gh-border rounded-xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gh-border bg-gh-header">
              <div className="flex items-center gap-3">
                <div className="bg-gh-hover p-2 rounded-lg border border-gh-border">
                  <Plus size={20} className="text-gh-blue" />
                </div>
                <h3 className="text-lg font-bold text-white">Criar novo projeto</h3>
              </div>
              <button onClick={() => setIsCreateProjectModalOpen(false)} className="text-gh-muted hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Nome do Projeto</label>
                <input 
                  type="text" 
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="ex: plexus-core"
                  className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                />
                <p className="text-[10px] text-gh-muted">Nomes de projetos devem ser curtos e memoráveis.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Descrição (opcional)</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Sobre o que é este projeto?"
                  className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">URL do Repositório GitHub</label>
                <div className="relative">
                  <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" />
                  <input 
                    type="url" 
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/usuario/projeto"
                    className="w-full bg-gh-bg border border-gh-border rounded-md pl-10 pr-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                  />
                </div>
                <p className="text-[10px] text-gh-muted">Insira o link para o código fonte do seu projeto.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Tags (separadas por vírgula)</label>
                <input 
                  type="text" 
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="React, TypeScript, AI..."
                  className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Visibilidade</label>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 p-3 border border-gh-border rounded-md cursor-pointer hover:bg-gh-hover transition-colors">
                    <input 
                      type="radio" 
                      name="visibility" 
                      checked={newProject.visibility === 'public'} 
                      onChange={() => setNewProject({ ...newProject, visibility: 'public' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-sm text-white">
                        <Globe size={14} /> Public
                      </div>
                      <p className="text-xs text-gh-muted">Qualquer pessoa na internet pode ver este projeto.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-gh-border rounded-md cursor-pointer hover:bg-gh-hover transition-colors opacity-50 grayscale">
                    <input 
                      type="radio" 
                      name="visibility" 
                      disabled
                      checked={newProject.visibility === 'private'} 
                      onChange={() => setNewProject({ ...newProject, visibility: 'private' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-sm text-white">
                        <Lock size={14} /> Private
                      </div>
                      <p className="text-xs text-gh-muted">Apenas você e as pessoas que você convidar podem ver. (Premium)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gh-border">
                <button type="button" onClick={() => setIsCreateProjectModalOpen(false)} className="px-4 py-2 text-sm font-semibold hover:bg-gh-hover rounded-md transition-colors">Cancelar</button>
                <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md text-sm transition-all shadow-lg">Criar projeto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Projects Modal */}
      {isMyProjectsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-gh-card border border-gh-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gh-border bg-gh-header">
              <div className="flex items-center gap-3">
                <div className="bg-gh-hover p-2 rounded-lg border border-gh-border">
                  <Layers size={20} className="text-gh-blue" />
                </div>
                <h3 className="text-lg font-bold text-white">Meus Projetos</h3>
              </div>
              <button onClick={() => setIsMyProjectsModalOpen(false)} className="text-gh-muted hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {myProjects.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <Layers size={48} className="text-gh-muted mx-auto opacity-20" />
                  <p className="text-gh-muted">Você ainda não criou nenhum projeto.</p>
                  <button 
                    onClick={() => {
                      setIsMyProjectsModalOpen(false);
                      setIsCreateProjectModalOpen(true);
                    }}
                    className="text-gh-blue hover:underline text-sm font-bold"
                  >
                    Começar o primeiro agora
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myProjects.map(p => (
                    <div key={p.id} className="p-4 bg-gh-bg border border-gh-border rounded-lg flex items-center justify-between hover:border-gh-muted transition-colors group">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gh-blue">{p.name}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 border border-gh-border rounded text-gh-muted">Public</span>
                        </div>
                        <p className="text-xs text-gh-muted truncate max-w-md">{p.description || 'Sem descrição'}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-gh-hover rounded-md text-gh-muted hover:text-white"><Edit3 size={16} /></button>
                        <button className="p-1.5 hover:bg-gh-hover rounded-md text-gh-muted hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gh-border bg-gh-header flex justify-between items-center">
              <span className="text-xs text-gh-muted">{myProjects.length} projetos encontrados</span>
              <button 
                onClick={() => {
                  setIsMyProjectsModalOpen(false);
                  setIsCreateProjectModalOpen(true);
                }}
                className="flex items-center gap-2 bg-gh-hover border border-gh-border px-4 py-1.5 rounded-md text-xs font-bold hover:text-white transition-colors"
              >
                <Plus size={14} /> Novo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
