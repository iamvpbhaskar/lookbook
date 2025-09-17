import React, { useEffect, useState } from 'react';
import { useLookbook } from '../../context/LookbookContext';
import MediaViewer from '../Media/MediaViewer';
import AnnotationDot from '../Annotation/AnnotationDot';
import ProductCard from '../Product/ProductCard';

function Look({ look }) {
  const { openProductIds, openProduct, closeProduct } = useLookbook();
  const [localIndex, setLocalIndex] = useState(0);
  const mediaCount = look.media?.length || 0;
  useEffect(() => {
    if (localIndex > Math.max(0, mediaCount - 1)) {
      setLocalIndex(0);
    }
  }, [mediaCount]);

  const nextMedia = () => setLocalIndex((i) => Math.min(i + 1, Math.max(0, mediaCount - 1)));
  const prevMedia = () => setLocalIndex((i) => Math.max(i - 1, 0));
  const media = look.media?.[localIndex];
  const openProducts = (openProductIds || []).map((id) => look.products?.find((p) => p.id === id)).filter(Boolean);
  const startXRef = React.useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* indicators */}
      <div className="media-indicators">
        {look.media?.map((_, idx) => (
          <div key={idx} className={`dot ${idx === localIndex ? 'active' : ''}`} />
        ))}
      </div>
      {/* Tap zones for mobile: left/right thirds */}
      <div
        style={{ position: 'relative', width: '100%', maxWidth: 420 }}
        onTouchStart={(e) => { startXRef.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (startXRef.current == null) return;
          const diff = e.changedTouches[0].clientX - startXRef.current;
          startXRef.current = null;
          const threshold = 50;
          if (diff < -threshold) nextMedia();
          else if (diff > threshold) prevMedia();
        }}
      >
        <div onClick={prevMedia} className="tap-zone left" />
        <div onClick={nextMedia} className="tap-zone right" />
      </div>
      <div style={{ height: 8 }} />
      {media ? (
        <div className="media-frame">
          <MediaViewer media={media} onEnded={nextMedia} />
          <div className="bottom-gradient" />
          {(media.annotations || []).map((a) => (
            <AnnotationDot
              key={a.id}
              xPct={a.xPct}
              yPct={a.yPct}
              onClick={() => openProduct(a.productId)}
              onHover={() => openProduct(a.productId)}
              onLeave={() => {}}
            />
          ))}
        </div>
      ) : (
        <p>No media</p>
      )}
      {openProducts.map((p) => (
        <ProductCard key={p.id} product={p} onClose={() => closeProduct(p.id)} />
      ))}
    </div>
  );
}

export default Look;


