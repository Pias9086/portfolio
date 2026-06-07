import React, { useState } from 'react';
import { X, Copy, Check, Download, GitBranch, Terminal, Globe, Code } from 'lucide-react';
import { PortfolioConfig } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
}

export default function ExportModal({ isOpen, onClose, config }: ExportModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-config-${config.name.toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const gitInitCommands = `git init
git add .
git commit -m "feat: initial interactive portfolio design"`;

  const githubPushCommands = `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main`;

  const viteGhPagesConfig = `// Add this to your vite.config.ts if deploying to https://<USERNAME>.github.io/<REPO>/
// Set base: '/<REPO>/'
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // other config...
})`;

  const githubActionsYaml = `# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in" id="export-modal-backdrop">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-stone-900 border border-stone-800 rounded-2xl text-stone-100 shadow-2xl p-6 md:p-8"
        id="export-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight">GitHub Pages Deploy Kit</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2 text-stone-400 hover:text-stone-100 bg-stone-800 rounded-md transition-colors"
            id="close-export-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <p className="text-stone-300 text-sm md:text-base mb-6 leading-relaxed">
          Ready to present your friend <span className="text-emerald-400 font-semibold">{config.name}</span> to the world? 
          This builder is fully compatible with GitHub Pages. Follow our direct, verified deploy blueprint below.
        </p>

        {/* Steps Grid */}
        <div className="space-y-8">
          
          {/* Step 0: Save Config */}
          <div className="p-4 md:p-5 rounded-xl border border-stone-800 bg-stone-950/60 shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-stone-200">
                  <Code className="w-4 h-4 text-sky-400" /> 
                  Step 1: Save Customized Portfolio Data
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Download the current customized setup as a JSON file. Use it to back up your friend's portfolio options.
                </p>
              </div>
              <button
                onClick={handleDownloadConfig}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-stone-950 font-semibold rounded-lg transition-all"
                id="download-config-json"
              >
                <Download className="w-4 h-4" /> Download config.json
              </button>
            </div>
          </div>

          {/* Step 1: Git init */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-stone-200 mb-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Step 2: Initialize Git Repository
            </h3>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Open your terminal inside this project folder, and run these commands to set up revision controls:
            </p>
            <div className="relative">
              <pre className="bg-stone-950 p-4 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto border border-stone-800 pr-12">
                {gitInitCommands}
              </pre>
              <button
                onClick={() => triggerCopy(gitInitCommands, 'init')}
                className="absolute top-2 right-2 p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded transition-colors"
                title="Copy Commands"
              >
                {copiedSection === 'init' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 2: Push to repo */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-stone-200 mb-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              Step 3: Connect and Push to GitHub Repository
            </h3>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Create a new empty repository on GitHub named <code className="px-1.5 py-0.5 bg-stone-950 text-stone-200 border border-stone-800 rounded font-mono text-[11px]">portfolio</code>, then align and push your files:
            </p>
            <div className="relative">
              <pre className="bg-stone-950 p-4 rounded-lg font-mono text-xs text-purple-400 overflow-x-auto border border-stone-800 pr-12">
                {githubPushCommands}
              </pre>
              <button
                onClick={() => triggerCopy(githubPushCommands, 'push')}
                className="absolute top-2 right-2 p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded transition-colors"
                title="Copy Commands"
              >
                {copiedSection === 'push' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 3: GH-pages Base configuration */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-stone-200 mb-2">
              <Globe className="w-4 h-4 text-sky-400" />
              Step 4: Update Base Endpoint (Vite Config)
            </h3>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              If deploying as a subfolder page (e.g. <code className="text-stone-300 font-mono">username.github.io/portfolio</code>), configure your base asset target in <code className="text-stone-300 font-mono">vite.config.ts</code>:
            </p>
            <div className="relative">
              <pre className="bg-stone-950 p-4 rounded-lg font-mono text-xs text-sky-400 overflow-x-auto border border-stone-800 pr-12">
                {viteGhPagesConfig}
              </pre>
              <button
                onClick={() => triggerCopy(viteGhPagesConfig, 'base')}
                className="absolute top-2 right-2 p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded transition-colors"
                title="Copy Commands"
              >
                {copiedSection === 'base' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 4: GitHub Actions Autodeploy */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-stone-200 mb-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Step 5: Infinite Auto-deployment via GitHub Actions (Highly Recommended)
            </h3>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Create a file named <code className="text-stone-300 font-mono">.github/workflows/deploy.yml</code> in your workspace. Paste the action block below. Every push to your repository will auto-compile and live-refresh your GitHub Page!
            </p>
            <div className="relative">
              <pre className="bg-stone-950 p-4 rounded-lg font-mono text-xs text-stone-300 overflow-x-auto border border-stone-800 pr-12 max-h-60 overflow-y-auto">
                {githubActionsYaml}
              </pre>
              <button
                onClick={() => triggerCopy(githubActionsYaml, 'actions')}
                className="absolute top-2 right-2 p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded transition-colors"
                title="Copy Commands"
              >
                {copiedSection === 'actions' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-6 mt-8 border-t border-stone-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-sm font-semibold rounded-lg transition-colors"
            id="close-deploy-modal-footer"
          >
            Got It, Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
