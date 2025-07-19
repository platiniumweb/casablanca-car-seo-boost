import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      window.initMap = initializeMap;
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBr7vCdK7F7qPzNfFZHjgLEXvqKGEsACK4&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    const initializeMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Coordonnées de Casablanca (approximatives)
        const casablancaLocation = { lat: 33.5731, lng: -7.5898 };

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 11,
          center: casablancaLocation,
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "weight": "2.00"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#9c9c9c"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#f2f2f2"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                {
                  "saturation": -100
                },
                {
                  "lightness": 45
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#46bcec"
                },
                {
                  "visibility": "on"
                }
              ]
            }
          ]
        });

        // Ajouter un marqueur pour Platinium Ride Car
        new window.google.maps.Marker({
          position: casablancaLocation,
          map: mapInstanceRef.current,
          title: 'Platinium Ride Car - Location de voiture à Casablanca',
          icon: {
            url: '/lovable-uploads/be62d16e-4a6f-4f53-b55a-d0a1e39d173d.png',
            scaledSize: new window.google.maps.Size(50, 30),
          }
        });

        // Ajouter une info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 10px 0; color: #1e3a8a;">Platinium Ride Car</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">Location de voiture à Casablanca</p>
              <p style="margin: 0 0 8px 0; font-size: 12px;"><strong>📞 Tel:</strong> 0661 202 213</p>
              <p style="margin: 0 0 8px 0; font-size: 12px;"><strong>📧 Email:</strong> platinium.ride.car@gmail.com</p>
              <p style="margin: 0; font-size: 12px;"><strong>⏰ Service:</strong> 7j/7 - 24h/24</p>
            </div>
          `
        });

        // Ouvrir l'info window au clic sur le marqueur
        const marker = new window.google.maps.Marker({
          position: casablancaLocation,
          map: mapInstanceRef.current,
          title: 'Platinium Ride Car'
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      }
    };

    loadGoogleMaps();
  }, []);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GoogleMap;