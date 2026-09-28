import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Employees=lazy(()=>import('../pages/Employees'))
const AddEmployee=lazy(()=>import('../pages/AddEmployee'))
const EditEmployee=lazy(()=>import('../pages/EditEmployee'))


const router = createBrowserRouter([
  { path: '/', element: <Employees /> },
  { path: '/add', element: <AddEmployee /> },
  { path: '/edit/:id', element: <EditEmployee /> },
])

function App() {
  return(
  <Suspense fallback={<h2>Loading........</h2>}>
   <RouterProvider router={router} />
   </Suspense>
  )
}

export default App
