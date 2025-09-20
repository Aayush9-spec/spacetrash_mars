const BackgroundStars = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated stars */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Mars planet in background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 animate-stellar"
           style={{
             background: 'radial-gradient(circle, hsl(var(--mars-sunset)), hsl(var(--mars-surface)))',
             transform: 'translate(30%, 30%)',
           }} />
      
      {/* Nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 animate-float"
           style={{
             background: 'radial-gradient(circle, hsl(var(--cosmic-blue)), transparent)',
             filter: 'blur(40px)',
           }} />
      
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 animate-float"
           style={{
             background: 'radial-gradient(circle, hsl(var(--stellar-purple)), transparent)',
             filter: 'blur(30px)',
             animationDelay: '-1s',
           }} />
    </div>
  );
};

export default BackgroundStars;