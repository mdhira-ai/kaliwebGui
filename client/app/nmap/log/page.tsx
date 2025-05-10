'use client'

import { WebSocketClient } from "@/lib/Mysocket";
import React, { useEffect, useRef, useState } from "react";

function page() {

  const myscoket = useRef<WebSocketClient | null>(null)

  const [task1, settask1] = useState<string[]>([])
  const [task2, settask2] = useState<string[]>([])


  useEffect(() => {
    myscoket.current = new WebSocketClient('ws://localhost:8000/ws/122')

    myscoket.current.connect()

    myscoket.current.getmessage((res) => {
      switch (res.data_type) {
        case "output_task1":
          settask1(prev => [...prev, res.data.message!])
          break;

        case "output_task2":
          settask2(prev => [...prev, res.data.message!])
          break;

        default:
          break;
      }
    })




    return () => {
      if (myscoket) {
        myscoket.current?.disconnect()
      }
    }
  }, [])



  function run_task1() {
    myscoket.current?.sendtoserver("run_task1", "")
  }

  function run_task1_stop(){
    myscoket.current?.sendtoserver("run_task1_stop","")
    
  }

  function run_task2() {
    myscoket.current?.sendtoserver("run_task2", "")


  }



  return (
    <div className="flex flex-col max-w-screen gap-2  items-center">
      <div className="flex flex-row  gap-2">
        <button onClick={run_task1} className="bg-blue-800 w-20 h-10 text-zinc-50 hover:bg-blue-500">
          run task 1
        </button>

        <button onClick={run_task1_stop} className="bg-red-800 w-20 h-10 text-zinc-50 hover:bg-red-500">
          stop task1
        </button>

        <button onClick={run_task2} className="bg-blue-800 w-20 h-10 text-zinc-50 hover:bg-blue-500">
          run task 2
        </button>

      </div>

      <div
        className="flex flex-col bg-amber-400 p-2 "
      >
        <h3>task1</h3>
        <textarea
          ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight;
          }}
          value={task1.join('\n')}
          readOnly
          className="max-w-sm h-40 p-4 mt-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        />
      </div>

      <div
        className="flex flex-col bg-amber-400 p-2 "
      >
        <h3>task2</h3>
        <textarea
          ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight;
          }}
          value={task2.join('\n')}

          readOnly
          className="max-w-sm h-40 p-4 mt-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export default page;
