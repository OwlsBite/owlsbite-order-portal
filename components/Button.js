export default function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`bg-blue-600 text-white px-3 py-1 rounded ${className}`}>
      {children}
    </button>
  );
}