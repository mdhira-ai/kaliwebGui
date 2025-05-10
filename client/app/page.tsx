"use client"
import Forsocket from "@/components/Forsocket";
import { WebSocketClient } from "@/lib/Mysocket";
import React, { useEffect, useRef, useState } from "react";

function page() {

  const [messages, setmessages] = useState<string[]>([])
  const [currenttime, setcurrenttime] = useState<string>("")

  
  const wsclient = useRef<WebSocketClient | null>(null)
  const [connectionstatus, setconnectionstatus] = useState<boolean>()


  const [value, setvalue] = useState<string>("")

  useEffect(() => {
    wsclient.current = new WebSocketClient("ws://localhost:8000/ws/122")

    wsclient.current.connect()

    wsclient.current.onConnectionStatus((status) => {
      setconnectionstatus(status)
    })

    wsclient.current.getmessage((d) => {
      switch (d.data_type) {
        case "time":
          setcurrenttime(d.data.time!)
          break

        case "chat":
          console.log(d.data.message)
          setmessages(prev => [...prev,
          `client id : ${d.data.client_id} says => ${d.data.message}`])
          break

        case "system":
          if (d.data?.message) {
            setmessages(prev => [...prev,d.data.message!])
          }


      }

    })


    return () => {
      if (wsclient) {
        wsclient.current?.disconnect()
      }
    }
  }, [])

  function sendmsg() {
    wsclient.current?.sendtoserver("chat", value)
    setvalue("")

  }







  return (
    <div>



      <Forsocket
        status={connectionstatus!}
        send={sendmsg}
        
        time={currenttime}
        message={messages} //output

        value={value}
        setvalue={setvalue}
      />

    </div>
  );
}

export default page;
