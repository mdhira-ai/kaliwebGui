import { useState, useEffect, useRef } from 'react';
import { WebSocketClient } from '@/lib/Mysocket';

interface WebSocketMessageHandler {
  (res: any): void;
}

export function useWebSocket() {
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
  const socket = useRef<WebSocketClient | null>(null);
  
  useEffect(() => {
    socket.current = new WebSocketClient("ws://localhost:8000/ws/122");
    socket.current.connect();
    
    socket.current.onConnectionStatus((status) => {
      setConnectionStatus(status);
    });
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  
  const registerMessageHandler = (handler: WebSocketMessageHandler) => {
    if (socket.current) {
      socket.current.getmessage(handler);
    }
  };
  
  return {
    connectionStatus,
    socket: socket.current,
    registerMessageHandler
  };
}