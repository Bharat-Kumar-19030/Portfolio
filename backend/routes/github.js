const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'bharatkumar19030';
const GITHUB_API = 'https://api.github.com';

const githubHeaders = () => ({
  'Accept': 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }),
});

// GET /api/github/user - Get GitHub user profile
router.get('/user', async (req, res) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: githubHeaders(),
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
  }
});

// GET /api/github/repos - Get GitHub repositories
router.get('/repos', async (req, res) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
      { headers: githubHeaders() }
    );
    
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      topics: repo.topics,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    }));

    res.json({ success: true, data: repos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
});

// GET /api/github/stats - Get aggregated stats
router.get('/stats', async (req, res) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers: githubHeaders() }),
      axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`, { headers: githubHeaders() }),
    ]);

    const repos = reposRes.data;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];

    res.json({
      success: true,
      data: {
        username: GITHUB_USERNAME,
        public_repos: userRes.data.public_repos,
        followers: userRes.data.followers,
        following: userRes.data.following,
        total_stars: totalStars,
        total_forks: totalForks,
        languages,
        avatar_url: userRes.data.avatar_url,
        bio: userRes.data.bio,
        html_url: userRes.data.html_url,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
});

// GET /api/github/streak - Proxy GitHub streak stats SVG from Heroku
router.get('/streak', async (req, res) => {
  try {
    const url = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=7c3aed&fire=06b6d4&currStreakLabel=7c3aed&sideLabels=9ca3af&dates=6b7280&stroke=1f2937`;
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 });
    res.set('Content-Type', 'image/svg+xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(response.data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch streak image' });
  }
});

module.exports = router;
