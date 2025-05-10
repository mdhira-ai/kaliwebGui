import React, { memo } from 'react'

interface ForsocketProps {
    message: string[];
    time: string,
    send: () => void,
    value: string,
    setvalue: (value: string) => void,
    status: boolean

}

function Forsocket({ message, time, send, setvalue, value, status }: ForsocketProps) {
    return (
        <div className="flex  flex-col items-center gap-7 justify-center h-screen">

            <div
                className='items-center flex flex-col'
            >
            <h4>
                Server status :{status ? "connected" : "disconnected"} <br/>
            </h4>
                

            <h4>
                server currenttime: {time} 

            </h4>

            </div>
            <div className="flex  gap-2">

                <Myinput
                    setvalue={setvalue}
                    value={value}

                />

                <button
                    onClick={send}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>

            <div
                className='flex  flex-col justify-center '
            >
                <label>
                    output
                </label>


                <textarea
                    value={message.join('\n')}
                    readOnly
                    className="w-80 h-32 mt-4 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2"
                    placeholder="Messages will appear here..."
                />
            </div>
        </div>


    )
}


const Myinput = memo(({ value, setvalue }: { value: string, setvalue: (value: string) => void }) => {
    return (
        <>
            <input
                value={value}
                onChange={(e) => setvalue(e.currentTarget.value)}
                type="text"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Enter your message"
            />
        </>
    )
}, (prev, nextp) => {
    return prev.value == nextp.value
})


export default Forsocket