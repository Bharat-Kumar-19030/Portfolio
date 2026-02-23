import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin,
  FiUser, FiMessageSquare, FiAtSign,
} from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiHackerrank } from 'react-icons/si';
import toast from 'react-hot-toast';
import API from '../utils/api';

const contactInfo = [
  {
    icon: <FiMail className="text-xl" />,
    label: 'Email',
    value: 'bharatkumar19030@gmail.com',
    href: 'mailto:bharatkumar19030@gmail.com',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: <FiPhone className="text-xl" />,
    label: 'Phone',
    value: '+91 9729024316',
    href: 'tel:+919729024316',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <FiMapPin className="text-xl" />,
    label: 'Location',
    value: 'Phagwara, Punjab, India',
    href: '#',
    color: 'from-pink-500 to-rose-500',
  },
];

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Bharat-Kumar-19030', color: 'hover:bg-gray-500/20 hover:text-white' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bharatkumar19030/', color: 'hover:bg-blue-500/20 hover:text-blue-400' },
  { icon: <SiLeetcode />, label: 'LeetCode', href: 'https://leetcode.com/u/bharatkumar19030/', color: 'hover:bg-yellow-500/20 hover:text-yellow-400' },
  { icon: <SiGeeksforgeeks />, label: 'GeeksForGeeks', href: 'https://www.geeksforgeeks.org/profile/bharatkumsdro', color: 'hover:bg-green-500/20 hover:text-green-400' },
  // { icon: <SiCodechef />, label: 'CodeChef', href: 'https://codechef.com/users/bharatkumar19030', color: 'hover:bg-amber-500/20 hover:text-amber-400' },
  { icon: <SiHackerrank />, label: 'HackerRank', href: 'https://www.hackerrank.com/profile/bharatkumar19030', color: 'hover:bg-emerald-500/20 hover:text-emerald-400' },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        toast.success(res.data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px]" />

      <div className="section-padding" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">
            Let's connect
          </span>
          <h2 className="section-title">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
          <p className="section-subtitle mt-6">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 items-end gap-8 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info text */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Let's work together</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                I'm always excited to connect with fellow developers, collaborate on interesting projects, 
                or discuss new opportunities. Drop me a message and I'll get back to you as soon as possible!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl group cursor-pointer card-hover"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-2xl space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiAtSign className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMessageSquare className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (Optional)"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your Message..."
                className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all text-sm resize-none"
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm bg-300% animate-gradient"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* <p className="text-xs text-gray-500 text-center">
                Your message will be saved and I'll respond within 24 hours
              </p> */}
            </form>
          </motion.div>
        </div>
        <div>
          {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6 space-x-8"
            >
              <h4 className="ml-8 text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Find me on</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-gray-400 text-sm font-medium transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                    <span className="hidden sm:inline">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
