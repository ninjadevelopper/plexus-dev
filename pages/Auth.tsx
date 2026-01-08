
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Github, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Users, 
  ShieldCheck, 
  Zap,
  ChevronDown
} from 'lucide-react';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const features = [
    {
      icon: <MessageSquare className="text-gh-blue" size={24} />,
      title: "Discussões Inteligentes",
      description: "Participe de conversas profundas. Use nossa IA para resumir tópicos longos e extrair o que importa em segundos."
    },
    {
      icon: <Layers className="text-orange-400" size={24} />,
      title: "Projetos de Ideias",
      description: "Transforme discussões em projetos estruturados. Organize seu roadmap e compartilhe o progresso com a comunidade."
    },
    {
      icon: <Sparkles className="text-purple-400" size={24} />,
      title: "Curadoria por IA",
      description: "Receba recomendações personalizadas baseadas nos seus interesses e nas tendências globais de inovação."
    },
    {
      icon: <Users className="text-green-500" size={24} />,
      title: "Comunidade Ativa",
      description: "Conecte-se com desenvolvedores, designers e pensadores. O Plexus é onde grandes mentes colaboram."
    }
  ];

  return (
    <div className="w-full space-y-20 pb-20">
      {/* Seção de Autenticação */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Entrar no Plexus' : 'Criar sua conta'}
            </h2>
            <p className="text-gh-muted">
              {mode === 'login' ? 'Bem-vindo de volta! Sentimos sua falta.' : 'Junte-se a milhares de mentes criativas.'}
            </p>
          </div>

          <div className="bg-gh-card border border-gh-border rounded-xl p-8 shadow-2xl relative">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider flex items-center gap-2">
                    <User size={14} /> Nome de usuário
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all placeholder:text-gh-muted/30"
                    placeholder="como as pessoas te verão"
                  />
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gh-muted uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Endereço de E-mail
                </label>
                <input 
                  type="email" 
                  className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all placeholder:text-gh-muted/30"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider flex items-center gap-2">
                    <Lock size={14} /> Senha
                  </label>
                  {mode === 'login' && (
                    <button type="button" className="text-[10px] text-gh-blue hover:underline">Esqueceu a senha?</button>
                  )}
                </div>
                <input 
                  type="password" 
                  className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all placeholder:text-gh-muted/30"
                  placeholder="••••••••"
                />
              </div>

              <button className="w-full bg-gh-blue hover:bg-blue-400 text-gh-bg font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group">
                {mode === 'login' ? 'Entrar agora' : 'Criar minha conta'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gh-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gh-card px-2 text-gh-muted">Ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button className="w-full bg-gh-hover border border-gh-border py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-3 hover:border-gh-muted transition-all">
                <Github size={18} /> GitHub
              </button>
            </div>
          </div>

          <div className="text-center space-y-6">
            <p className="text-sm text-gh-muted">
              {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-gh-blue font-bold hover:underline"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>

            <div className="flex flex-col items-center gap-2 animate-bounce opacity-50 pt-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gh-muted">Saiba mais sobre o Plexus</span>
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Seção "O que é o Plexus" */}
      <section className="max-w-5xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-extrabold text-white">Onde as ideias ganham vida.</h3>
          <p className="text-xl text-gh-muted max-w-2xl mx-auto">
            O Plexus não é apenas uma rede social, é uma ferramenta de colaboração projetada para quem constrói o futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-gh-card border border-gh-border p-8 rounded-2xl hover:border-gh-muted transition-all group">
              <div className="bg-gh-bg border border-gh-border w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{f.title}</h4>
              <p className="text-gh-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção "Call to Action" Final */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gh-card to-gh-header border border-gh-border rounded-3xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gh-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Pronto para elevar suas <span className="text-gh-blue">conexões?</span>
            </h3>
            <p className="text-gh-muted text-lg max-w-xl mx-auto">
              Milhares de projetos e discussões estão esperando por você. Comece gratuitamente hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMode('signup');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gh-bg font-black rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Começar Agora <Zap size={18} className="fill-current" />
              </button>
              <div className="flex items-center gap-2 text-sm text-gh-muted">
                <ShieldCheck size={16} className="text-green-500" />
                Sem cartão de crédito necessário
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
