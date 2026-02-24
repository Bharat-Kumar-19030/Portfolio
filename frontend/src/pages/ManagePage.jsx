import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiTrash2, FiCheck, FiLogOut, FiRefreshCw, FiCircle, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import API from '../utils/api';

const ManagePage = ({ password, onLogout }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const authHeaders = { 'x-admin-password': password };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/manage/messages', { headers: authHeaders });
      if (res.data.success) setMessages(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        onLogout();
        navigate('/');
      } else {
        setError('Failed to load messages. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id, read) => {
    setActionLoading(id + (read ? '-read' : '-unread'));
    try {
      await API.patch(`/manage/messages/${id}/${read ? 'read' : 'unread'}`, {}, { headers: authHeaders });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read } : m));
    } catch (err) {
      if (err.response?.status === 401) { onLogout(); navigate('/'); }
    } finally {
      setActionLoading(null);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    setActionLoading(id + '-delete');
    try {
      await API.delete(`/manage/messages/${id}`, { headers: authHeaders });
      setMessages(prev => prev.filter(m => m._id !== id));
      if (expanded === id) setExpanded(null);
    } catch (err) {
      if (err.response?.status === 401) { onLogout(); navigate('/'); }
    } finally {
      setActionLoading(null);
    }
  };

  const unread = messages.filter(m => !m.read).length;
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'

  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  const formatDate = (d) => new Date(d).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen noise-bg grid-bg text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <span className="text-sm font-bold font-mono">BK</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Contact Messages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                {unread} unread
              </span>
            )}
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => { onLogout(); navigate('/'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              <FiLogOut className="text-xs" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats / Filter Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { key: 'all',    label: 'Total',  value: messages.length,          color: 'text-white',       ring: 'border-white/20' },
            { key: 'unread', label: 'Unread', value: unread,                   color: 'text-blue-400',  ring: 'border-blue-500/40' },
            { key: 'read',   label: 'Read',   value: messages.length - unread, color: 'text-emerald-400', ring: 'border-emerald-500/40' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`glass-strong rounded-xl p-4 text-center transition-all duration-200 border ${
                filter === s.key ? s.ring + ' bg-white/5' : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className={`text-xs mt-0.5 ${filter === s.key ? 'text-gray-300' : 'text-gray-500'}`}>{s.label}</div>
              {filter === s.key && (
                <div className={`w-6 h-0.5 rounded-full mx-auto mt-2 ${s.color.replace('text-', 'bg-')}`} />
              )}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="glass border border-red-500/30 rounded-xl p-4 mb-6 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Messages */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm font-mono">Loading messages...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FiMail className="text-4xl mx-auto mb-3 opacity-30" />
            <p className="text-sm">No messages yet</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FiMail className="text-4xl mx-auto mb-3 opacity-30" />
            <p className="text-sm">No {filter} messages</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-strong rounded-xl overflow-hidden border transition-colors ${
                  msg.read ? 'border-white/5' : 'border-blue-500/20'
                }`}
              >
                {/* Message Header */}
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
                >
                  {/* Unread dot */}
                  <div className="flex-shrink-0">
                    {!msg.read ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                      </span>
                    ) : (
                      <FiCircle className="text-gray-600 text-xs" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${msg.read ? 'text-gray-300' : 'text-white'}`}>
                        {msg.name}
                      </span>
                      <span className="text-xs text-gray-500">{msg.email}</span>
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${msg.read ? 'text-gray-500' : 'text-gray-400'}`}>
                      {msg.subject} — {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-600 hidden sm:block">{formatDate(msg.createdAt)}</span>
                    {expanded === msg._id ? (
                      <FiChevronUp className="text-gray-500 text-sm" />
                    ) : (
                      <FiChevronDown className="text-gray-500 text-sm" />
                    )}
                  </div>
                </div>

                {/* Expanded Body */}
                <AnimatePresence>
                  {expanded === msg._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-white/5 pt-4">
                        {/* Subject */}
                        <p className="text-xs text-gray-500 mb-1 font-mono uppercase tracking-wider">Subject</p>
                        <p className="text-sm text-gray-200 mb-4">{msg.subject || 'General Inquiry'}</p>

                        {/* Message */}
                        <p className="text-xs text-gray-500 mb-1 font-mono uppercase tracking-wider">Message</p>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">{msg.message}</p>

                        {/* Date */}
                        <p className="text-xs text-gray-600 mb-5">Received: {formatDate(msg.createdAt)}</p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Reply via email */}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent('Re: ' + (msg.subject || 'Your message'))}&body=${encodeURIComponent(`Hi ${msg.name},\n\n`)}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-300 hover:bg-blue-500/30 transition-colors"
                          >
                            <FiMail className="text-xs" /> Reply via Email
                            <FiExternalLink className="text-[10px]" />
                          </a>

                          {/* Mark read/unread */}
                          <button
                            onClick={() => markRead(msg._id, !msg.read)}
                            disabled={actionLoading === msg._id + (msg.read ? '-unread' : '-read')}
                            className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
                          >
                            <FiCheck className="text-xs" />
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            disabled={actionLoading === msg._id + '-delete'}
                            className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50 ml-auto"
                          >
                            <FiTrash2 className="text-xs" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
