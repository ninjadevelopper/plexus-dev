
import React, { useState, useRef } from 'react';
import { 
  Users, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Star, 
  BookOpen, 
  Layers, 
  MessageSquare,
  Edit2,
  Calendar,
  Search,
  ChevronDown,
  Camera,
  X,
  Save
} from 'lucide-react';

type ProfileTab = 'overview' | 'projects' | 'discussions' | 'stars';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState({
    name: 'Alexandre Souza',
    username: 'alex_souza',
    avatar: 'https://picsum.photos/seed/user1/400/400',
    bio: 'Desenvolvedor Frontend & Entusiasta de UX. Construindo o futuro das conexões digitais no Plexus. 🚀',
    location: 'São Paulo, Brasil',
    website: 'https://alexsouza.dev',
    twitter: '@alex_dev',
    followers: 842,
    following: 156,
    stars: 124,
    projectCount: 12,
    discussionCount: 42
  });

  // State for the edit form
  const [formData, setFormData] = useState({ ...user });

  const pinnedProjects = [
    { id: '1', name: 'Nebula UI Kit', description: 'Um conjunto de componentes acessíveis e rápidos para React.', lang: 'React', stars: 1240, color: '#61dafb' },
    { id: '2', name: 'Eco-Tracker', description: 'Monitoramento em tempo real de pegada de carbono para empresas.', lang: 'TypeScript', stars: 450, color: '#3178c6' },
    { id: '3', name: 'Plexus-Mobile', description: 'Interface móvel experimental para a rede Plexus.', lang: 'Flutter', stars: 89, color: '#02569b' },
    { id: '4', name: 'Design Tokens Gen', description: 'Gerador automático de tokens de design para Figma.', lang: 'Node.js', stars: 12, color: '#339933' }
  ];

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    setIsEditModalOpen(false);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Projetos em destaque</h3>
          <button className="text-xs text-gh-blue hover:underline">Personalizar</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pinnedProjects.map(p => (
            <div key={p.id} className="p-4 bg-gh-card border border-gh-border rounded-lg flex flex-col hover:border-gh-muted transition-colors">
              <div className="flex items-center justify-between mb-2">
                <a href="#" className="text-sm font-bold text-gh-blue hover:underline">{p.name}</a>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-gh-border text-gh-muted">Public</span>
              </div>
              <p className="text-xs text-gh-muted flex-1 mb-4">{p.description}</p>
              <div className="flex items-center gap-4 text-[10px] text-gh-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></div>
                  {p.lang}
                </div>
                <div className="flex items-center gap-1 hover:text-gh-blue cursor-pointer">
                  <Star size={12} /> {p.stars}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-medium">Histórico de conexões</h3>
        <div className="bg-gh-card border border-gh-border rounded-lg p-6 flex flex-col items-center justify-center space-y-3 min-h-[200px]">
          <Calendar size={32} className="text-gh-muted" />
          <p className="text-sm text-gh-muted">Visualização de atividade disponível em breve.</p>
          <button className="text-xs text-gh-blue hover:underline">Ver arquivo de atividades</button>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-4 border-b border-gh-border pb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" size={16} />
          <input 
            type="text" 
            placeholder="Encontrar um projeto..." 
            className="w-full bg-gh-bg border border-gh-border rounded-md pl-10 pr-4 py-1.5 text-sm focus:border-gh-blue outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-hover border border-gh-border rounded-md text-xs font-semibold">
            Type <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-hover border border-gh-border rounded-md text-xs font-semibold">
            Language <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gh-hover border border-gh-border rounded-md text-xs font-semibold">
            Sort <ChevronDown size={14} />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gh-border">
        {pinnedProjects.map(p => (
          <div key={p.id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <a href="#" className="text-xl font-bold text-gh-blue hover:underline">{p.name}</a>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gh-border text-gh-muted font-medium">Public</span>
              </div>
              <p className="text-sm text-gh-muted max-w-xl">{p.description}</p>
              <div className="flex items-center gap-4 text-xs text-gh-muted pt-2">
                 <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                    {p.lang}
                  </div>
                  <div className="flex items-center gap-1 hover:text-gh-blue cursor-pointer">
                    <Star size={14} /> {p.stars}
                  </div>
                  <span>Atualizado há 2 dias</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="flex items-center gap-1.5 bg-gh-hover border border-gh-border rounded-md px-3 py-1 text-xs font-semibold hover:border-gh-muted transition-colors">
                  <Star size={14} className="text-yellow-500" /> Star
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
       <div className="bg-gh-card border border-gh-border rounded-lg p-8 text-center space-y-3">
          <MessageSquare size={48} className="text-gh-muted mx-auto" />
          <h4 className="text-lg font-bold">Nenhuma discussão iniciada</h4>
          <p className="text-sm text-gh-muted max-w-xs mx-auto">Discussões são lugares para fazer perguntas, compartilhar ideias e colaborar com a comunidade.</p>
          <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors mt-4">
            Nova discussão
          </button>
       </div>
    </div>
  );

  const renderStars = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-gh-border pb-4">
         <h4 className="text-sm font-semibold">Favoritos recentes</h4>
         <button className="text-xs text-gh-blue hover:underline">Ver todas as listas</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pinnedProjects.slice(0, 2).map(p => (
           <div key={p.id} className="p-4 bg-gh-card border border-gh-border rounded-lg flex flex-col hover:border-gh-muted transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <img src={`https://picsum.photos/seed/${p.id}/20/20`} className="w-5 h-5 rounded" />
                <a href="#" className="text-sm font-bold text-gh-blue hover:underline">{p.name}</a>
              </div>
              <p className="text-xs text-gh-muted flex-1 mb-4">{p.description}</p>
              <div className="flex items-center justify-between text-[10px] text-gh-muted">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></div>
                    {p.lang}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" /> {p.stars}
                  </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'projects': return renderProjects();
      case 'discussions': return renderDiscussions();
      case 'stars': return renderStars();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 relative">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Info */}
        <div className="lg:w-1/4 space-y-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-full aspect-square rounded-full overflow-hidden border border-gh-border ring-4 ring-gh-bg">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {/* Upload Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white mb-1" size={32} />
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Alterar foto</span>
            </div>
            <button className="absolute bottom-4 right-4 p-2 bg-gh-card border border-gh-border rounded-full hover:bg-gh-hover transition-colors shadow-lg lg:hidden">
              <Edit2 size={16} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <h2 className="text-xl text-gh-muted font-light">{user.username}</h2>
          </div>

          <button 
            onClick={() => {
              setFormData({ ...user });
              setIsEditModalOpen(true);
            }}
            className="w-full py-1.5 border border-gh-border bg-gh-card rounded-md text-sm font-semibold hover:bg-gh-hover transition-colors"
          >
            Editar perfil
          </button>

          <p className="text-sm text-gh-text leading-relaxed">
            {user.bio}
          </p>

          <div className="flex items-center gap-2 text-sm text-gh-muted hover:text-gh-blue cursor-pointer">
            <Users size={16} />
            <span className="font-bold text-gh-text">{user.followers}</span> followers 
            <span>•</span>
            <span className="font-bold text-gh-text">{user.following}</span> following
          </div>

          <div className="space-y-2 pt-2 border-t border-gh-border">
            <div className="flex items-center gap-2 text-sm text-gh-text">
              <MapPin size={16} className="text-gh-muted" />
              {user.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gh-text truncate">
              <LinkIcon size={16} className="text-gh-muted" />
              <a href={user.website} target="_blank" className="hover:text-gh-blue hover:underline">{user.website.replace('https://', '')}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gh-text">
              <Twitter size={16} className="text-gh-muted" />
              <a href="#" className="hover:text-gh-blue hover:underline">{user.twitter}</a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-4 sm:gap-8 border-b border-gh-border overflow-x-auto no-scrollbar scroll-smooth">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-1 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'overview' ? 'text-white border-orange-400' : 'text-gh-muted border-transparent hover:text-white hover:border-gh-muted'
              }`}
            >
              <BookOpen size={16} className={activeTab === 'overview' ? 'text-gh-muted' : ''} />
              Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-1 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'projects' ? 'text-white border-orange-400' : 'text-gh-muted border-transparent hover:text-white hover:border-gh-muted'
              }`}
            >
              <Layers size={16} className={activeTab === 'projects' ? 'text-gh-muted' : ''} />
              Projetos
              <span className="bg-gh-hover text-gh-muted px-1.5 py-0.5 rounded-full text-[10px] font-bold group-hover:text-white">
                {user.projectCount}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('discussions')}
              className={`flex items-center gap-2 px-1 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'discussions' ? 'text-white border-orange-400' : 'text-gh-muted border-transparent hover:text-white hover:border-gh-muted'
              }`}
            >
              <MessageSquare size={16} className={activeTab === 'discussions' ? 'text-gh-muted' : ''} />
              Discussões
              <span className="bg-gh-hover text-gh-muted px-1.5 py-0.5 rounded-full text-[10px] font-bold group-hover:text-white">
                {user.discussionCount}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('stars')}
              className={`flex items-center gap-2 px-1 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'stars' ? 'text-white border-orange-400' : 'text-gh-muted border-transparent hover:text-white hover:border-gh-muted'
              }`}
            >
              <Star size={16} className={activeTab === 'stars' ? 'text-gh-muted' : ''} />
              Favoritos
              <span className="bg-gh-hover text-gh-muted px-1.5 py-0.5 rounded-full text-[10px] font-bold group-hover:text-white">
                {user.stars}
              </span>
            </button>
          </nav>

          {/* Dynamic Content */}
          <div className="pt-2">
            {getTabContent()}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-gh-card border border-gh-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gh-border bg-gh-header">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-gh-blue" />
                Editar perfil
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 hover:bg-gh-hover rounded-md transition-colors text-gh-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Nome de exibição</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors min-h-[100px] resize-none"
                    placeholder="Conte um pouco sobre você..."
                  />
                  <p className="text-[10px] text-gh-muted italic">Você pode usar emojis e mencionar outros usuários com @.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Localização</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" />
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-gh-bg border border-gh-border rounded-md pl-9 pr-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                        placeholder="Cidade, País"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Website</label>
                    <div className="relative">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" />
                      <input 
                        type="text" 
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full bg-gh-bg border border-gh-border rounded-md pl-9 pr-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Twitter (X)</label>
                  <div className="relative">
                    <Twitter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" />
                    <input 
                      type="text" 
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      className="w-full bg-gh-bg border border-gh-border rounded-md pl-9 pr-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors"
                      placeholder="@seu_perfil"
                    />
                  </div>
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gh-border mt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gh-text hover:bg-gh-hover rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gh-blue hover:bg-blue-400 rounded-md transition-colors shadow-lg"
                >
                  <Save size={16} />
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
