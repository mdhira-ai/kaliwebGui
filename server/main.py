from fastapi import FastAPI, WebSocket
from socket_pro import socketio
import uvicorn
import asyncio
from mytasks import MTask





app = FastAPI()
socketconn = socketio()

nmap = MTask(socket=socketconn,messageport="nmap_log")

@app.websocket("/ws/{client_id}")
async def home(websocket: WebSocket, client_id: int):
    await socketconn.connect(websocket=websocket)

    try:
        while True:
            data = await websocket.receive_json()

            match(data['data_type']):
                case "nmap-start":
                    cmd = f"sudo nmap {data['message']}"
                    await nmap.taskrun(cmd=cmd)

                case "nmap-stop":
                    print(data['data_type'])
                    await nmap.stop()
    
    except:
        print(f"client disconnected")
        socketconn.disconnect(websocket=websocket)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
