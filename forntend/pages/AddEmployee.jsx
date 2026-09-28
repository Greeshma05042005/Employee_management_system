import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
function AddEmployee() {
    const[name,setname]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setphone]=useState("")
    const[department,setdepartment]=useState("")
    const[salary,setsalary]=useState("")
    const [message, setMessage] = useState(""); const [error, setError] = useState("");
     const navigate = useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault()
        // This code creates a JavaScript object containing all the values entered in your form.
//         Left name = property/key name
// Right name = JavaScript variable containing the user's input

// it become {
//     name: "Rahul"
// }
         const employee={
            name:name,
            email:email,
            phone:phone,
            department:department,
            salary:salary
         }
        //  api.post(url,data want to send)
        // there create is the end point for the creations

        api.post("create/",employee).then((response)=>{console.log(response.data)
          setMessage("Employee created successufully!")
        setError("")
navigate("/");
        setname(""); 
        setEmail("");
        setphone(""); 
        setdepartment(""); 
        setsalary("");
        }
    )
    // You don't want the UI saying:
    // Employee created successfully!
// Failed to create employee


        .catch((error) => { 
        const validationErrors = error.response?.data;
        setError(validationErrors ? JSON.stringify(validationErrors) : "Failed to create employee"); 
        setMessage("");
        
    })
  }

  return (
     <div className="min-h-screen bg-gray-100 px-4 py-10">

            <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">

                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Add Employee
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Enter the name"
                        value={name}
                        onChange={(e)=>setname(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the phone"
                        value={phone}
                        onChange={(e)=>setphone(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the department"
                        value={department}
                        onChange={(e)=>setdepartment(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the salary"
                        value={salary}
                        onChange={(e)=>setsalary(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-md bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Add Employee
                    </button>

                </form>
                  {/* first message means that we have take in the in the useState 
      second message  is  Employee created successfully!*/}
                {message && (
                    <p className="mt-4 rounded-md bg-green-100 p-3 text-center font-medium text-green-700">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 rounded-md bg-red-100 p-3 text-center font-medium text-red-700">
                        {error}
                    </p>
                )}

            </div>
        </div>
    
     
  )
}

export default AddEmployee;
