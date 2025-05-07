const SkeletonCard = () => {
    return (
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '1rem',
          backgroundColor: '#2a2a2a',
          height: '200px',
          animation: 'pulse 1.5s infinite',
        }}
      >
        <div style={{ width: '70%', height: '20px', backgroundColor: '#444', marginBottom: '10px' }} />
        <div style={{ width: '100%', height: '100px', backgroundColor: '#444', marginBottom: '10px' }} />
        <div style={{ width: '50%', height: '20px', backgroundColor: '#444' }} />
      </div>
    );
  };
  
  export default SkeletonCard;
  