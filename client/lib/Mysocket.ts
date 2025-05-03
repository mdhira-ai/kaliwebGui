interface SocketMessage {
  data_type: any;
  data: {
    client_id?: string;
    time?: string;
    message?: string;
  };
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private messagefromserver: ((data: SocketMessage) => void) | null = null;

  constructor(private url: string) {}

  connect() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("connected to the socket server");
      };
      this.ws.onclose = () => {
        console.log("disconnect from the server");
      };
      this.ws.onerror = (error) => {
        console.log("socket error", error);
      };
      this.ws.onmessage = (event) => {
        const data: SocketMessage = JSON.parse(event.data);
        if (this.messagefromserver) {
          this.messagefromserver(data);
        }
      };
    } catch (error) {
      console.error("failed to create server", error);
    }
  }

  getmessage(callback: (data: SocketMessage) => void) {
    this.messagefromserver = callback;
  }

  sendtoserver(data_type:string, data :string){
    if(this.ws?.readyState == WebSocket.OPEN){
      this.ws?.send(JSON.stringify({
        data_type:data_type,
        message:data
      }))

    }
  }

  disconnect() {
    this.ws?.close();
  }
}
