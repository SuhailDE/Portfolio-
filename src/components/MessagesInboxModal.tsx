import React, { useState } from 'react';
import { X, Mail, Trash2, CheckCircle2, Clock, Inbox, AlertTriangle } from 'lucide-react';
import { ContactMessage } from '../types/portfolio';

interface MessagesInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onToggleRead: (id: string) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
}

export const MessagesInboxModal: React.FC<MessagesInboxModalProps> = ({
  isOpen,
  onClose,
  messages,
  onToggleRead,
  onDeleteMessage
}) => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await onDeleteMessage(id);
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b1324] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Inquiries & Messages Collection</span>
                <span className="text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                  db.messages ({messages.length})
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Contact submissions stored persistently in MongoDB via Express REST API
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

        {/* Modal Split View */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
          {/* Left Messages List */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto divide-y divide-slate-800/80 bg-slate-950/40">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No messages in the database yet. Send one via the Contact form!
              </div>
            ) : (
              messages.map((msg) => {
                const isSelected = selectedMessage?._id === msg._id;
                return (
                  <div
                    key={msg._id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (!msg.isRead) {
                        onToggleRead(msg._id);
                      }
                    }}
                    className={`p-4 cursor-pointer transition-colors relative ${
                      isSelected
                        ? 'bg-slate-800/80 border-l-2 border-cyan-400'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-white truncate">{msg.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-cyan-400 font-medium truncate mb-1">
                      {msg.subject || msg.projectType}
                    </p>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-slate-500 truncate">{msg.email}</span>
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400" title="Unread" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Message Reader */}
          <div className="md:col-span-7 overflow-y-auto p-6 flex flex-col justify-between bg-[#0b1324]">
            {selectedMessage ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
                      {selectedMessage.projectType}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {selectedMessage.subject}
                  </h3>

                  <div className="text-xs text-slate-400 space-y-0.5">
                    <p>From: <strong className="text-slate-200">{selectedMessage.name}</strong> ({selectedMessage.email})</p>
                    <p className="font-mono text-[10px] text-slate-500">MongoDB _id: {selectedMessage._id}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onToggleRead(selectedMessage._id)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                  </button>

                  <button
                    onClick={(e) => handleDelete(selectedMessage._id, e)}
                    disabled={deletingId === selectedMessage._id}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Document</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs py-12">
                <Mail className="w-8 h-8 text-slate-600 mb-2 stroke-[1.5]" />
                <p>Select a message from the left to view complete details.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Persisted across sessions in the backend document store</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
