import { forwardRef, useImperativeHandle, useRef } from 'react';

const ProgressBar = forwardRef(function ProgressBar({ durationMs }, ref) {
  const barRef = useRef(null);

  useImperativeHandle(ref, () => ({
    start(totalMs) {
      const el = barRef.current;
      if (!el) return;
      el.style.transition = 'none';
      el.style.width = '0%';
      void el.offsetWidth;
      el.style.transition = `width ${totalMs}ms linear`;
      el.style.width = '100%';
    },
    pause(elapsedMs, totalMs) {
      const el = barRef.current;
      if (!el) return;
      const pct = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
      el.style.transition = 'none';
      el.style.width = pct + '%';
    },
    resume(remainingMs) {
      const el = barRef.current;
      if (!el) return;
      void el.offsetWidth;
      el.style.transition = `width ${remainingMs}ms linear`;
      el.style.width = '100%';
    },
  }));

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 8, height: 4, background: 'rgba(255,255,255,0.35)', borderRadius: 4 }}>
      <div ref={barRef} style={{ height: '100%', width: 0, background: '#fff', borderRadius: 4 }} />
    </div>
  );
});

export default ProgressBar;


