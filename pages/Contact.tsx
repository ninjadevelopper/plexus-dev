
import React from 'react';
// Added ArrowRight to imports to fix the error on line 121
import { Mail, MessageSquare, HelpCircle, Send, MapPin, Globe, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white leading-tight">Como podemos <span className="text-gh-blue">ajudar?</span></h1>
        <p className="text-gh-muted text-lg max-w-2xl mx-auto">
          Nossa equipe está à disposição para ouvir suas sugestões, dúvidas ou relatórios de bugs. Sinta-se em casa.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gh-card border border-gh-border rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 bg-gh-blue/10 rounded-lg flex items-center justify-center text-gh-blue">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">E-mail de Suporte</h3>
              <p className="text-sm text-gh-muted">Respostas em até 24h úteis.</p>
              <a href="mailto:support@plexus.app" className="text-gh-blue text-sm font-semibold hover:underline block mt-2">support@plexus.app</a>
            </div>
          </div>

          <div className="bg-gh-card border border-gh-border rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">Comunidade</h3>
              <p className="text-sm text-gh-muted">Dúvidas rápidas e feedback.</p>
              <button className="text-green-500 text-sm font-semibold hover:underline block mt-2">Discord Oficial</button>
            </div>
          </div>

          <div className="bg-gh-card border border-gh-border rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white">Escritórios</h3>
              <div className="flex items-start gap-2 text-xs text-gh-muted mt-2">
                <MapPin size={14} className="shrink-0" />
                <span>Plexus Labs, Av. Paulista, 1000 - São Paulo, BR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-gh-card border border-gh-border rounded-2xl overflow-hidden">
            <div className="p-8 md:p-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Envie uma mensagem</h3>
                <p className="text-sm text-gh-muted italic">Ainda não temos um formulário real processado, mas adoraríamos ouvir você.</p>
              </div>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Seu Nome</label>
                  <input 
                    type="text" 
                    className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all"
                    placeholder="João Silva"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">E-mail</label>
                  <input 
                    type="email" 
                    className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all"
                    placeholder="joao@exemplo.com"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Assunto</label>
                  <select className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all">
                    <option>Suporte Técnico</option>
                    <option>Feedback de Produto</option>
                    <option>Relatório de Bug</option>
                    <option>Parcerias</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gh-muted uppercase tracking-wider">Mensagem</label>
                  <textarea 
                    className="w-full bg-gh-bg border border-gh-border rounded-lg px-4 py-3 text-sm focus:border-gh-blue outline-none transition-all min-h-[150px] resize-none"
                    placeholder="Como podemos ajudar hoje?"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button className="bg-gh-blue hover:bg-blue-400 text-gh-bg font-black px-10 py-3 rounded-xl transition-all flex items-center gap-2 group">
                    Enviar Mensagem
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Link */}
      <div className="bg-gh-bg border border-gh-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-dashed">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gh-hover rounded-xl">
            <HelpCircle size={24} className="text-gh-muted" />
          </div>
          <div>
            <h4 className="font-bold text-white">Dúvida comum?</h4>
            <p className="text-sm text-gh-muted">Confira nossa documentação antes de enviar sua mensagem.</p>
          </div>
        </div>
        <button className="text-gh-blue font-bold flex items-center gap-2 hover:underline">
          Acessar Docs <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Contact;
