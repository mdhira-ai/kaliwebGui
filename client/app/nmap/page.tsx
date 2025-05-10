// app/page.tsx
"use client";

import { WebSocketClient } from '@/lib/Mysocket';
import { useEffect, useRef, useState } from 'react';
// import { console } from 'react-hot-console';

export default function page() {

  // websocket
  const Mysocket = useRef<WebSocketClient | null>(null)
  const [connectionstatus, setconnectionstatus] = useState<boolean>()




  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('quick');

  const [scandetails, setscandetails] = useState<Array<string>>([
    "-sS (TCP SYN scan)",
    "-sT (TCP connect scan)",
    "-sU (UDP scan)",
    "-sP (Ping scan)",
    "-sL (List scan)"
  ]);


  const [finalcmd, setfinalcmd] = useState('')

  const [options, setOptions] = useState('-sS (TCP SYN scan)');

  const [myscript, setmyscript] = useState("")

  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<Array<string>>([]);
  const [scanHistory, setScanHistory] = useState<Array<{
    id: string;
    target: string;
    type: string;
    timestamp: string;
  }>>([]);



  const [defaultspeed, setdefaultspeed] = useState<string>("Default");
  const [speed, setspeed] = useState<Array<string>>(["Default", "T1", "T2", "T3", "T4"])


  const scanTypes = [
    {
      value: 'Basic', label: 'Basic Scanning Commands', command: [
        "-sS (TCP SYN scan)",
        "-sT (TCP connect scan)",
        "-sU (UDP scan)",
        "-sP (Ping scan)",
        "-sL (List scan)"
      ]
    },
    {
      value: 'Advanced', label: 'Advanced Scanning Techniques', command: [
        "-sA (ACK scan)",
        "-sW (Window scan)",
        "-sM (TCP Maimon scan)",
        "-sN (TCP Null scan)",
        "-sF (TCP FIN scan)",
        "-p- (Scan all ports)",
        "--top-ports (Scan top ports: 20)"
      ]
    },
    {
      value: 'Script', label: 'Script Scanning', command: [
        "--script=default",
        "--script=vuln",
        "--script=discovery",
        "--script=safe"
      ]
    },
    {
      value: 'Firewall', label: 'Firewall/IDS Evasion', command: [
        "-f (Fragment packets)",
        "--mtu (Set custom MTU)",
        "-D (Decoy scan)",
        "-S (Spoof source address)",
        "--data-length (Append random data)",
        "-PA (Use TCP ACK packets for discovery)",
        "-PS (Use TCP SYN packets for discovery)",
        "--source-port (Randomize source port)"
      ]
    },
    {
      value: 'Service', label: 'Service and Vulnerability Detection', command: [
        "-sV (Service version detection)",
        "--version-intensity",
        "--version-light",
        "--version-all",
        "--script=vuln",
        "-O (OS detection)",
        "-p (Scan for specific services)"
      ]
    },
    {
      value: 'Network', label: 'Network Mapping', command: [
        "-sn (Ping scan)",
        "-PE (ICMP echo request)",
        "-PP (ICMP timestamp request)",
        "-PM (ICMP address mask request)",
        "-PO (Protocol ping)",
        "-sL (List targets without scanning)",
        "--iflist (Show interfaces and routes) "
      ]
    },
  ];




  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) {
      alert('Please enter a target');
      return;
    }

    let newCommand = '';
    if (defaultspeed == "Default") {
      newCommand = `${target.trim()} ${options.trim().split(' ')[0]} ${myscript}`;
      setfinalcmd(newCommand);

      sendtonmap(newCommand)

    }
    else {
      newCommand = `${target.trim()} ${defaultspeed} ${options.trim().split(' ')[0]} ${myscript}`;
      setfinalcmd(newCommand);

      sendtonmap(newCommand)
    }

    setScanResults([])
  };

  function sendtonmap(cmd: string) {

    Mysocket.current?.sendtoserver("nmap-start", cmd)


  }




  const loadHistoryItem = (target: string) => {
    setTarget(target);
  };

  const handleScantype = (type: string) => {
    const selectedType = scanTypes.find(scanType => scanType.value === type);
    if (selectedType) {
      setscandetails(selectedType.command || []);
      setOptions(selectedType.command[0])
    } else {
      setscandetails([]);

    }
    setScanType(type)
  };



  useEffect(() => {
    Mysocket.current = new WebSocketClient("ws://localhost:8000/ws/122")

    Mysocket.current.connect()

    Mysocket.current.onConnectionStatus((status) => {
      console.log(status)
    })

    Mysocket.current.getmessage((res) => {
      switch (res.data_type) {
        case "nmap_log":
          setScanResults(prev => [...prev, res.data.message!])

          break;

        default:
          break;
      }

    })



    return () => {
      if (Mysocket) {
        Mysocket.current?.disconnect()
      }

    }
  }, [])


  function nmapstop(){
    Mysocket.current?.sendtoserver("nmap-stop","")
  }


  return (
    <div className="min-h-screen  bg-gray-100">
      <header className="bg-indigo-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Nmap WebGUI</h1>
          <p className="mt-2">Web interface for Nmap network scanning tool</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scan Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">New Scan</h2>
              <form onSubmit={handleScan} className="space-y-4">
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                    Target (IP, Hostname, or Network)
                  </label>
                  <input
                    type="text"
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 192.168.1.1, example.com, 10.0.0.0/24"
                  />
                </div>

                <div
                  className='flex flex-row gap-4'
                >


                  <div>
                    <label htmlFor="scanType" className="block text-sm font-medium text-gray-700 mb-1">
                      Scan Type
                    </label>
                    <select
                      id="scanType"
                      value={scanType}
                      onChange={(e) => handleScantype(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {scanTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-1">
                      Speed
                    </label>

                    <select
                      id="speed"
                      value={defaultspeed}
                      onChange={(e) => setdefaultspeed(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {speed.map((s, index) => (
                        <option key={index} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div>
                    <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-1">
                      Command
                    </label>

                    <select
                      id="command"
                      value={options}
                      onChange={(e) => setOptions(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {Array.isArray(scandetails) ? (
                        scandetails.map((command: any, index: number) => (
                          <option key={index} value={command}>
                            {command}
                          </option>
                        ))
                      ) : (
                        <option value="">No commands available</option>
                      )}
                    </select>

                  </div>
                </div>

                <div>
                  <h4>
                    Run: {finalcmd}
                  </h4>
                </div>



                <div>
                  <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Options
                  </label>
                  <input
                    type="text"
                    id="options"
                    value={myscript}
                    onChange={(e) => setmyscript(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., -p 80,443, -Pn, --script vuln"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isScanning}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isScanning ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                  </button>
                </div>
              </form>

              <div className="mt-4"></div>
              <button
                onClick={nmapstop}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Stop Scan
              </button>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Scan Results</h2>
              </div>
              <div className="p-4">
                {scanResults ? (
                  <textarea
                    readOnly
                    ref={(textarea) => {
                      if (textarea) {
                        textarea.scrollTop = textarea.scrollHeight;
                      }
                    }}
                    value={scanResults.join('\n')}
                  className="bg-gray-50 p-3 rounded text-sm font-mono w-full h-50"/>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {isScanning ? (
                      <p>Scanning in progress...</p>
                    ) : (
                      <p>No scan results yet. Run a scan to see results here.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Scan History</h2>
              </div>
              <div className="p-4">
                {scanHistory.length > 0 ? (
                  <ul className="space-y-2">
                    {scanHistory.map((scan) => (
                      <li key={scan.id} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <button
                          onClick={() => loadHistoryItem(scan.target)}
                          className="text-left w-full hover:bg-gray-50 p-2 rounded"
                        >
                          <p className="font-medium text-indigo-600">{scan.target}</p>
                          <p className="text-sm text-gray-500">{scan.type}</p>
                          <p className="text-xs text-gray-400">{scan.timestamp}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-8 text-gray-500">No scan history yet</p>
                )}
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Quick Reference</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-sm">Common Targets:</h3>
                    <ul className="text-xs text-gray-600 space-y-1 mt-1">
                      <li>Single IP: <code className="bg-gray-100 px-1">192.168.1.1</code></li>
                      <li>Hostname: <code className="bg-gray-100 px-1">example.com</code></li>
                      <li>IP Range: <code className="bg-gray-100 px-1">192.168.1.1-100</code></li>
                      <li>Subnet: <code className="bg-gray-100 px-1">10.0.0.0/24</code></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Common Options:</h3>
                    <ul className="text-xs text-gray-600 space-y-1 mt-1">
                      <li><code className="bg-gray-100 px-1">-p 80,443</code> - Scan specific ports</li>
                      <li><code className="bg-gray-100 px-1">-Pn</code> - Skip host discovery</li>
                      <li><code className="bg-gray-100 px-1">-sV</code> - Service version detection</li>
                      <li><code className="bg-gray-100 px-1">-A</code> - Aggressive scan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}