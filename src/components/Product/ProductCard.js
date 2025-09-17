function ProductCard({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="product-card">
      <div className="card">
        <img src={product.image} alt={product.name} style={{ width: 56, height: 56, borderRadius: 28, objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{product.name}</div>
          <div style={{ color: '#666', fontSize: 12 }}>{product.priceText || 'See price on site'}</div>
        </div>
        <a href={product.pdpUrl} target="_blank" rel="noreferrer" style={{ background: '#ff4081', color: '#fff', padding: '8px 12px', borderRadius: 16, textDecoration: 'none', fontWeight: 600 }}>Shop</a>
        <button onClick={onClose} style={{ marginLeft: 8, background: 'transparent', border: 'none', fontSize: 18 }}>×</button>
      </div>
    </div>
  );
}

export default ProductCard;


