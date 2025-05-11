interface SocketMessage {
  data_type: any;
  data: {
    client_id?: string;
    time?: string;
    message?: string;
    status?: string
  };
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private messagefromserver: ((data: SocketMessage) => void) | null = null;
  private connstatusCallback: ((isconnected: boolean) => void) | null = null;

  constructor(private url: string) {}

  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("✅ Connected to the socket server");

        // status update function
        if (this.connstatusCallback) {
          this.connstatusCallback(true);
        }
      };


      this.ws.onclose = () => {
        console.log("❌ Disconnected from the server");

        // status update function
        if (this.connstatusCallback) {
          this.connstatusCallback(false);
        }
      };


      this.ws.onerror = (error) => {
        console.log("⚠️ WebSocket error:", error);

        // status update function
        if (this.connstatusCallback) {
          this.connstatusCallback(false);
        }
      };


      this.ws.onmessage = (event) => {
        const data: SocketMessage = JSON.parse(event.data);

        // message send to webUI
        if (this.messagefromserver) {
          this.messagefromserver(data);
        }
      };

      
    } catch (error) {
      console.error("❌ Failed to create WebSocket:", error);

      // status update function
      if (this.connstatusCallback) {
        this.connstatusCallback(false);
      }
    }
  }

  getmessage(callback: (data: SocketMessage) => void) {
    this.messagefromserver = callback;
  }

  sendtoserver(data_type: string, data: string) {
    if (this.ws?.readyState == WebSocket.OPEN) {
      this.ws?.send(
        JSON.stringify({
          data_type: data_type,
          message: data,
        })
      );
    }
  }

  onConnectionStatus(callback: (isconnected: boolean) => void) {
    this.connstatusCallback = callback;
  }

  disconnect() {
    this.ws?.close();
  }
}
