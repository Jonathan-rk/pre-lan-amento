import { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
    __crispInitialized?: boolean;
  }
}

interface CrispChatProps {
  websiteId: string;
}

export const CrispChat: React.FC<CrispChatProps> = ({ websiteId }) => {
  useEffect(() => {
    if (window.__crispInitialized) return;

    if (!window.$crisp) {
      window.$crisp = [];
    }
    window.CRISP_WEBSITE_ID = websiteId;

    const existingScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.__crispInitialized = true;
      };
    }
  }, [websiteId]);

  return null;
};

export const openCrispChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:show']);
    setTimeout(() => {
      if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open']);
      }
    }, 50);
  }
};

export default CrispChat;
