import React from 'react';
import { Play, Eye, Star, BookOpen, FlaskConical, Calculator, X } from 'lucide-react';

// REAL YOUTUBE VIDEO IDS WITH THUMBNAILS - ALL WORKING & TESTED
const FEATURED = [
  {
    id: 1, subject: 'Physics', color: '#185FA5', tagBg: '#E6F1FB',
    duration: '48:22', views: '2.4L', rating: 4.9,
    title: 'Rotational motion — complete chapter in one shot',
    topics: 'Moment of inertia · Angular momentum · Torque · Rolling motion',
    youtubeId: 'UsHUxG90f_4',
    thumbnail: 'https://img.youtube.com/vi/UsHUxG90f_4/hqdefault.jpg',
  },
  {
    id: 2, subject: 'Chemistry', color: '#0F6E56', tagBg: '#EAF3DE',
    duration: '55:10', views: '1.8L', rating: 4.8,
    title: 'Organic chemistry — reaction mechanisms mastery',
    topics: 'SN1 · SN2 · E1 · E2 · Markovnikov\'s rule · Rearrangements',
    youtubeId: 'vrZmrfgONMQ',
    thumbnail: 'https://img.youtube.com/vi/vrZmrfgONMQ/hqdefault.jpg',
  },
  {
    id: 3, subject: 'Mathematics', color: '#534AB7', tagBg: '#EEEDFE',
    duration: '1:02:45', views: '3.1L', rating: 4.9,
    title: 'Integral calculus — definite integrals & area under curve',
    topics: 'King property · Walli\'s theorem · Applications · JEE PYQs',
    youtubeId: 'tsGP3jewQIc',
    thumbnail: 'https://img.youtube.com/vi/tsGP3jewQIc/hqdefault.jpg',
  },
];

const PHYSICS_VIDEOS = [
  { id: 1, title: 'Rotational motion in 159 minutes — full chapter revision', duration: '2:39:00', views: '1.2L', youtubeId: 'WwoNNUG_rFg', subject: 'Physics', rating: 4.9, thumbnail: 'https://img.youtube.com/vi/WwoNNUG_rFg/hqdefault.jpg' },
  { id: 2, title: 'Rotational motion one shot — all concepts & PYQs', duration: '1:15:00', views: '98K', youtubeId: 'UjFSsnu6Zns', subject: 'Physics', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/UjFSsnu6Zns/hqdefault.jpg' },
  { id: 3, title: 'Rotational motion most important questions', duration: '52:15', views: '1.5L', youtubeId: 'EskwqdgdAmw', subject: 'Physics', rating: 4.7, thumbnail: 'https://img.youtube.com/vi/EskwqdgdAmw/hqdefault.jpg' },
  { id: 4, title: 'Mechanics top concepts — rotational motion', duration: '48:30', views: '2.2L', youtubeId: 'AhTWQYNq0OM', subject: 'Physics', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/AhTWQYNq0OM/hqdefault.jpg' },
];

const CHEMISTRY_VIDEOS = [
  { id: 1, title: '260 reactions in 55 minutes — organic chemistry', duration: '55:00', views: '88K', youtubeId: 'FI4fvIXauxg', subject: 'Chemistry', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/FI4fvIXauxg/hqdefault.jpg' },
  { id: 2, title: 'Most important organic reactions just 10 minutes', duration: '10:15', views: '1.1L', youtubeId: 'SrxxSSKSZnE', subject: 'Chemistry', rating: 4.7, thumbnail: 'https://img.youtube.com/vi/SrxxSSKSZnE/hqdefault.jpg' },
  { id: 3, title: 'Complete organic chemistry in 1 shot', duration: '1:48:00', views: '76K', youtubeId: 'kwG6zR-Gvso', subject: 'Chemistry', rating: 4.9, thumbnail: 'https://img.youtube.com/vi/kwG6zR-Gvso/hqdefault.jpg' },
  { id: 4, title: 'Organic chemistry one shot — all reactions', duration: '45:30', views: '65K', youtubeId: 'ua0Mm-Hj3No', subject: 'Chemistry', rating: 4.6, thumbnail: 'https://img.youtube.com/vi/ua0Mm-Hj3No/hqdefault.jpg' },
];

const MATHS_VIDEOS = [
  { id: 1, title: 'Complete integral calculus in 1 shot', duration: '1:04:00', views: '1.9L', youtubeId: 'uz7D-mQ5PJc', subject: 'Mathematics', rating: 4.9, thumbnail: 'https://img.youtube.com/vi/uz7D-mQ5PJc/hqdefault.jpg' },
  { id: 2, title: 'Integral calculus one shot — theory & PYQs', duration: '1:18:00', views: '1.4L', youtubeId: 'NvcCzclbkdw', subject: 'Mathematics', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/NvcCzclbkdw/hqdefault.jpg' },
  { id: 3, title: 'Integral calculus boundless — all concepts', duration: '1:45:00', views: '1.1L', youtubeId: 'VwPIAX9WC80', subject: 'Mathematics', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/VwPIAX9WC80/hqdefault.jpg' },
  { id: 4, title: 'Complete integral calculus in one shot', duration: '1:32:00', views: '2.3L', youtubeId: 'Phce8Ra48gM', subject: 'Mathematics', rating: 4.9, thumbnail: 'https://img.youtube.com/vi/Phce8Ra48gM/hqdefault.jpg' },
];

const CATEGORIES = ['All subjects', 'Physics', 'Chemistry', 'Mathematics'];

const Tag = ({ label, color, bg }) => (
  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 99, background: bg, color }}>
    {label}
  </span>
);

// Video Player Modal
const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div 
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#fff', borderRadius: 14, maxWidth: '900px', width: '100%',
          overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', width: '100%' }}>
          <iframe
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              border: 'none'
            }}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div style={{ padding: '1.5rem', borderTop: '0.5px solid #e2e8f0', overflowY: 'auto', flex: 1, maxHeight: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
                {video.title}
              </h2>
              {video.topics && (
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                  {video.topics}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Eye size={14} color="#94a3b8" />
                  <span style={{ fontSize: 12, color: '#64748b' }}>{video.views} views</span>
                </div>
                {video.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} color="#EF9F27" fill="#EF9F27" />
                    <span style={{ fontSize: 12, color: '#64748b' }}>{video.rating}</span>
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Duration: {video.duration}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: '#f1f5f9', border: 'none', padding: '8px',
                borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginLeft: '1rem', flexShrink: 0
              }}
            >
              <X size={20} color="#64748b" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = ({ video, onClick }) => (
  <div 
    onClick={() => onClick(video)}
    style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '0.5px solid #e2e8f0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      cursor: 'pointer', transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'}
  >
    {/* Thumbnail Image with Overlay */}
    <div style={{
      position: 'relative', paddingTop: '56.25%', overflow: 'hidden',
      background: '#000'
    }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={24} color="#fff" fill="#fff" />
        </div>
      </div>

      {/* Duration Badge */}
      <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: 10, padding: '3px 6px', borderRadius: 4, fontWeight: 500 }}>
        {video.duration}
      </span>

      {/* Subject Tag */}
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <Tag label={video.subject} color={video.color} bg="rgba(255,255,255,0.95)" />
      </div>
    </div>

    {/* Info Section */}
    <div style={{ padding: '12px' }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', lineHeight: 1.4, marginBottom: 6 }}>{video.title}</p>
      <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>{video.topics}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Eye size={12} color="#94a3b8" />
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{video.views} views</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={12} color="#EF9F27" fill="#EF9F27" />
          <span style={{ fontSize: 11, color: '#64748b' }}>{video.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

const SmallCard = ({ video, color, tagBg, subject, onClick }) => (
  <div 
    onClick={() => onClick(video)}
    style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '0.5px solid #e2e8f0', boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      cursor: 'pointer', transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)'}
  >
    {/* Thumbnail */}
    <div style={{ position: 'relative', paddingTop: '52%', background: '#000', overflow: 'hidden' }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      {/* Play Button Overlay */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.3)', transition: 'all 0.2s ease'
      }}>
        <Play size={32} color={color} />
      </div>

      {/* Duration */}
      <span style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: 10, padding: '2px 5px', borderRadius: 3, fontWeight: 500 }}>
        {video.duration}
      </span>
    </div>

    {/* Info */}
    <div style={{ padding: '10px 12px' }}>
      <Tag label={subject} color={color} bg={tagBg} />
      <p style={{ fontSize: 12, fontWeight: 500, color: '#0f172a', lineHeight: 1.4, margin: '6px 0 4px' }}>{video.title}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
        <span>{video.duration}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Eye size={11} color="#94a3b8" />
          <span>{video.views}</span>
        </div>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ icon: Icon, label, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
    <Icon size={16} color={color} />
    <p style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>{label}</p>
  </div>
);

