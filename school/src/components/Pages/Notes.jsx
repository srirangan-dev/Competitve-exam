import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Save, X, BookOpen } from 'lucide-react';
import { useNotesStore } from '../../store';

const SUBJECTS = ['General', 'Quantitative Aptitude', 'Reasoning', 'English', 'History', 'Polity', 'Geography', 'Economy', 'General Awareness'];

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', subject: 'General', topic: '', tags: '' });

  const resetForm = () => {
    setForm({ title: '', content: '', subject: 'General', topic: '', tags: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      subject: form.subject,
      topic: form.topic.trim() || 'General',
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    if (editingId) {
      updateNote(editingId, payload);
    } else {
      addNote(payload);
    }
    resetForm();
  };

  const handleEdit = (note) => {
    setForm({
      title: note.title,
      content: note.content,
      subject: note.subject,
      topic: note.topic,
      tags: note.tags.join(', '),
    });
    setEditingId(note.id);
    setIsEditing(true);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || n.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
          <p className="text-sm text-gray-500 mt-1">Write and save notes for any topic — they're saved on this device.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsEditing(true); }}
          className="flex items-center gap-2 bg-[#185FA5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#144d87] transition"
        >
          <Plus size={18} /> New Note
        </button>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes by title, content, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
        >
          <option value="All">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Editor */}
      {isEditing && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">{editingId ? 'Edit Note' : 'New Note'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            />
            <input
              type="text"
              placeholder="Topic (e.g. Percentage, Polity Article 32)"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            >
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30"
            />
          </div>
          <textarea
            placeholder="Write your notes here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 resize-none mb-3"
          />
          <div className="flex justify-end gap-2">
            <button onClick={resetForm} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#185FA5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#144d87] transition"
            >
              <Save size={16} /> Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No notes yet. Click "New Note" to write your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{note.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{note.subject} • {note.topic}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => handleEdit(note)} className="text-gray-400 hover:text-[#185FA5] p-1">
                    <Edit3 size={15} />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-4">{note.content}</p>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {note.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-[#E6F1FB] text-[#185FA5] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <p className="text-[11px] text-gray-400 mt-3">
                Updated {new Date(note.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;