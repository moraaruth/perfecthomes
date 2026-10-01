'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaInstagram, FaPlay } from 'react-icons/fa';

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl overflow-hidden bg-gray-200 aspect-square" />
);

const InstagramFeed = () => {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch('/api/instagram/posts')
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setError('Could not load Instagram posts.'))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !error && posts.length === 0) return null;

  return (
    <section className="px-4 py-10 bg-white">
      <div className="container-xl lg:container m-auto">
        {/* Section header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaInstagram size={28} className="text-pink-500" />
          <h2 className="text-3xl font-bold" style={{ color: '#800080' }}>
            Latest From Instagram
          </h2>
        </div>

        {/* Error state */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <a
                  key={post.instagramPostId}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 block"
                >
                  {/* Thumbnail / Image */}
                  <Image
                    src={post.thumbnailUrl || post.mediaUrl}
                    alt={post.caption?.slice(0, 80) || 'Instagram post'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />

                  {/* Video overlay */}
                  {(post.mediaType === 'VIDEO' || post.mediaType === 'REEL') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <FaPlay size={32} className="text-white drop-shadow-lg" />
                    </div>
                  )}

                  {/* Hover caption overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    {post.caption && (
                      <p className="text-white text-xs line-clamp-3 mb-2">
                        {post.caption}
                      </p>
                    )}
                    <span className="text-pink-300 text-xs font-semibold flex items-center gap-1">
                      <FaInstagram size={12} /> View on Instagram
                    </span>
                  </div>
                </a>
              ))}
        </div>

        {/* Follow CTA */}
        {!loading && posts.length > 0 && (
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/kenya_perfect_homes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#800080' }}
            >
              <FaInstagram size={18} />
              Follow @kenya_perfect_homes
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
