from fastapi import FastAPI, WebSocket
from socket_pro import socketio
import uvicorn

app = FastAPI()
socketconn = socketio()


@app.websocket("/ws/{client_id}")
async def home(websocke: WebSocket, client_id: int):
    await socketconn.connect(websocket=websocke)
    print(f"connected {client_id}")
    try:
        while True:
            data = await websocke.receive_json()
            print(data)

    except:
        socketconn.disconnect(websocket=websocke)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
