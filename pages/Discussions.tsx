
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  BrainCircuit, 
  Filter, 
  ChevronDown, 
  Sparkles,
  X,
  Plus,
  Send,
  AlertCircle,
  ArrowLeft,
  MoreHorizontal
} from 'lucide-react';
import { Discussion, Reply, MOCK_DISCUSSIONS } from '../types';
import { getDiscussionSummary } from '../services/geminiService';

interface DiscussionsProps {
  initialSelectedId?: string | null;
  onClearTarget?: () => void;
}

const Discussions: React.FC<DiscussionsProps> = ({ initialSelectedId, onClearTarget }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>(MOCK_DISCUSSIONS);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingSummaries, setLoadingSummaries] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Effect to handle navigation from other pages
  useEffect(() => {
    if (initialSelectedId) {
      const target = discussions.find(d => d.id === initialSelectedId);
      if (target) {
        setSelectedDiscussion(target);
      }
    }
  }, [initialSelectedId, discussions]);

  // New Discussion Form State
  const [newDisc, setNewDisc] = useState({
    title: '',
    category: 'General' as Discussion['category'],
    content: ''
  });

  const handleSummarize = async (id: string, content: string) => {
    setLoadingSummaries(prev => ({ ...prev, [id]: true }));
    const summary = await getDiscussionSummary(content);
    setSummaries(prev => ({ ...prev, [id]: summary }));
    setLoadingSummaries(prev => ({ ...prev, [id]: false }));
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisc.title || !newDisc.content) return;

    const createdDisc: Discussion = {
      id: Date.now().toString(),
      title: newDisc.title,
      content: newDisc.content,
      category: newDisc.category,
      author: { 
        id: 'me', 
        name: 'Alexandre Souza', 
        username: 'alex_souza', 
        avatar: 'https://picsum.photos/seed/user1/40/40' 
      },
      replies: 0,
      upvotes: 0,
      createdAt: 'Agora mesmo',
      repliesList: []
    };

    setDiscussions([createdDisc, ...discussions]);
    setIsModalOpen(false);
    setNewDisc({ title: '', category: 'General', content: '' });
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedDiscussion) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      content: replyText,
      author: { 
        id: 'me', 
        name: 'Alexandre Souza', 
        username: 'alex_souza', 
        avatar: 'https://picsum.photos/seed/user1/40/40' 
      },
      createdAt: 'Agora mesmo',
      upvotes: 0
    };

    const updatedDisc = {
      ...selectedDiscussion,
      repliesList: [...(selectedDiscussion.repliesList || []), newReply],
      replies: selectedDiscussion.replies + 1
    };

    setSelectedDiscussion(updatedDisc);
    setDiscussions(discussions.map(d => d.id === updatedDisc.id ? updatedDisc : d));
    setReplyText('');
  };

  const handleBack = () => {
    setSelectedDiscussion(null);
    onClearTarget?.();
  };

  if (selectedDiscussion) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gh-muted hover:text-gh-blue transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Voltar para discussões
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold">{selectedDiscussion.title}</h2>
             <span className="px-2 py-0.5 bg-gh-hover border border-gh-border rounded-full text-xs text-gh-muted">
               #{selectedDiscussion.id}
             </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gh-muted border-b border-gh-border pb-4">
            <span className="px-2 py-0.5 bg-green-900/20 text-green-500 border border-green-500/30 rounded-full text-xs font-bold">Open</span>
            <span>{selectedDiscussion.author.username} iniciou em {selectedDiscussion.createdAt}</span>
            <span>•</span>
            <span>{selectedDiscussion.replies} respostas</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Main Post */}
          <div className="flex gap-4">
            <img src={selectedDiscussion.author.avatar} alt="" className="w-10 h-10 rounded-full shrink-0 border border-gh-border" />
            <div className="flex-1 bg-gh-card border border-gh-border rounded-lg overflow-hidden">
              <div className="bg-gh-header px-4 py-2 border-b border-gh-border flex items-center justify-between">
                <div className="text-xs text-gh-muted">
                  <span className="font-bold text-gh-text mr-1">{selectedDiscussion.author.username}</span> 
                  comentou em {selectedDiscussion.createdAt}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 border border-gh-border rounded text-gh-muted font-medium">Author</span>
                  <button className="text-gh-muted hover:text-white"><MoreHorizontal size={14} /></button>
                </div>
              </div>
              <div className="p-4 text-sm leading-relaxed whitespace-pre-line">
                {selectedDiscussion.content}
              </div>
              <div className="px-4 py-2 border-t border-gh-border/50 flex items-center gap-4">
                 <button className="flex items-center gap-1.5 text-xs text-gh-muted hover:text-gh-blue">
                   <ThumbsUp size={14} /> {selectedDiscussion.upvotes}
                 </button>
              </div>
            </div>
          </div>

          {/* Replies */}
          {selectedDiscussion.repliesList?.map((reply) => (
            <div key={reply.id} className="flex gap-4 animate-in fade-in duration-300">
              <img src={reply.author.avatar} alt="" className="w-10 h-10 rounded-full shrink-0 border border-gh-border" />
              <div className="flex-1 bg-gh-card border border-gh-border rounded-lg overflow-hidden">
                <div className="bg-gh-header px-4 py-2 border-b border-gh-border flex items-center justify-between">
                  <div className="text-xs text-gh-muted">
                    <span className="font-bold text-gh-text mr-1">{reply.author.username}</span> 
                    comentou em {reply.createdAt}
                  </div>
                  <button className="text-gh-muted hover:text-white"><MoreHorizontal size={14} /></button>
                </div>
                <div className="p-4 text-sm leading-relaxed">
                  {reply.content}
                </div>
                <div className="px-4 py-2 border-t border-gh-border/50 flex items-center gap-4">
                   <button className="flex items-center gap-1.5 text-xs text-gh-muted hover:text-gh-blue">
                     <ThumbsUp size={14} /> {reply.upvotes}
                   </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Reply Box */}
          <div className="flex gap-4 pt-4 border-t border-gh-border">
            <img src="https://picsum.photos/seed/user1/40/40" alt="" className="w-10 h-10 rounded-full shrink-0 border border-gh-border" />
            <div className="flex-1 bg-gh-card border border-gh-border rounded-lg overflow-hidden">
              <div className="bg-gh-header border-b border-gh-border px-3 py-1.5 flex gap-4 overflow-x-auto no-scrollbar">
                <button type="button" className="text-xs font-bold text-white border-b-2 border-orange-400 py-1 px-1">Escrever</button>
                <button type="button" className="text-xs font-medium text-gh-muted py-1 px-1 hover:text-white transition-colors">Prévia</button>
              </div>
              <form onSubmit={handleAddReply}>
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escreva uma resposta..."
                  className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none min-h-[120px] resize-none leading-relaxed"
                />
                <div className="p-3 border-t border-gh-border/50 flex items-center justify-between bg-gh-bg/30">
                  <div className="flex items-center gap-1.5 text-[11px] text-gh-muted">
                    <AlertCircle size={12} />
                    Lembre-se das regras da comunidade.
                  </div>
                  <button 
                    type="submit"
                    disabled={!replyText.trim()}
                    className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-1.5 px-4 rounded-md transition-colors"
                  >
                    Responder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Discussions</h2>
          <p className="text-gh-muted text-sm">Ask questions, share ideas, and showcase your work.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-500 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Nova discussão
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-gh-border pb-4 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-1.5 px-3 py-1 bg-gh-hover rounded-full text-sm font-medium border border-gh-border">
          <Filter size={14} /> Filters <ChevronDown size={14} />
        </button>
        {['General', 'Q&A', 'Showcase', 'Ideas'].map(cat => (
          <button key={cat} className="px-3 py-1 hover:bg-gh-hover rounded-full text-sm text-gh-muted hover:text-white transition-colors">
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {discussions.map((disc) => (
          <div key={disc.id} className="bg-gh-card border border-gh-border rounded-lg p-5 hover:border-gh-muted transition-all group">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex flex-col items-center gap-1 bg-gh-bg border border-gh-border rounded-md px-3 py-2">
                <ThumbsUp size={16} className="text-gh-muted cursor-pointer hover:text-gh-blue" />
                <span className="text-xs font-bold">{disc.upvotes}</span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gh-muted">
                  <img src={disc.author.avatar} alt="" className="w-5 h-5 rounded-full" />
                  <span className="font-semibold text-gh-text">{disc.author.username}</span>
                  <span>in</span>
                  <span className="px-2 py-0.5 bg-gh-hover border border-gh-border rounded-full">{disc.category}</span>
                  <span>• {disc.createdAt}</span>
                </div>
                
                <h3 
                  onClick={() => setSelectedDiscussion(disc)}
                  className="text-lg font-bold hover:text-gh-blue transition-colors cursor-pointer"
                >
                  {disc.title}
                </h3>
                
                <p className="text-sm text-gh-muted line-clamp-2">{disc.content}</p>

                {summaries[disc.id] && (
                  <div className="mt-4 p-3 bg-indigo-900/10 border border-indigo-500/30 rounded-md text-sm text-gh-text animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                      <BrainCircuit size={16} />
                      AI Summary
                    </div>
                    <div className="whitespace-pre-line pl-2 italic">
                      {summaries[disc.id]}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-6 pt-2">
                  <div 
                    onClick={() => setSelectedDiscussion(disc)}
                    className="flex items-center gap-1.5 text-xs text-gh-muted hover:text-gh-blue cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>{disc.replies} replies</span>
                  </div>
                  
                  <button 
                    onClick={() => handleSummarize(disc.id, disc.content)}
                    disabled={loadingSummaries[disc.id]}
                    className="flex items-center gap-1.5 text-xs text-gh-muted hover:text-orange-400 transition-colors disabled:opacity-50"
                  >
                    <Sparkles size={14} className={loadingSummaries[disc.id] ? 'animate-pulse' : ''} />
                    <span>{loadingSummaries[disc.id] ? 'Thinking...' : 'AI Summary'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-gh-card border border-gh-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gh-border bg-gh-header">
              <div className="flex items-center gap-3">
                <div className="bg-gh-hover p-2 rounded-lg border border-gh-border">
                  <MessageSquare size={20} className="text-gh-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Iniciar nova discussão</h3>
                  <p className="text-xs text-gh-muted">Colabore com a comunidade em ideias e dúvidas.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gh-hover rounded-md transition-colors text-gh-muted hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateDiscussion} className="p-6 space-y-5">
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Título da discussão</label>
                  <input 
                    type="text" 
                    required
                    value={newDisc.title}
                    onChange={(e) => setNewDisc({ ...newDisc, title: e.target.value })}
                    placeholder="Dê um título curto e descritivo"
                    className="w-full bg-gh-bg border border-gh-border rounded-md px-4 py-2.5 text-sm focus:border-gh-blue outline-none transition-all placeholder:text-gh-muted/50"
                  />
                </div>

                {/* Category Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Categoria</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['General', 'Q&A', 'Showcase', 'Ideas'] as Discussion['category'][]).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewDisc({ ...newDisc, category: cat })}
                        className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all ${
                          newDisc.category === cat 
                          ? 'bg-gh-blue/10 border-gh-blue text-gh-blue' 
                          : 'bg-gh-bg border-gh-border text-gh-muted hover:border-gh-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Conteúdo</label>
                  <div className="border border-gh-border rounded-md overflow-hidden bg-gh-bg">
                    <div className="bg-gh-header border-b border-gh-border px-3 py-1.5 flex gap-4 overflow-x-auto no-scrollbar">
                      <button type="button" className="text-xs font-bold text-white border-b-2 border-orange-400 py-1 px-1">Escrever</button>
                      <button type="button" className="text-xs font-medium text-gh-muted py-1 px-1 hover:text-white transition-colors">Prévia</button>
                    </div>
                    <textarea 
                      required
                      value={newDisc.content}
                      onChange={(e) => setNewDisc({ ...newDisc, content: e.target.value })}
                      placeholder="O que você quer compartilhar ou perguntar?"
                      className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none min-h-[180px] resize-none leading-relaxed"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gh-muted">
                    <AlertCircle size={12} />
                    Markdown é suportado. Seja gentil e colaborativo.
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gh-border">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gh-text hover:bg-gh-hover rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={!newDisc.title || !newDisc.content}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-500 rounded-md transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Iniciar discussão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussions;
