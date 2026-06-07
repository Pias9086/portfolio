import React, { useState } from 'react';
import { 
  X, Save, RotateCcw, Plus, Trash2, Sliders, Briefcase, 
  GraduationCap, Layers, User, Sparkles, Check, Globe
} from 'lucide-react';
import { PortfolioConfig, Skill, Project, Experience, Education } from '../types';
import { THEMES } from '../data/themes';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onChange: (newConfig: PortfolioConfig) => void;
  onReset: () => void;
}

type TabType = 'general' | 'socials' | 'skills' | 'projects' | 'experience' | 'theme';

export default function EditorDrawer({ isOpen, onClose, config, onChange, onReset }: EditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', level: 80, category: 'frontend' });
  const [newExp, setNewExp] = useState<Partial<Experience>>({ role: '', company: '', period: '', description: '' });
  const [newProj, setNewProj] = useState<Partial<Project>>({ title: '', description: '', image: '', tags: [], featured: false });

  if (!isOpen) return null;

  const updateField = (field: keyof PortfolioConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const updateSocial = (key: string, value: string) => {
    onChange({
      ...config,
      socials: {
        ...config.socials,
        [key]: value
      }
    });
  };

  // Skill Management
  const handleAddSkill = () => {
    if (!newSkill.name) return;
    const skillsList = [...config.skills, newSkill as Skill];
    updateField('skills', skillsList);
    setNewSkill({ name: '', level: 80, category: 'frontend' });
  };

  const handleRemoveSkill = (index: number) => {
    const list = config.skills.filter((_, idx) => idx !== index);
    updateField('skills', list);
  };

  // Experience Management
  const handleAddExp = () => {
    if (!newExp.role || !newExp.company) return;
    const expItem: Experience = {
      id: `exp-${Date.now()}`,
      role: newExp.role,
      company: newExp.company,
      period: newExp.period || 'Present',
      description: newExp.description || '',
    };
    updateField('experience', [...config.experience, expItem]);
    setNewExp({ role: '', company: '', period: '', description: '' });
  };

  const handleRemoveExp = (id: string) => {
    const list = config.experience.filter(ex => ex.id !== id);
    updateField('experience', list);
  };

  // Project Management
  const handleAddProj = () => {
    if (!newProj.title || !newProj.description) return;
    const projItem: Project = {
      id: `proj-${Date.now()}`,
      title: newProj.title,
      description: newProj.description,
      longDescription: newProj.longDescription || '',
      image: newProj.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      tags: newProj.tags || ['Web'],
      liveUrl: newProj.liveUrl || '#',
      githubUrl: newProj.githubUrl || '#',
      featured: !!newProj.featured
    };
    updateField('projects', [...config.projects, projItem]);
    setNewProj({ title: '', description: '', image: '', tags: [], featured: false });
  };

  const handleRemoveProj = (id: string) => {
    const list = config.projects.filter(pr => pr.id !== id);
    updateField('projects', list);
  };

  const categories = [
    { id: 'general', label: 'Persona Info', icon: User },
    { id: 'socials', label: 'Social Networks', icon: Globe },
    { id: 'theme', label: 'Visual Theme', icon: Sparkles },
    { id: 'skills', label: 'Skillset List', icon: Sliders },
    { id: 'projects', label: 'Projects Grid', icon: Layers },
    { id: 'experience', label: 'Work History', icon: Briefcase },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-45 w-full max-w-lg bg-stone-900 border-l border-stone-850 shadow-2xl flex flex-col text-stone-200 animate-slide-in font-sans" id="editor-drawer-container">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold tracking-tight">Modify Friend&apos;s Portfolio</h3>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onReset}
            className="p-1 px-2 flex items-center gap-1.5 text-xs bg-stone-800 hover:bg-stone-750 hover:text-white rounded border border-stone-700 transition-colors"
            title="Reset to Template Default"
            id="btn-reset-default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" /> Reset
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-400 hover:text-white transition-all"
            id="btn-close-drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Tabs */}
        <div className="w-1/3 border-r border-stone-850 bg-stone-950/40 py-2 overflow-y-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as TabType)}
                className={`w-full flex flex-col sm:flex-row items-center gap-2 px-3 py-3 text-xs md:text-sm font-medium transition-all border-l-3 ${
                  isActive 
                  ? 'border-sky-400 bg-stone-800 text-stone-100' 
                  : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
                id={`tab-category-${cat.id}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-stone-500'}`} />
                <span className="text-center sm:text-left text-[11px] sm:text-xs tracking-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Content Form */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-stone-900/60">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-fade-in" id="panel-general">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">General Personal Details</h4>
              
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  placeholder="e.g. Liam Sterling"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Professional Title</label>
                <input 
                  type="text" 
                  value={config.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  placeholder="e.g. Lead Dev & Artist"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Primary Tagline</label>
                <textarea 
                  rows={2}
                  value={config.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  placeholder="e.g. Building clean, lightning fast websites based in London."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Avatar Content</label>
                  <input 
                    type="text" 
                    value={config.avatarUrl}
                    onChange={(e) => updateField('avatarUrl', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. 👨‍💻 or Image URL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Avatar Type</label>
                  <select
                    value={config.avatarType}
                    onChange={(e) => updateField('avatarType', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  >
                    <option value="emoji">Emoji/Character</option>
                    <option value="url">Direct Image URL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Short About Paragraph</label>
                <textarea 
                  rows={2}
                  value={config.aboutMini}
                  onChange={(e) => updateField('aboutMini', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  placeholder="Keep it around 2-3 sentences. Displays beside avatar."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Full Long Story (About section)</label>
                <textarea 
                  rows={4}
                  value={config.aboutFull}
                  onChange={(e) => updateField('aboutFull', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                  placeholder="The deeper explanation about their career, inspirations, and philosophy."
                />
              </div>
            </div>
          )}

          {/* Socials Tab */}
          {activeTab === 'socials' && (
            <div className="space-y-4 animate-fade-in" id="panel-socials">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">Profiles and Accounts</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Contact Email Address</label>
                  <input 
                    type="email" 
                    value={config.socials.email}
                    onChange={(e) => updateSocial('email', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. friend@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">GitHub Profile URL</label>
                  <input 
                    type="url" 
                    value={config.socials.github}
                    onChange={(e) => updateSocial('github', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. https://github.com/profile"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">LinkedIn URL</label>
                  <input 
                    type="url" 
                    value={config.socials.linkedin}
                    onChange={(e) => updateSocial('linkedin', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. https://linkedin.com/in/profile"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Twitter/X URL</label>
                  <input 
                    type="url" 
                    value={config.socials.twitter}
                    onChange={(e) => updateSocial('twitter', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. https://twitter.com/handle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Dribbble Portfolio (Optional)</label>
                  <input 
                    type="url" 
                    value={config.socials.dribbble}
                    onChange={(e) => updateSocial('dribbble', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-stone-950 border border-stone-800 focus:outline-hidden focus:border-sky-400 text-stone-100"
                    placeholder="e.g. https://dribbble.com/designer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-4 animate-fade-in" id="panel-theme">
              <h4 className="text-sm font-semibold text-sky-400 mb-1 font-sans">Aesthetic Identity Settings</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Choose a baseline look and feel. Each style dynamically updates background palettes, contrast cards, shadows, and default typography structures instantly.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = config.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => updateField('themeId', theme.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-center justify-between transition-all ${
                        isSelected 
                        ? 'bg-sky-950/35 border-sky-400 shadow-md ring-1 ring-sky-400' 
                        : 'bg-stone-950/80 border-stone-800 hover:border-stone-700'
                      }`}
                      id={`theme-select-btn-${theme.id}`}
                    >
                      <div>
                        <span className="font-semibold block text-stone-100">{theme.name}</span>
                        <span className="text-[11px] text-stone-400 block mt-1 capitalize font-mono">
                          Font: {theme.fontFamily} &bull; {theme.darkTheme ? 'Dark Mode' : 'Light Mode'}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <div className="p-1 bg-sky-500 rounded-full text-stone-950">
                          <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-fade-in" id="panel-skills">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">Skills Array</h4>
              
              {/* Add New Skill */}
              <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg space-y-3">
                <span className="text-xs font-semibold text-stone-300 block">Add New Ability</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Skill Name</label>
                    <input 
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g. Next.js"
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                      className="w-full px-2 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="design">Design</option>
                      <option value="tools">Tools</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-[10px] text-stone-400">Mastery Level ({newSkill.level}%)</label>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                <button 
                  onClick={handleAddSkill}
                  className="w-full py-1 text-xs bg-sky-500 hover:bg-sky-600 text-stone-950 font-bold rounded flex items-center justify-center gap-1 transition-all active:scale-97"
                  id="btn-add-skill"
                >
                  <Plus className="w-3.5 h-3.5" /> Append Skill
                </button>
              </div>

              {/* Skills List */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {config.skills.map((sk, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-stone-950/40 border border-stone-850 rounded text-xs">
                    <div>
                      <span className="font-semibold text-stone-100">{sk.name}</span>
                      <span className="ml-2 font-mono text-[10px] bg-stone-800 text-stone-400 px-1 py-0.2 rounded uppercase">{sk.category}</span>
                      <span className="ml-2 text-stone-400 font-medium">({sk.level}%)</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveSkill(index)}
                      className="p-1 hover:bg-stone-850 text-stone-400 hover:text-red-400 rounded transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fade-in" id="panel-projects">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">Projects Portfolio List</h4>

              {/* Add New project */}
              <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg space-y-3 text-xs">
                <span className="font-semibold text-stone-300 block text-xs">Append New Project Card</span>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Project Title</label>
                    <input 
                      type="text"
                      value={newProj.title}
                      onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                      placeholder="e.g. AI Canvas Visualizer"
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Focus Hero Image URL</label>
                    <input 
                      type="text"
                      value={newProj.image}
                      onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                      placeholder="e.g. Unsplash URL"
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Tags / Tech Tags (comma separated)</label>
                    <input 
                      type="text"
                      placeholder="e.g. NextJS, Framer, WebGL"
                      onChange={(e) => setNewProj({ ...newProj, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-0.5">GitHub repository URL</label>
                      <input 
                        type="text"
                        value={newProj.githubUrl}
                        onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
                        placeholder="e.g. https://github.com/..."
                        className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-0.5">Live Demo Endpoint</label>
                      <input 
                        type="text"
                        value={newProj.liveUrl}
                        onChange={(e) => setNewProj({ ...newProj, liveUrl: e.target.value })}
                        placeholder="e.g. https://domain.host"
                        className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Short Summary Description</label>
                    <textarea 
                      rows={2}
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                      placeholder="Brief single-sentence tagline for cards..."
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Detailed Story (Modal overview)</label>
                    <textarea 
                      rows={2}
                      value={newProj.longDescription}
                      onChange={(e) => setNewProj({ ...newProj, longDescription: e.target.value })}
                      placeholder="In-depth details on stack choice and technical architectural design..."
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="feat-proj-check"
                      checked={newProj.featured}
                      onChange={(e) => setNewProj({ ...newProj, featured: e.target.checked })}
                      className="rounded accent-sky-400 bg-stone-900 border-stone-750 text-stone-100 cursor-pointer"
                    />
                    <label htmlFor="feat-proj-check" className="text-[10px] text-stone-400 select-none cursor-pointer">Feature on top grid section</label>
                  </div>
                </div>

                <button 
                  onClick={handleAddProj}
                  className="w-full py-1 bg-sky-500 hover:bg-sky-600 text-stone-950 font-bold rounded flex items-center justify-center gap-1 transition-all active:scale-97 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Append Project Card
                </button>
              </div>

              {/* Projects list */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {config.projects.map((proj) => (
                  <div key={proj.id} className="flex items-center justify-between p-2 bg-stone-950/40 border border-stone-850 rounded text-xs">
                    <div className="truncate pr-2">
                      <span className="font-semibold text-stone-100 block truncate">{proj.title}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{proj.tags.join(', ')}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveProj(proj.id)}
                      className="p-1 hover:bg-stone-850 text-stone-400 hover:text-red-400 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work History */}
          {activeTab === 'experience' && (
            <div className="space-y-4 animate-fade-in" id="panel-exp">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">Career Timeline</h4>

              {/* Add New Exp */}
              <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg space-y-3 text-xs">
                <span className="font-semibold text-stone-300 block text-xs">Append Career Point</span>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-0.5">Role/Title</label>
                      <input 
                        type="text"
                        value={newExp.role}
                        onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                        placeholder="e.g. Senior Architect"
                        className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-0.5">Company</label>
                      <input 
                        type="text"
                        value={newExp.company}
                        onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                        placeholder="e.g. Google Cloud"
                        className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Employment Period</label>
                    <input 
                      type="text"
                      value={newExp.period}
                      onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                      placeholder="e.g. Oct 2024 - Present"
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">Summary of Experience</label>
                    <textarea 
                      rows={2}
                      value={newExp.description}
                      onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                      placeholder="General description of duties..."
                      className="w-full px-2.5 py-1 text-xs rounded bg-stone-900 border border-stone-750 focus:outline-hidden text-stone-100"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddExp}
                  className="w-full py-1 bg-sky-500 hover:bg-sky-600 text-stone-950 font-bold rounded flex items-center justify-center gap-1 transition-all active:scale-97 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Append Experience
                </button>
              </div>

              {/* Exp list */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {config.experience.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-2 bg-stone-950/40 border border-stone-850 rounded text-xs animate-fade-in">
                    <div>
                      <span className="font-semibold text-stone-100 block">{exp.role}</span>
                      <span className="text-[10px] text-stone-400">{exp.company} &bull; {exp.period}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveExp(exp.id)}
                      className="p-1 hover:bg-stone-850 text-stone-400 hover:text-red-400 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-stone-950 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400">
        <span className="flex items-center gap-1 text-[11px]">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          Settings auto-applied instantly
        </span>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-stone-950 font-bold rounded-lg transition-colors flex items-center justify-center text-xs"
        >
          Confirm Controls
        </button>
      </div>
    </div>
  );
}