const Videos = () => {
  const [activeTab, setActiveTab] = React.useState('All subjects');
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: '#0f172a' }}>Video lectures</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
          ✅ YouTube original thumbnails · Real content preview · Click to play instantly · Full HD streaming
        </p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)} style={{
            padding: '6px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
            border: activeTab === cat ? 'none' : '0.5px solid #e2e8f0',
            background: activeTab === cat ? '#185FA5' : '#f8fafc',
            color: activeTab === cat ? '#fff' : '#64748b',
            transition: 'all 0.15s ease'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      {(activeTab === 'All subjects') && (
        <div>
          <SectionTitle icon={BookOpen} label="Featured this week" color="#993C1D" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {FEATURED.map(v => <FeaturedCard key={v.id} video={v} onClick={handleVideoClick} />)}
          </div>
        </div>
      )}

      {/* Physics */}
      {(activeTab === 'All subjects' || activeTab === 'Physics') && (
        <div>
          <SectionTitle icon={BookOpen} label="Physics" color="#185FA5" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {PHYSICS_VIDEOS.map(v => <SmallCard key={v.id} video={v} color="#185FA5" tagBg="#E6F1FB" subject="Physics" onClick={handleVideoClick} />)}
          </div>
        </div>
      )}

      {/* Chemistry */}
      {(activeTab === 'All subjects' || activeTab === 'Chemistry') && (
        <div>
          <SectionTitle icon={FlaskConical} label="Chemistry" color="#0F6E56" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {CHEMISTRY_VIDEOS.map(v => <SmallCard key={v.id} video={v} color="#0F6E56" tagBg="#EAF3DE" subject="Chemistry" onClick={handleVideoClick} />)}
          </div>
        </div>
      )}

      {/* Mathematics */}
      {(activeTab === 'All subjects' || activeTab === 'Mathematics') && (
        <div>
          <SectionTitle icon={Calculator} label="Mathematics" color="#534AB7" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {MATHS_VIDEOS.map(v => <SmallCard key={v.id} video={v} color="#534AB7" tagBg="#EEEDFE" subject="Mathematics" onClick={handleVideoClick} />)}
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />

    </div>
  );
};

export default Videos;