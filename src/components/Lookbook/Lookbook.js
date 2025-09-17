import { useLookbook } from '../../context/LookbookContext';
import Look from './Look';

function Lookbook() {
  const { looks } = useLookbook();
  if (!looks || looks.length === 0) return null;

  return (
    <div className="snap-container">
      {looks.map((lk, idx) => (
        <section key={lk?.id || idx} className="snap-section">
          <Look look={lk} />
        </section>
      ))}
    </div>
  );
}

export default Lookbook;


