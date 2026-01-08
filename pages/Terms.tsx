
import React from 'react';
import { ShieldCheck, FileText, Scale, AlertCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-white">Termos de Uso</h1>
        <p className="text-gh-muted text-lg">Última atualização: 24 de Outubro de 2024</p>
      </header>

      <div className="bg-gh-card border border-gh-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gh-blue">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest">1. Aceitação dos Termos</h2>
            </div>
            <p className="text-gh-text leading-relaxed">
              Ao acessar ou utilizar o Plexus, você concorda em ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço. O Plexus é uma plataforma de colaboração e discussão, e esperamos que todos os usuários ajam de boa fé.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-orange-400">
              <FileText size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest">2. Responsabilidade da Conta</h2>
            </div>
            <p className="text-gh-text leading-relaxed">
              Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta. Não é permitido o uso de identidades falsas ou a personificação de terceiros.
            </p>
            <div className="bg-gh-bg border border-gh-border p-4 rounded-lg flex gap-3 italic text-sm text-gh-muted">
              <AlertCircle className="shrink-0 text-orange-400" size={18} />
              Contas suspeitas de spam ou atividades ilegais serão suspensas imediatamente sem aviso prévio.
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-green-500">
              <Scale size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest">3. Propriedade de Conteúdo</h2>
            </div>
            <p className="text-gh-text leading-relaxed">
              O Plexus não reivindica a propriedade do conteúdo que você publica. No entanto, ao publicar discussões ou projetos, você nos concede uma licença mundial, não exclusiva e livre de royalties para hospedar, exibir e distribuir esse conteúdo dentro da plataforma para fins de colaboração.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-gh-border">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">4. Limitação de Responsabilidade</h2>
            <p className="text-gh-muted text-sm italic leading-relaxed">
              O serviço é fornecido "como está". O Plexus não garante que o serviço será ininterrupto ou livre de erros. Em nenhuma circunstância seremos responsáveis por quaisquer danos indiretos decorrentes do uso da plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
