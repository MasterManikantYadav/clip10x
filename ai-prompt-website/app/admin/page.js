'use client';
import { useState, useEffect } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Upload, Plus, Trash2, Eye, Save, X } from 'lucide-react';

export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    howToUse: '',
    rawImage: '',
    generatedImage: '',
    prompt: '',
    tags: '',
    timer: 0,
  });
  const [rawImageFile, setRawImageFile] = useState(null);
  const [genImageFile, setGenImageFile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'ai-prompts');
    
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    const data = await res.json();
    return data.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const rawUrl = rawImageFile ? await handleImageUpload(rawImageFile) : formData.rawImage;
      const genUrl = genImageFile ? await handleImageUpload(genImageFile) : formData.generatedImage;

      if (!rawUrl || !genUrl) {
        setMessage('Please provide both images');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        rawImage: rawUrl,
        generatedImage: genUrl,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        timer: parseInt(formData.timer) || 0,
      };

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Post created successfully!');
        setFormData({
          title: '', shortDescription: '', howToUse: '', rawImage: '', generatedImage: '', prompt: '', tags: '', timer: 0,
        });
        setRawImageFile(null);
        setGenImageFile(null);
        setShowForm(false);
        fetchPosts();
      } else {
        setMessage('Error creating post');
      }
    } catch (e) {
      setMessage('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this post?')) return;
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-800 mb-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="e.g., Best Wedding Photo Prompt"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="wedding, portrait, romantic"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <input 
                type="text" 
                value={formData.shortDescription}
                onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                placeholder="Brief description for cards and SEO"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">How to Use (Rich Text)</label>
              <RichTextEditor 
                value={formData.howToUse}
                onChange={val => setFormData({...formData, howToUse: val})}
                placeholder="Explain how to use this prompt, best settings, tips..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Raw Image (Before) *</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setRawImageFile(e.target.files[0])}
                    className="w-full text-sm"
                  />
                  {rawImageFile && (
                    <p className="text-xs text-green-600 mt-2">Selected: {rawImageFile.name}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500">Or paste URL:</p>
                <input 
                  type="url" 
                  value={formData.rawImage}
                  onChange={e => setFormData({...formData, rawImage: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Generated Image (After) *</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setGenImageFile(e.target.files[0])}
                    className="w-full text-sm"
                  />
                  {genImageFile && (
                    <p className="text-xs text-green-600 mt-2">Selected: {genImageFile.name}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500">Or paste URL:</p>
                <input 
                  type="url" 
                  value={formData.generatedImage}
                  onChange={e => setFormData({...formData, generatedImage: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prompt Text * (Users will copy this)</label>
              <textarea 
                required
                value={formData.prompt}
                onChange={e => setFormData({...formData, prompt: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-32 font-mono text-sm"
                placeholder="A beautiful wedding photo..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Copy Timer (seconds, default 0)</label>
              <input 
                type="number" 
                min="0" 
                max="60"
                value={formData.timer}
                onChange={e => setFormData({...formData, timer: e.target.value})}
                className="w-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500">Set 0 for instant copy. Higher values for ad revenue optimization.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold">All Posts ({posts.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 text-left">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium">ID</th>
                  <th className="px-6 py-3 text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-sm font-medium">Timer</th>
                  <th className="px-6 py-3 text-sm font-medium">Views</th>
                  <th className="px-6 py-3 text-sm font-medium">Copies</th>
                  <th className="px-6 py-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm">{post.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-gray-500">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{post.timer}s</td>
                    <td className="px-6 py-4 text-sm">{post.views}</td>
                    <td className="px-6 py-4 text-sm">{post.copies}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a 
                          href={`/prompts/${post.slug}`} 
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye size={16} />
                        </a>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No posts yet. Create your first post above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}