import React, { useState } from 'react';
import { Database, Play, RefreshCw, X, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { ServerStatus } from '../types/portfolio';

interface MongoPlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
  serverStatus: ServerStatus | null;
}

export const MongoPlayground: React.FC<MongoPlaygroundProps> = ({
  isOpen,
  onClose,
  serverStatus
}) => {
  const [selectedCollection, setSelectedCollection] = useState<'projects' | 'skills' | 'messages' | 'reviews'>('projects');
  const [selectedOperation, setSelectedOperation] = useState<'find' | 'countDocuments' | 'stats'>('find');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [output, setOutput] = useState<unknown | null>(null);
  const [executing, setExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunQuery = async () => {
    setExecuting(true);
    setErrorMessage(null);
    const start = performance.now();

    try {
      const response = await fetch('/api/mongo/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: selectedCollection,
          operation: selectedOperation,
          filter: filterQuery
        })
      });

      const elapsed = Math.round(performance.now() - start);
      setExecutionTime(elapsed);

      const data = await response.json();
      if (!response.ok || data.ok === 0) {
        throw new Error(data.error || 'Query execution failed');
      }
      setOutput(data.result);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
      setOutput(null);
    } finally {
      setExecuting(false);
    }
  };

  const setPreset = (coll: 'projects' | 'skills' | 'messages' | 'reviews', op: 'find' | 'countDocuments' | 'stats', filter = '') => {
    setSelectedCollection(coll);
    setSelectedOperation(op);
    setFilterQuery(filter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#080e1a] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>MongoDB & Node.js Live Console</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Connected
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Directly query backend document collections running in Express & Node.js
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Strip */}
        <div className="px-6 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span>Engine: <strong className="text-slate-200">Node.js {serverStatus?.nodeVersion || 'v22'}</strong></span>
            <span>Database: <strong className="text-cyan-400">{serverStatus?.database.type || 'MongoDB Store'}</strong></span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>projects: <strong className="text-white">{serverStatus?.database.collections.projects ?? 4}</strong></span>
            <span>skills: <strong className="text-white">{serverStatus?.database.collections.skills ?? 4}</strong></span>
            <span>messages: <strong className="text-white">{serverStatus?.database.collections.messages ?? 1}</strong></span>
            <span>reviews: <strong className="text-white">{serverStatus?.database.collections.reviews ?? 3}</strong></span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Preset Buttons */}
          <div>
            <span className="text-xs text-slate-400 block mb-2 font-medium">Quick Query Presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPreset('projects', 'find', '{"category": "Full-Stack"}')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
              >
                db.projects.find({'{category: "Full-Stack"}'})
              </button>
              <button
                onClick={() => setPreset('skills', 'find', '')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
              >
                db.skills.find()
              </button>
              <button
                onClick={() => setPreset('messages', 'countDocuments', '')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
              >
                db.messages.countDocuments()
              </button>
              <button
                onClick={() => setPreset('reviews', 'find', '')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
              >
                db.reviews.find()
              </button>
            </div>
          </div>

          {/* Query Controls */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Target Collection:</label>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="projects">db.projects (Work Portfolios)</option>
                  <option value="skills">db.skills (MERN Competencies)</option>
                  <option value="messages">db.messages (Client Inquiries)</option>
                  <option value="reviews">db.reviews (Endorsements)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">MongoDB Method:</label>
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="find">find(filter)</option>
                  <option value="countDocuments">countDocuments()</option>
                  <option value="stats">stats()</option>
                </select>
              </div>
            </div>

            {selectedOperation === 'find' && (
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">
                  Optional JSON Filter:
                </label>
                <input
                  type="text"
                  placeholder='e.g. {"category": "Full-Stack"}'
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Generated: db.{selectedCollection}.{selectedOperation}({filterQuery ? filterQuery : ''})
              </span>
              <button
                onClick={handleRunQuery}
                disabled={executing}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {executing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Query</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Console */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Response Output
              </span>
              {executionTime !== null && (
                <span className="text-[11px] font-mono text-emerald-400">
                  ⚡ Executed in {executionTime}ms
                </span>
              )}
            </div>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs max-h-72 overflow-y-auto">
              {errorMessage ? (
                <div className="text-rose-400 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              ) : output !== null ? (
                <pre className="text-slate-300 whitespace-pre-wrap break-words">
                  {JSON.stringify(output, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-600">
                  Select a preset above and click &quot;Run Query&quot; to inspect live JSON/BSON records.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Active Node.js Express REST API (/api/mongo/query)
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
