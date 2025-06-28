import { useState } from "react"
export const InputProblems = () => {
    const [problemName, setProblemName] = useState('')
    const [messageFromServer, setMessageFromServer] = useState('')
    const addProblem = (problemName) => {
        fetch('https://leet-code-tracker-backend-weld.vercel.app/addProblemStatement', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                problemName: problemName
            })
        })
        .then(res => res.json())
        .then(data => setMessageFromServer(data.message))
        
    }
    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col gap-y-2">
                    <div>
                        Enter the Problems Solved Today
                    </div>
                    <div className="flex flex-row gap-x-2">
                        <input type="text" placeholder="Enter the Problem Name" className="p-2 shadow-lg outline-none" onChange={(e) => setProblemName(e.target.value)}/>
                        <button className="p-2 rounded-md bg-amber-300 cursor-pointer" onClick={() => addProblem(problemName)}>Add</button>
                    </div>
                    <div className="mb-3">
                        {messageFromServer}
                    </div>
                </div>

            </div>
        </>
    )
}