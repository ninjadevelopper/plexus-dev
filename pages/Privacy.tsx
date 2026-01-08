
import React from 'react';
import { Eye, Shield, Database, Lock } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white">Política de Privacidade</h1>
        <p className="text-gh-muted text-lg">Sua privacidade é nossa prioridade.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gh-card border border-gh-border p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 bg-gh-blue/10 rounded-xl flex items-center justify-center text-gh-blue">
            <Database size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Dados que Coletamos</h3>
          <p className="text-gh-muted text-sm leading-relaxed">
            Coletamos informações básicas como e-mail, nome de usuário e foto de perfil para fornecer uma experiência personalizada. Também registramos atividades de interação (curtidas, comentários) para melhorar nossos algoritmos de recomendação.
          </p>
        </div>

        <div className="bg-gh-card border border-gh-border p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Segurança de Dados</h3>
          <p className="text-gh-muted text-sm leading-relaxed">
            Utilizamos criptografia de ponta a ponta e práticas de segurança de nível industrial para proteger suas informações contra acesso não autorizado ou vazamentos.
          </p>
        </div>

        <div className="bg-gh-card border border-gh-border p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Uso de IA</h3>
          <p className="text-gh-muted text-sm leading-relaxed">
            O Plexus utiliza modelos de IA (Gemini) para gerar resumos de discussões. Seus dados privados nunca são usados para treinar esses modelos fora do escopo da sua sessão de uso.
          </p>
        </div>

        <div className="bg-gh-card border border-gh-border p-8 rounded-2xl space-y-4">
          <div className="w-12 h-12 bg-orange-400/10 rounded-xl flex items-center justify-center text-orange-400">
            <Eye size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Seus Direitos</h3>
          <p className="text-gh-muted text-sm leading-relaxed">
            Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento através das configurações de perfil. A transparência é a base da nossa plataforma.
          </p>
        </div>
      </div>

      <div className="bg-gh-card border border-gh-border rounded-2xl p-8 text-center">
        <p className="text-gh-muted text-sm">
          Se tiver dúvidas sobre nossa política, entre em contato através do e-mail <span className="text-gh-blue">privacy@plexus.app</span>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
