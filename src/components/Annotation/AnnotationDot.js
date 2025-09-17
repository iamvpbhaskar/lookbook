function AnnotationDot({ xPct, yPct, onClick, onHover, onLeave }) {
  const size = 18;
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        left: `calc(${xPct}% - ${size / 2}px)`,
        top: `calc(${yPct}% - ${size / 2}px)`,
        width: size,
        height: size,
      }}
      className="annotation-dot"
      aria-label="Product annotation"
    />
  );
}

export default AnnotationDot;


