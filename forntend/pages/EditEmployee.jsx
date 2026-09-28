import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditEmployee() {
    // These two lines are from React Router.
    // useParams()  → READ information from the URL
    // example: <Route path="/edit/:id" element={<EditEmployee />} />
    // useNavigate() → CHANGE the URL / move to another page
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Get employee data
    useEffect(() => {
        if (!id) return;

        api.get("display/")
            .then((response) => {

                const employee = response.data.find(
                    (employee) => employee.id === Number(id)
                );

                if (employee) {
                    setName(employee.name);
                    setEmail(employee.email);
                    setPhone(employee.phone);
                    setDepartment(employee.department);
                    setSalary(employee.salary);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to load employee");
            });
    }, [id]);

    // Update employee
    const handleSubmit = (event) => {
        event.preventDefault();

        const employee = {
            name: name,
            email: email,
            phone: phone,
            department: department,
            salary: salary
        };

        api.put(`update/${id}/`, employee)
            .then((response) => {
                console.log("UPDATED:", response.data);

                setMessage("Employee updated successfully!");
                setError("");
                // it help to nagatived  to employee list 
                navigate("/");
            })
            .catch((error) => {
                console.log(" PUT ERROR:", error);
                console.log(
                    "BACKEND RESPONSE:",
                    error.response?.data
                );

                setError("Failed to update employee");
                setMessage("");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">

            <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">

                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Edit Employee
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Enter the name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="email"
                        placeholder="Enter the email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="text"
                        placeholder="Enter the department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="number"
                        placeholder="Enter the salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Update Employee
                    </button>

                </form>

                {message && (
                    <p className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-700">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 rounded-md bg-red-100 p-3 text-center text-red-700">
                        {error}
                    </p>
                )}

            </div>
        </div>
    );
}

export default EditEmployee;