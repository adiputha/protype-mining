"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const PostalCodeMaster = ({ darkMode }) => {
  const [postalCodes, setPostalCodes] = useState([
    { id: 1, code: "00100", area: "Colombo Fort", city: "Colombo", district: "Colombo", status: "Active" },
    { id: 2, code: "00200", area: "Slave Island", city: "Colombo", district: "Colombo", status: "Active" },
    { id: 3, code: "00300", area: "Colpetty", city: "Colombo", district: "Colombo", status: "Active" },
    { id: 4, code: "10350", area: "Dehiwala", city: "Dehiwala", district: "Colombo", status: "Active" },
    { id: 5, code: "10370", area: "Mount Lavinia", city: "Mount Lavinia", district: "Colombo", status: "Active" },
    { id: 6, code: "10400", area: "Moratuwa", city: "Moratuwa", district: "Colombo", status: "Active" },
    { id: 7, code: "11500", area: "Negombo", city: "Negombo", district: "Gampaha", status: "Active" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    code: "",
    area: "",
    city: "Colombo",
    district: "Colombo",
    status: "Active",
  })

  const filteredPostalCodes = postalCodes.filter(
    (postal) =>
      postal.code.includes(searchTerm) ||
      postal.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postal.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postal.district.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      setPostalCodes((prev) => prev.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      setPostalCodes((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
        },
      ])
    }
    setFormData({ code: "", area: "", city: "Colombo", district: "Colombo", status: "Active" })
    setShowForm(false)
    setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      code: item.code,
      area: item.area,
      city: item.city,
      district: item.district,
      status: item.status,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    setPostalCodes((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Postal Code Master</h1>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Postal Code
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search postal codes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Form */}
      {showForm && (
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>{editingItem ? "Edit" : "Add"} Postal Code</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                    placeholder="00100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Area Name</label>
                  <Input
                    value={formData.area}
                    onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                    placeholder="Colombo Fort"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Colombo">Colombo</option>
                    <option value="Dehiwala">Dehiwala</option>
                    <option value="Mount Lavinia">Mount Lavinia</option>
                    <option value="Moratuwa">Moratuwa</option>
                    <option value="Negombo">Negombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Galle">Galle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matale">Matale</option>
                    <option value="Galle">Galle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingItem ? "Update" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingItem(null)
                    setFormData({ code: "", area: "", city: "Colombo", district: "Colombo", status: "Active" })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* List */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Postal Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Area Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredPostalCodes.map((postal) => (
                  <tr key={postal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {postal.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {postal.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {postal.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {postal.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={postal.status === "Active" ? "default" : "secondary"}>{postal.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(postal)}>
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(postal.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PostalCodeMaster
