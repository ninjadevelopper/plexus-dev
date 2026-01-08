
import React from 'react';
import { Star, MessageSquare, History, Sparkles, Share2 } from 'lucide-react';
import { MOCK_DISCUSSIONS } from '../types';

interface HomeProps {
  onNavigateToDiscussion?: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToDiscussion }) => {
  const activities = [
    { id: 1, user: 'Sarah Doe', action: 'favoritou', target: 'Eco Friendly Design', time: '2h atrás' },
    { id: 2, user: 'John Smith', action: 'comentou em', target: 'Futuro da IA no UX', time: '4h atrás' },
    { id: 3, user: 'Alice Vane', action: 'criou', target: 'Projeto Cidades Sustentáveis', time: '5h atrás' },
    { id: 4, user: 'Plexus Bot', action: 'automatizou', target: 'Resumo Semanal', time: '1d atrás' },
  ];

  // Calculate trending discussions based on replies and upvotes
  const trendingDiscussions = [...MOCK_DISCUSSIONS]
    .sort((a, b) => (b.replies + b.upvotes / 10) - (a.replies + a.upvotes / 10))
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-gh-card border border-gh-border rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Share2 size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gh-blue mb-4">
            <Sparkles size={20} />
            <h2 className="text-2xl font-bold tracking-tight">Bem-vindo ao Plexus</h2>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Plexus: Onde grandes ideias se conectam.</h3>
          <p className="text-gh-muted max-w-2xl">
            Explore novos projetos, participe de discussões em alta e mantenha-se atualizado com as últimas movimentações da sua rede no seu painel pessoal de colaboração.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <History size={18} className="text-gh-muted" />
              Atividade Recente
            </h3>
            <button className="text-xs text-gh-blue hover:underline">Ver tudo</button>
          </div>

          <div className="space-y-4">
            {activities.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-gh-card border border-gh-border rounded-lg hover:border-gh-muted transition-colors">
                <div className="w-10 h-10 rounded-full bg-gh-hover flex items-center justify-center shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${item.user}/40/40`} 
                    alt={item.user} 
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold text-white">{item.user}</span>
                    <span className="text-gh-muted"> {item.action} </span>
                    <span className="font-semibold text-gh-blue">{item.target}</span>
                  </p>
                  <span className="text-xs text-gh-muted">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Discussões em Alta</h3>
            <div className="bg-gh-card border border-gh-border rounded-lg divide-y divide-gh-border">
              {trendingDiscussions.map((disc) => (
                <div 
                  key={disc.id} 
                  onClick={() => onNavigateToDiscussion?.(disc.id)}
                  className="p-4 hover:bg-gh-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs text-gh-muted mb-1">
                    <MessageSquare size={12} />
                    <span>Ativo há 2h</span>
                  </div>
                  <p className="text-sm font-medium text-gh-text group-hover:text-gh-blue transition-colors line-clamp-2">
                    {disc.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explorar Mais</h3>
            <div className="bg-gradient-to-br from-indigo-900/20 to-gh-blue/20 border border-gh-border rounded-lg p-4">
              <p className="text-sm text-gh-text mb-3">Descubra projetos curados especificamente para seus interesses.</p>
              <button className="w-full bg-gh-hover border border-gh-border py-2 px-4 rounded-md text-sm font-semibold hover:border-gh-muted transition-all">
                Ir para Explorar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
