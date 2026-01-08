
import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, TrendingUp, Heart, Share2, ArrowRight, RefreshCw, MessageSquare } from 'lucide-react';
import { getSmartRecommendations } from '../services/geminiService';

const Explore: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    // Simulating user interests for the prompt
    const interests = ["Modern UI Design", "Environmental Science", "Full-stack development"];
    const recs = await getSmartRecommendations(interests);
    setRecommendations(recs);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Compass className="text-pink-500" size={32} />
          Explore the Hub
        </h2>
        <p className="text-gh-muted max-w-xl mx-auto">
          Discover curated content, trending topics, and community-selected masterpieces.
        </p>
      </div>

      <section className="bg-gh-card border border-gh-border rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-gh-blue/5 group-hover:text-gh-blue/10 transition-colors">
          <Sparkles size={120} />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-orange-400" size={20} />
              AI Recommendations For You
            </h3>
            <button 
              onClick={fetchRecommendations}
              disabled={loading}
              className="p-2 hover:bg-gh-hover rounded-full transition-colors disabled:opacity-50"
              title="Refresh recommendations"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gh-hover animate-pulse rounded-lg border border-gh-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-gh-bg border border-gh-border p-4 rounded-lg hover:border-gh-blue transition-all cursor-pointer group">
                  <p className="font-semibold text-gh-text group-hover:text-gh-blue mb-2">{rec}</p>
                  <div className="flex items-center gap-1 text-xs text-gh-muted font-bold">
                    EXPLORE <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-green-500" size={20} />
            Trending Projects
          </h3>
          <div className="space-y-4">
            {[
              { title: 'The Minimalist Handbook', likes: '2.4k', owner: 'minimalist_lab' },
              { title: 'Solar Tracking OS', likes: '1.8k', owner: 'sunpower' },
              { title: 'Typeface Explorer', likes: '1.1k', owner: 'fonts_galore' }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gh-card border border-gh-border rounded-lg hover:bg-gh-hover transition-colors">
                <div>
                  <h4 className="font-bold text-gh-blue hover:underline cursor-pointer">{p.title}</h4>
                  <p className="text-xs text-gh-muted">by @{p.owner}</p>
                </div>
                <div className="flex items-center gap-4">
                   <span className="flex items-center gap-1 text-xs text-gh-muted"><Heart size={14} className="text-red-500" /> {p.likes}</span>
                   <Share2 size={16} className="text-gh-muted hover:text-white cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={20} />
            Top Discussions
          </h3>
          <div className="space-y-4">
             {[
              { title: 'Is the future of the web local-first?', comments: 142, tag: 'Architecture' },
              { title: 'My journey into Generative Art', comments: 89, tag: 'Story' },
              { title: 'How to build a community from zero', comments: 234, tag: 'General' }
            ].map((d, i) => (
              <div key={i} className="p-4 bg-gh-card border border-gh-border rounded-lg hover:bg-gh-hover transition-colors flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-gh-hover border border-gh-border px-1.5 py-0.5 rounded text-gh-muted uppercase tracking-tighter mb-2 inline-block">
                    {d.tag}
                  </span>
                  <h4 className="font-bold text-sm">{d.title}</h4>
                  <p className="text-xs text-gh-muted mt-1">{d.comments} comments</p>
                </div>
                <button className="text-gh-muted hover:text-gh-blue"><ArrowRight size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
