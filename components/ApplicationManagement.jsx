"use client"
import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, Eye, Edit, ThumbsUp, ThumbsDown, X, Printer, Trash2, CheckSquare, Mail, FileText } from "lucide-react"

export default function ApplicationManagement({ onNewApplication }) {
  const [selectedRow, setSelectedRow] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const applications = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    applicationNo: "Sample 02",
    manualNo: "Sample 03",
    region: "Sample 04",
    category: "Sample 05",
    createdDate: "Sample 12",
    modifiedDate: "Sample 12",
    status: "Sample 12"
  }))

  const totalPages = 10

  return (
    <div className="p-6">
      {/* Back to Dashboard */}
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg mb-6 hover:bg-gray-300">
        <ChevronLeft className="w-4 h-4" />
        <span>Dashboard</span>
      </button>

      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Application Management</h2>
        <p className="text-gray-500">Here's a list of Registered Applications</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-200 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 bg-gray-200 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Category</option>
        </select>
        <div className="flex-1"></div>
        <button
            onClick={onNewApplication} 
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          New Application
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    # <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Application No <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Manual No <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Region <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Category <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Created Date <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Modified Date <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    Status <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.applicationNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.manualNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.region}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.createdDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.modifiedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="relative">
                      <button 
                        onClick={() => setSelectedRow(selectedRow === app.id ? null : app.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {selectedRow === app.id && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            Approve Application
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <ThumbsDown className="w-4 h-4" />
                            Reject Application
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <X className="w-4 h-4" />
                            Cancel Application
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <CheckSquare className="w-4 h-4" />
                            Checklist
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            View Checklist E-mail
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            View Documents
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page</span>
            <select 
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Page 1 of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled={currentPage === 1}>
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled={currentPage === 1}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled={currentPage === totalPages}>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled={currentPage === totalPages}>
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}