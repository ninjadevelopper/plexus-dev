
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Eye, 
  Monitor, 
  CreditCard, 
  Key, 
  Lock, 
  Smartphone,
  Moon,
  Sun,
  Palette,
  Check,
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

type SettingsTab = 'conta' | 'seguranca' | 'notificacoes' | 'aparencia' | 'privacidade' | 'faturamento';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('conta');

  const menuItems = [
    { id: 'conta', label: 'Conta', icon: <SettingsIcon size={16} /> },
    { id: 'seguranca', label: 'Segurança', icon: <Shield size={16} /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell size={16} /> },
    { id: 'aparencia', label: 'Aparência', icon: <Monitor size={16} /> },
    { id: 'privacidade', label: 'Privacidade', icon: <Eye size={16} /> },
    { id: 'faturamento', label: 'Faturamento', icon: <CreditCard size={16} /> },
  ];

  const renderConta = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30">
          <h3 className="font-bold text-white">Perfil Público</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Nome de exibição</label>
            <input type="text" className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors" defaultValue="Alexandre Souza" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">E-mail público</label>
            <select className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors">
              <option>alex@exemplo.com</option>
              <option>Privado</option>
            </select>
          </div>
          <button className="bg-gh-hover border border-gh-border px-4 py-2 rounded-md text-sm font-bold hover:text-white transition-colors">Atualizar Perfil</button>
        </div>
      </section>

      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden border-red-900/30">
        <div className="px-6 py-4 border-b border-gh-border bg-red-900/10">
          <h3 className="font-bold text-red-500">Zona de Perigo</h3>
        </div>
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm">Excluir Conta</h4>
            <p className="text-xs text-gh-muted">Uma vez que você deletar sua conta, não há volta. Por favor tenha certeza.</p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 border border-red-900 text-red-500 rounded-md text-sm font-bold hover:bg-red-900 hover:text-white transition-all">Deletar Conta</button>
        </div>
      </section>
    </div>
  );

  const renderSeguranca = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30">
          <h3 className="font-bold text-white">Alterar Senha</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Senha Atual</label>
            <input type="password" placeholder="••••••••" className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Nova Senha</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Confirmar Nova Senha</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:border-gh-blue outline-none transition-colors" />
            </div>
          </div>
          <button className="bg-gh-hover border border-gh-border px-4 py-2 rounded-md text-sm font-bold hover:text-white transition-colors">Atualizar Senha</button>
        </div>
      </section>

      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30 flex items-center justify-between">
          <h3 className="font-bold text-white">Autenticação de Dois Fatores (2FA)</h3>
          <span className="text-[10px] bg-red-900/20 text-red-500 border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase">Desativado</span>
        </div>
        <div className="p-6 flex items-start gap-4">
          <div className="p-3 bg-gh-bg border border-gh-border rounded-xl">
            <Smartphone size={24} className="text-gh-muted" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gh-text">Adicione uma camada extra de segurança à sua conta.</p>
            <button className="text-gh-blue text-xs font-bold hover:underline flex items-center gap-1">Configurar 2FA <ExternalLink size={12} /></button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderNotificacoes = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30">
          <h3 className="font-bold text-white">Preferências de E-mail</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { id: 'notif1', title: 'Atividade em Discussões', desc: 'Receba e-mails quando alguém responder às suas discussões.' },
            { id: 'notif2', title: 'Novos Seguidores', desc: 'Avisar quando um novo usuário começar a te seguir.' },
            { id: 'notif3', title: 'Atualizações de Projetos', desc: 'Resumos semanais dos projetos que você favoritou.' },
          ].map(item => (
            <div key={item.id} className="flex items-start justify-between gap-4 pb-4 border-b border-gh-border last:border-0 last:pb-0">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-gh-muted">{item.desc}</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" id={item.id} />
                <div className="w-11 h-6 bg-gh-hover border border-gh-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gh-muted after:border-gh-muted after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gh-blue peer-checked:after:bg-white peer-checked:border-gh-blue"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderAparencia = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30">
          <h3 className="font-bold text-white">Modo de Exibição</h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="border-2 border-gh-blue bg-gh-bg p-4 rounded-xl flex flex-col items-center gap-3 transition-all ring-4 ring-gh-blue/10">
            <div className="w-full h-20 bg-[#0d1117] border border-gh-border rounded-lg p-2 space-y-1">
               <div className="h-2 w-1/2 bg-gh-border rounded"></div>
               <div className="h-2 w-3/4 bg-gh-blue/20 rounded"></div>
            </div>
            <span className="text-sm font-bold flex items-center gap-2"><Moon size={14} /> Dark (Default)</span>
          </button>
          <button className="border border-gh-border bg-white p-4 rounded-xl flex flex-col items-center gap-3 opacity-50 cursor-not-allowed hover:bg-gray-50 transition-all">
             <div className="w-full h-20 bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-1">
               <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
               <div className="h-2 w-3/4 bg-blue-100 rounded"></div>
            </div>
            <span className="text-sm font-bold text-gray-900 flex items-center gap-2"><Sun size={14} /> Light</span>
          </button>
          <button className="border border-gh-border bg-gh-card p-4 rounded-xl flex flex-col items-center gap-3 transition-all hover:bg-gh-hover group">
             <div className="w-full h-20 bg-gh-header border border-gh-border rounded-lg p-2 flex items-center justify-center">
                <Palette size={24} className="text-gh-muted group-hover:text-gh-blue transition-colors" />
             </div>
            <span className="text-sm font-bold text-gh-text">Custom Colors</span>
          </button>
        </div>
      </section>
    </div>
  );

  const renderPrivacidade = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30">
          <h3 className="font-bold text-white">Configurações de Privacidade</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Perfil Privado</h4>
              <p className="text-xs text-gh-muted">Esconder suas atividades e projetos da aba pública.</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gh-hover border border-gh-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gh-muted after:border-gh-muted after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gh-blue peer-checked:after:bg-white peer-checked:border-gh-blue"></div>
            </div>
          </div>
          <div className="pt-4 border-t border-gh-border">
            <h4 className="text-sm font-bold text-white mb-2">Segurança da Conta</h4>
            <div className="bg-gh-bg border border-gh-border rounded-lg p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Lock size={18} className="text-gh-muted" />
                  <span className="text-sm">Mostrar logins ativos</span>
               </div>
               <ChevronRight size={16} className="text-gh-muted" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFaturamento = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-gh-card border border-gh-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gh-border bg-gh-header/30 flex items-center justify-between">
          <h3 className="font-bold text-white">Plano Atual</h3>
          <span className="px-2 py-0.5 bg-gh-blue/10 text-gh-blue border border-gh-blue/20 rounded text-[10px] font-bold uppercase">Free</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gh-header/50 border border-gh-border rounded-xl">
             <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-white">Plexus Premium</h4>
                <p className="text-xs text-gh-muted">Mais armazenamento, projetos privados ilimitados e badges exclusivos.</p>
             </div>
             <button className="w-full sm:w-auto px-6 py-2 bg-gh-blue text-gh-bg font-bold rounded-md text-sm hover:bg-blue-400 transition-colors">Fazer Upgrade</button>
          </div>
          
          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2"><CreditCard size={16} className="text-gh-muted" /> Histórico de Pagamentos</h4>
            <div className="border border-gh-border rounded-lg p-12 text-center">
               <p className="text-sm text-gh-muted">Nenhuma transação encontrada.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'conta': return renderConta();
      case 'seguranca': return renderSeguranca();
      case 'notificacoes': return renderNotificacoes();
      case 'aparencia': return renderAparencia();
      case 'privacidade': return renderPrivacidade();
      case 'faturamento': return renderFaturamento();
      default: return renderConta();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-gh-border pb-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <SettingsIcon className="text-gh-muted" />
          Configurações da Conta
        </h2>
        <p className="text-gh-muted mt-1 text-sm">Gerencie suas preferências de conta, segurança e faturamento.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as SettingsTab)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all whitespace-nowrap lg:w-full border-l-2 ${
                  activeTab === item.id 
                  ? 'bg-gh-hover text-white font-semibold border-gh-blue' 
                  : 'text-gh-text hover:bg-gh-hover border-transparent hover:border-gh-muted'
                }`}
              >
                <span className={activeTab === item.id ? 'text-gh-blue' : 'text-gh-muted'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 max-w-4xl">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
