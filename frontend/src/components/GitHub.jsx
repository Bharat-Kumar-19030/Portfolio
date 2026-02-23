import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiEye, FiClock } from 'react-icons/fi';
import API from '../utils/api';

const GITHUB_USERNAME = 'Bharat-Kumar-19030';

const fallbackRepos = [
  {
    id: 'f1', name: 'BigBite_Foods',
    description: 'Real-time food delivery platform with live GPS tracking, Razorpay payments, and role-based auth for customers, restaurants & delivery partners.',
    html_url: 'https://github.com/Bharat-Kumar-19030/BigBite_Foods',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    updated_at: '2025-12-01T00:00:00Z',
  },
  {
    id: 'f2', name: 'NexaMart',
    description: 'Full-stack e-commerce platform with product listings, cart, checkout, seller dashboard, and Gemini AI integration.',
    html_url: 'https://github.com/Bharat-Kumar-19030/NexaMart',
    language: 'PHP', stargazers_count: 0, forks_count: 0,
    updated_at: '2025-05-01T00:00:00Z',
  },
  {
    id: 'f3', name: 'SkillStack',
    description: 'Interactive skill showcase platform built to visualise tech stacks with clean UI and smooth animations.',
    html_url: 'https://github.com/Bharat-Kumar-19030/SkillStack',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'f4', name: 'Portfolio',
    description: 'Personal developer portfolio built with React, Tailwind CSS, and a Node.js/Express backend with MongoDB.',
    html_url: `https://github.com/Bharat-Kumar-19030/portfolio`,
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    updated_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'f5', name: 'NASA-Image-Gallery',
    description: "Interactive gallery integrating NASA's APOD API to display daily space images with responsive design.",
    html_url: `https://github.com/Bharat-Kumar-19030/NASA-Images-Gallery`,
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'f6', name: 'Hostel Management System',
    description: 'C++-based hostel management system with CRUD operations.',
    html_url: `https://github.com/Bharat-Kumar-19030/Hostel-Management-System`,
    language: 'C++', stargazers_count: 0, forks_count: 0,
    updated_at: '2024-12-29T00:00:00Z',
  },
  {
    id: 'f7', name: 'Green-Technology-and-Innovation',
    description: 'green technology and innovation project with sustainable development practices.',
    html_url: `https://github.com/Bharat-Kumar-19030/Green-Technology-and-Innovation`,
    language: 'HTML', stargazers_count: 0, forks_count: 0,
    updated_at: '2023-11-19T00:00:00Z',
  },
  
];

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
};

const GitHub = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [repos, setRepos] = useState(fallbackRepos);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const [reposRes, statsRes] = await Promise.allSettled([
        API.get('/github/repos'),
        API.get('/github/stats'),
      ]);

      if (reposRes.status === 'fulfilled' && reposRes.value.data.success) {
        setRepos(reposRes.value.data.data);
        setUsingFallback(false);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data.success) {
        setStats(statsRes.value.data.data);
      }
    } catch (error) {
      console.log('GitHub data fetch failed');
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'today';
    if (diff === 1) return 'yesterday';
    if (diff < 30) return `${diff}d ago`;
    if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
    return `${Math.floor(diff / 365)}y ago`;
  };

  const languages = ['all', ...new Set(repos.map(r => r.language).filter(Boolean))];
  const filteredRepos = filter === 'all' ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="github" className="relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="section-padding" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">
            Open Source
          </span>
          <h2 className="section-title">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto" />
          <p className="section-subtitle mt-6">
            Explore my repositories and contributions on GitHub
          </p>
        </motion.div>

        {/* GitHub Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'Repos', value: stats?.public_repos || repos.length, icon: <FiGithub /> },
            { label: 'Stars', value: stats?.total_stars || 0, icon: <FiStar /> },
            { label: 'Forks', value: stats?.total_forks || 0, icon: <FiGitBranch /> },
            { label: 'Followers', value: stats?.followers || 4, icon: <FiEye /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass-strong p-4 rounded-xl text-center card-hover"
            >
              <div className="text-purple-400 text-xl mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Stats Card + Top Languages - native, no external images */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-4 max-w-4xl mx-auto"
          >
            {/* Stats Card */}
            {/* <div className="glass-strong rounded-xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <FiGithub className="text-purple-400 text-xl" />
                <span className="text-white font-semibold">{GITHUB_USERNAME}'s GitHub Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Stars Earned', value: stats.total_stars, color: 'text-yellow-400' },
                  { label: 'Total Forks', value: stats.total_forks, color: 'text-cyan-400' },
                  { label: 'Public Repos', value: stats.public_repos, color: 'text-purple-400' },
                  { label: 'Followers', value: stats.followers, color: 'text-green-400' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-lg p-3">
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Top Languages */}
            <div className="glass-strong rounded-xl p-6 mb-1 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <FiGitBranch className="text-cyan-400 text-xl" />
                <span className="text-white font-semibold">Most Used Languages</span>
              </div>
              
              {(() => {
                const langCount = {};
                repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
                const total = Object.values(langCount).reduce((a, b) => a + b, 0);
                const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
                return (
                  <div className='grid grid-cols-2 gap-6'>
                    {sorted.map(([lang, count]) => {
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={lang}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="flex items-center gap-1.5 text-gray-300">
                              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: languageColors[lang] || '#8b5cf6' }} />
                              {lang}
                            </span>
                            <span className="text-gray-500">{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: languageColors[lang] || '#8b5cf6' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* GitHub Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-4 w-full"
        >
          <img
            src="/api/github/streak"
            alt="GitHub Streak"
            className="glass rounded-xl p-2 w-full max-w-2xl"
            loading="lazy"
          />
        </motion.div>

        {/* Language Filter */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {languages.slice(0, 8).map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  filter === lang
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {lang === 'all' ? 'All' : lang}
                {lang !== 'all' && (
                  <span
                    className="inline-block w-2 h-2 rounded-full ml-1.5"
                    style={{ backgroundColor: languageColors[lang] || '#8b5cf6' }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Repository Cards */}
        {/* Waking-up banner shown while backend cold-starts */}
        {loading && usingFallback && (
          <div className="flex items-center justify-center gap-2.5 mb-4 px-4 py-2.5 glass border border-yellow-500/20 rounded-xl max-w-sm mx-auto">
            <div className="w-3.5 h-3.5 border-2 border-yellow-500/40 border-t-yellow-400 rounded-full animate-spin flex-shrink-0" />
            <p className="text-xs text-yellow-400/80 font-mono">Waking up server — live repos loading…</p>
          </div>
        )}

        {repos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {filteredRepos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`glass p-5 rounded-xl card-hover group block overflow-hidden transition-opacity duration-500 ${
                  loading && usingFallback ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* Repo Header */}
                <div className="flex items-start justify-between mb-3 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FiGithub className="text-gray-500 flex-shrink-0" />
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                      {repo.name}
                    </h4>
                  </div>
                  {/* <FiExternalLink className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 text-sm" /> */}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                  {repo.description || 'No description provided'}
                </p>

                {/* Repo Stats */}
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] || '#8b5cf6' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FiStar className="text-[10px]" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiGitBranch className="text-[10px]" />
                    {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <FiClock className="text-[10px]" />
                    {getTimeAgo(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">
              Connect the backend server to fetch GitHub repositories
            </p>
          </div>
        )}

        {/* View All on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <FiGithub />
            View All Repositories on GitHub
            <FiExternalLink className="text-xs" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHub;
