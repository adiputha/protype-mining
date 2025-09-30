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
} from "@heroicons/react/24/outline"

const ClientManagement = ({ darkMode, onNewClient }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientType, setClientType] = useState("Client Type")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Sample client data
  const clientData = [
    {
      id: 1,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 2,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 3,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 4,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 5,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 6,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 7,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 8,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 9,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
    {
      id: 10,
      clientCode: "Sample 02",
      clientType: "Sample 03",
      clientName: "Sample 04",
      country: "Sample 05",
      status: "Sample 12",
    },
  ]

  const totalPages = Math.ceil(clientData.length / rowsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Here's a list of Registered client</p>
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
                <Select value={clientType} onValueChange={setClientType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Client Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Client Type">Client Type</SelectItem>
                    <SelectItem value="Company">Company</SelectItem>
                    <SelectItem value="Individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-gray-900 dark:bg-gray-700" onClick={onNewClient}>
              New Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">#</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Client Code</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Client Type</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Client Name</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Country</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Action</div>
          </div>

          {/* Table Body */}
          {clientData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((client, index) => (
            <div
              key={client.id}
              className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="text-sm text-gray-900 dark:text-white">{(currentPage - 1) * rowsPerPage + index + 1}</div>
              <div className="text-sm text-gray-900 dark:text-white">{client.clientCode}</div>
              <div className="text-sm text-gray-900 dark:text-white">{client.clientType}</div>
              <div className="text-sm text-gray-900 dark:text-white">{client.clientName}</div>
              <div className="text-sm text-gray-900 dark:text-white">{client.country}</div>
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

export default ClientManagement
