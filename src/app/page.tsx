import Image from "next/image";

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '2rem'
    }}>
      <Image
        src="/cumo.svg"
        alt="Cumo Logo"
        width={200}
        height={80}
        priority
      />
      <h1 style={{ fontWeight: 400, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
        Coming soon
      </h1>
    </div>
  );
}

