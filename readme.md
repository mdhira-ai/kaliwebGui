# KaliWebGUI Project

A web-based GUI application using Next.js for the client and Python for the server, communicating via WebSocket.

## Project Structure

```
├── client/          # Next.js frontend application
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   ├── lib/         # Shared utilities
│   └── public/      # Static assets
└── server/          # Python backend application
```

## Client (Frontend)

### Technologies Used
- Next.js 15.3.1
- React 19
- TypeScript
- TailwindCSS
- WebSocket for real-time communication

### Features
- Real-time WebSocket communication
- Dark/Light theme support
- Message handling system
- Custom WebSocket client implementation

### Running the Client

```bash
cd client
npm install
npm run dev
```

The client will run on `http://localhost:3000`

## Server (Backend)

### Technologies Used
- Python 3.12
- WebSocket server implementation

### Prerequisites
- Python 3.12 or higher

### Running the Server

```bash
cd server
python main.py
```

## WebSocket Communication

The application uses WebSocket for real-time communication between client and server. Message types include:

- `time`: Server time updates
- `chat`: Chat messages
- `system`: System notifications

### Message Format
```typescript
{
  data_type: string;
  data: {
    client_id?: string;
    time?: string;
    message?: string;
  }
}
```

## Development

### Client Development
- Uses TypeScript for type safety
- ESLint for code quality
- TailwindCSS for styling
- Next.js App Router for routing

### Server Development
- Python virtual environment recommended
- Follows Python 3.12+ standards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request