
import { useEffect, useRef } from 'react';

const OpenStreetMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Clear any existing content
      mapRef.current.innerHTML = '';
      
      // Create iframe for OpenStreetMap with updated coordinates
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=-7.684518098831177%2C33.556675783155775%2C-7.680870294570924%2C33.55925515457705&layer=mapnik';
      iframe.style.width = '100%';
      iframe.style.height = '400px';
      iframe.style.border = '1px solid hsl(var(--border))';
      iframe.style.borderRadius = '8px';
      iframe.title = 'Platinium Ride Car\'s - Localisation';
      
      mapRef.current.appendChild(iframe);
      
      // Add link to full map with updated coordinates
      const linkContainer = document.createElement('div');
      linkContainer.style.marginTop = '12px';
      linkContainer.style.textAlign = 'center';
      
      const link = document.createElement('a');
      link.href = 'https://www.openstreetmap.org/?#map=18/33.557965/-7.682694';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = '🗺️ Afficher une carte plus grande';
      link.className = 'text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium inline-flex items-center gap-1';
      
      linkContainer.appendChild(link);
      mapRef.current.appendChild(linkContainer);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
        <div className="p-4">
          <h4 className="text-lg font-semibold text-center mb-4 flex items-center justify-center gap-2">
            <span className="text-accent">📍</span>
            Notre localisation
          </h4>
          <div ref={mapRef} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap;
