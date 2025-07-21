
import { useEffect, useRef } from 'react';

const OpenStreetMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Clear any existing content
      mapRef.current.innerHTML = '';
      
      // Create iframe for OpenStreetMap
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=-7.65230%2C33.55859%2C-7.64830%2C33.56059&layer=mapnik&marker=33.55959%2C-7.65030';
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      
      mapRef.current.appendChild(iframe);
      
      // Add link to full map
      const linkContainer = document.createElement('div');
      linkContainer.style.marginTop = '10px';
      linkContainer.style.textAlign = 'center';
      
      const link = document.createElement('a');
      link.href = 'https://www.openstreetmap.org/?mlat=33.55959&mlon=-7.65030#map=19/33.55959/-7.65030';
      link.target = '_blank';
      link.textContent = '➤ Voir sur OpenStreetMap';
      link.className = 'text-primary hover:text-primary/80 transition-colors';
      
      linkContainer.appendChild(link);
      mapRef.current.appendChild(linkContainer);
    }
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full" />
    </div>
  );
};

export default OpenStreetMap;
