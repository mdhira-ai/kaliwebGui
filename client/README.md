# WebSocket Client Implementation

A TypeScript WebSocket client implementation for real-time communication with a WebSocket server.

## Features

- Establish WebSocket connections
- Send and receive messages
- Handle connection events (open, close, error)
- Type-safe message handling with TypeScript interfaces

## Usage

```typescript
import { WebSocketClient } from './lib/Mysocket';

// Create a new WebSocket client instance
const ws = new WebSocketClient('ws://your-server-url');

// Connect to the server
ws.connect();

// Listen for messages
ws.getmessage((data) => {
  console.log('Received:', data);
});

// Send a message to the server
ws.sendtoserver('message_type', 'Hello Server!');

// Disconnect when done
ws.disconnect();
```

## API Reference

### `WebSocketClient`

#### Constructor

```typescript
constructor(url: string)
```

- `url`: WebSocket server URL to connect to

#### Methods

- `connect()`: Establishes connection to the WebSocket server
- `getmessage(callback: (data: SocketMessage) => void)`: Register a callback for incoming messages
- `sendtoserver(data_type: string, data: string)`: Send a message to the server
- `disconnect()`: Close the WebSocket connection

### Message Interface

```typescript
interface SocketMessage {
  data_type: any;
  data: {
    client_id?: string;
    time?: string;
    message?: string;
  };
}
```

## Error Handling

The client includes built-in error handling and logging for:
- Connection errors
- Message parsing errors
- Connection state changes