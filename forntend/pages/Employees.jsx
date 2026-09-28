import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Employees() {
    const [employees, setEmployees] = useState([]);

    // Get all employees
    useEffect(() => {
        api.get("display/")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log("GET ERROR:", error);
            });
    }, []);

    // DELETE employee
    const handleDelete = (id) => {
        api.delete(`delete/${id}/`)
            .then((response) => {
                console.log("DELETED:", response.data);

                // Remove employee from the table
                setEmployees(
                    employees.filter(
                        (employee) => employee.id !== id
                    )
                );
            })
            .catch((error) => {
                console.log("DELETE ERROR:", error);
                console.log(
                    "BACKEND RESPONSE:",
                    error.response?.data
                );
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Employee Management System
            </h1>

            <Link
                to="/add"
                className="mb-5 inline-block rounded bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
            >
                Add Employee
            </Link>

            <div className="overflow-x-auto rounded-lg bg-white shadow-md p-0">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Phone</th>
                            <th className="px-4 py-3 text-left">Department</th>
                            <th className="px-4 py-3 text-left">Salary</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="border-b hover:bg-gray-100"
                            >
                                <td className="px-4 py-3">
                                    {employee.id}
                                </td>

                                <td className="px-4 py-3">
                                    {employee.name}
                                </td>

                                <td className="px-4 py-3">
                                    {employee.email}
                                </td>

                                <td className="px-4 py-3">
                                    {employee.phone}
                                </td>

                                <td className="px-4 py-3">
                                    {employee.department}
                                </td>

                                <td className="px-4 py-3">
                                    ₹{employee.salary}
                                </td>

                                <td className="px-4 py-3">

                                    <button className="mr-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                                        <Link to={`/edit/${employee.id}`}>
                                            Edit
                                        </Link>
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }
                                        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Employees;