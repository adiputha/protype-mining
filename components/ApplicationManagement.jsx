"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  XMarkIcon,
  PrinterIcon,
  TrashIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

export default function ApplicationManagement({ onNewApplication }) {
  const [selectedRow, setSelectedRow] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("Category")

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Application Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Here's a list of Registered Applications</p>
      </div>

      {/* Filters and Search */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="w-full md:w-80 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Category">Category</SelectItem>
                    <SelectItem value="Mining">Mining</SelectItem>
                    <SelectItem value="Quarrying">Quarrying</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-gray-900 dark:bg-gray-700" onClick={onNewApplication}>
              New Application
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-9 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">#</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Application No</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Manual No</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Region</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Created Date</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Modified Date</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Action</div>
          </div>

          {/* Table Body */}
          {applications.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((app, index) => (
            <div
              key={app.id}
              className="grid grid-cols-9 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="text-sm text-gray-900 dark:text-white">{(currentPage - 1) * rowsPerPage + index + 1}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.applicationNo}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.manualNo}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.region}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.category}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.createdDate}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.modifiedDate}</div>
              <div className="text-sm text-gray-900 dark:text-white">{app.status}</div>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <HandThumbUpIcon className="h-4 w-4" />
                      Approve Application
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <HandThumbDownIcon className="h-4 w-4" />
                      Reject Application
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <XMarkIcon className="h-4 w-4" />
                      Cancel Application
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <PrinterIcon className="h-4 w-4" />
                      Print
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4" />
                      Checklist
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4" />
                      View Checklist E-mail
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4" />
                      View Documents
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pagination */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number.parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <ChevronDoubleLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronDoubleRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}