
import React, { useState } from 'react';
import { 
  Inbox, 
  CheckCircle, 
  Trash2, 
  MessageSquare, 
  Star, 
  UserPlus, 
  Filter, 
  MoreVertical,
  Circle
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'reply' | 'star' | 'follow' | 'mention';
  user: string;
  target: string;
  time: string;
  unread: boolean;
  content?: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { 
    id: 'n1', 
    type: 'reply', 
    user: 'Sarah Doe', 
    target: 'Futuro da IA no UX', 
    time: '2h atrás', 
    unread: true,
    content: 'Concordo plenamente! Acredito que a IA será fundamental para personalizar a experiência...'
  },
  { 
    id: 'n2', 
    type: 'star', 
    user: 'John Smith', 
    target: 'Nebula UI Kit', 
    time: '4h atrás', 
    unread: true 
  },
  { 
    id: 'n3', 
    type: 'mention', 
    user: 'Alice Vane', 
    target: 'Cidades Sustentáveis', 
    time: '5h atrás', 
    unread: false,
    content: '@você, o que acha de adicionarmos uma seção sobre energia solar?'
  },
  { 
    id: 'n4', 
    type: 'follow', 
    user: 'Marcos Aurelius', 
    target: 'você', 
    time: '1d atrás', 
    unread: false 
  }
];

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.unread);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'reply': return <MessageSquare size={16} className="text-gh-blue" />;
      case 'star': return <Star size={16} className="text-yellow-500" />;
      case 'follow': return <UserPlus size={16} className="text-green-500" />;
      case 'mention': return <Circle size={12} className="text-orange-500 fill-orange-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gh-border pb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Inbox className="text-gh-blue" />
            Notificações
          </h2>
          <p className="text-gh-muted mt-1 text-sm">Acompanhe as interações com seu trabalho e rede.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="flex bg-gh-card border border-gh-border rounded-lg overflow-hidden p-1">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${filter === 'all' ? 'bg-gh-hover text-white' : 'text-gh-muted hover:text-white'}`}
          >
            Todas
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${filter === 'unread' ? 'bg-gh-hover text-white' : 'text-gh-muted hover:text-white'}`}
          >
            Não lidas
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="ml-2 bg-gh-blue text-gh-bg px-1.5 py-0.5 rounded-full text-[10px]">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gh-border rounded-md text-xs hover:bg-gh-hover">
            <Filter size={14} /> Filtro
          </button>
          <button 
            onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gh-border rounded-md text-xs hover:bg-gh-hover"
          >
            <CheckCircle size={14} /> Marcar tudo como lido
          </button>
        </div>
      </div>

      <div className="bg-gh-card border border-gh-border rounded-lg overflow-hidden divide-y divide-gh-border">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-gh-hover rounded-full flex items-center justify-center mx-auto">
              <Inbox size={32} className="text-gh-muted" />
            </div>
            <p className="text-gh-muted font-medium">Você está em dia! Nenhuma notificação por aqui.</p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 flex gap-4 transition-colors hover:bg-gh-hover/30 group relative ${n.unread ? 'border-l-2 border-gh-blue' : ''}`}
            >
              <div className="pt-1 shrink-0">
                {getIcon(n.type)}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-bold text-white hover:text-gh-blue cursor-pointer">{n.user}</span>
                    <span className="text-gh-muted"> 
                      {n.type === 'reply' ? ' respondeu em ' : 
                       n.type === 'star' ? ' favoritou seu projeto ' :
                       n.type === 'follow' ? ' começou a seguir ' :
                       ' mencionou você em '}
                    </span>
                    <span className="font-semibold text-gh-text hover:text-gh-blue cursor-pointer">{n.target}</span>
                  </p>
                  <span className="text-xs text-gh-muted shrink-0 ml-4">{n.time}</span>
                </div>

                {n.content && (
                  <p className="text-xs text-gh-muted bg-gh-bg/50 p-2 rounded border border-gh-border/30 mt-2 italic">
                    "{n.content}"
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => markAsRead(n.id)}
                    className="text-[10px] font-bold text-gh-muted hover:text-gh-blue uppercase tracking-wider"
                  >
                    Marcar como lido
                  </button>
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="text-[10px] font-bold text-gh-muted hover:text-red-500 uppercase tracking-wider"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="shrink-0 self-center">
                <button className="p-1 text-gh-muted hover:bg-gh-hover rounded">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
