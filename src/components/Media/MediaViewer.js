import { useEffect, useRef, useState } from 'react';
import ProgressBar from './ProgressBar';

const IMAGE_MS = 5000;

function MediaViewer({ media, onEnded, onAnnotationClick }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [pressing, setPressing] = useState(false);
  const [imageStart, setImageStart] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!media) return;
    let timerId;
    if (media.type === 'image') {
      setImageStart(Date.now());
      setElapsed(0);
      barRef.current?.start(IMAGE_MS);
      timerId = setTimeout(() => {
        onEnded && onEnded();
      }, IMAGE_MS);
    } else if (media.type === 'video') {
      const el = videoRef.current;
      if (!el) return;
      const handleEnded = () => onEnded && onEnded();
      el.addEventListener('ended', handleEnded);
      el.muted = true;
      el.play().catch(() => {});
      return () => {
        el.removeEventListener('ended', handleEnded);
      };
    }
    return () => timerId && clearTimeout(timerId);
  }, [media, onEnded]);

  const pause = () => {
    if (media?.type === 'image') {
      const e = Date.now() - imageStart;
      setElapsed(e);
      barRef.current?.pause(e, IMAGE_MS);
    } else if (media?.type === 'video') {
      const el = videoRef.current;
      el && el.pause();
    }
  };

  const resume = () => {
    if (media?.type === 'image') {
      const remaining = Math.max(0, IMAGE_MS - elapsed);
      barRef.current?.resume(remaining);
      setTimeout(() => onEnded && onEnded(), remaining);
    } else if (media?.type === 'video') {
      const el = videoRef.current;
      el && el.play().catch(() => {});
    }
  };

  if (!media) return null;

  return (
    <div
      style={{ position: 'relative', width: '100%', maxWidth: 420 }}
      onMouseDown={() => { setPressing(true); pause(); }}
      onMouseUp={() => { setPressing(false); resume(); }}
      onMouseLeave={() => { if (pressing) { setPressing(false); resume(); } }}
      onTouchStart={() => { setPressing(true); pause(); }}
      onTouchEnd={() => { setPressing(false); resume(); }}
    >
      {media.type === 'image' ? (
        <>
          <img src={media.src} alt={media.alt || ''} style={{ width: '100%', borderRadius: 8 }} />
          <ProgressBar ref={barRef} durationMs={IMAGE_MS} />
        </>
      ) : (
        <video
          key={media.id}
          ref={videoRef}
          poster={media.poster}
          style={{ width: '100%', borderRadius: 8 }}
          playsInline
          muted
          controls={false}
          preload="metadata"
          onLoadedData={() => {
            const el = videoRef.current;
            el && el.play().catch(() => {});
          }}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default MediaViewer;


