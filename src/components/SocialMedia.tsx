
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialMedia = () => {
  const handleInstagramClick = () => {
    window.open("https://instagram.com/platiniumridecar", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://facebook.com/platiniumridecar", "_blank");
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3">
      <Button
        onClick={handleInstagramClick}
        size="icon"
        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
      >
        <Instagram className="w-5 h-5" />
      </Button>
      <Button
        onClick={handleFacebookClick}
        size="icon"
        className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
      >
        <Facebook className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialMedia;
