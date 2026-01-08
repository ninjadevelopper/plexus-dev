
import React from 'react';
import { Book, Zap, Layers, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';

const Docs: React.FC = () => {
  const sections = [
    {
      title: "Introdução",
      icon: <Book size={20} className="text-gh-blue" />,
      items: ["O que é o Plexus?", "Missão e Valores", "Guia de Início Rápido"]
    },
    {
      title: "Discussões",
      icon: <MessageCircle size={20} className="text-green-500" />,
      items: ["Como criar um tópico", "Uso de Markdown", "Moderação e Regras"]
    },
    {
      title: "Projetos",
      icon: <Layers size={20} className="text-orange-400" />,
      items: ["Vinculando ao GitHub", "Ciclo de vida do projeto", "Colaboradores"]
    },
    {
      title: "Plexus AI",
      icon: <Sparkles size={20} className="text-purple-400" />,
      items: ["Resumos Inteligentes", "Exploração guiada", "Limites da IA"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-12 animate-in fade-in duration-500">
      {/* Sidebar de Navegação dos Docs */}
      <aside className="lg:w-64 space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={24} className="text-gh-blue fill-current" />
          <h1 className="text-2xl font-black text-white">Docs</h1>
        </div>
        
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest border-l-2 border-gh-border pl-3">
              {section.icon}
              {section.title}
            </h3>
            <ul className="space-y-2 pl-8">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gh-muted hover:text-gh-blue transition-colors flex items-center justify-between group">
                    {item}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Conteúdo Principal dos Docs */}
      <div className="flex-1 bg-gh-card border border-gh-border rounded-3xl overflow-hidden">
        <div className="p-8 md:p-12 prose prose-invert max-w-none">
          <h2 className="text-3xl font-black text-white mb-6">Guia de Início Rápido</h2>
          <p className="text-gh-text text-lg mb-8 leading-relaxed">
            Bem-vindo ao Plexus! Esta plataforma foi criada para conectar mentes criativas e transformar conversas em realidade. Siga estes passos para começar sua jornada:
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-gh-blue text-gh-bg font-bold flex items-center justify-center shrink-0">1</div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Crie seu perfil</h4>
                <p className="text-gh-muted">Complete seu perfil com suas habilidades e interesses. Isso ajuda nossa IA a recomendar as melhores discussões para você.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-orange-400 text-gh-bg font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Inicie uma Discussão</h4>
                <p className="text-gh-muted">Tem uma ideia maluca ou uma dúvida técnica? Abra uma discussão. Use o botão <strong>"AI Summary"</strong> para obter um resumo dos tópicos mais complexos.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500 text-gh-bg font-bold flex items-center justify-center shrink-0">3</div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Publique um Projeto</h4>
                <p className="text-gh-muted">Se sua ideia evoluiu para algo concreto, crie um projeto. Vincule seu repositório do GitHub para manter tudo centralizado.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gh-bg border border-gh-border rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sparkles size={24} className="text-purple-400" />
              <div>
                <p className="text-sm font-bold text-white">Dica Pro</p>
                <p className="text-xs text-gh-muted">Pressione <kbd className="bg-gh-card border border-gh-border rounded px-1">Ctrl + K</kbd> para abrir a busca rápida (em breve).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
