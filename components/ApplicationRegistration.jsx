"use client"
import { useState } from "react"
import { ArrowLeftIcon, Calendar, Search, Plus, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export default function ApplicationRegistration({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationNo] = useState(`AP${Date.now()}`)
  
  const [formData, setFormData] = useState({
    manualNumber: "",
    titleCode: "",
    category: "",
    region: "",
    applicationDate: new Date().toISOString().split('T')[0],
    referenceNumber: "",
    clientCode: "",
    clientName: "",
    mineralCategory: "",
    mineralName: "",
    rate: ""
  })

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      receiptNumber: "",
      receiptDate: "",
      receiptAmount: "",
      clientName: ""
    }
  ])

  const steps = [
    { number: 1, label: "Basic Details" },
    { number: 2, label: "Plan and Deed Detail" },
    { number: 3, label: "Area Details" },
    { number: 4, label: "Approval Details" }
  ]

  const handleInputChange = (field, value) => {
    // Capitalize manual number
    if (field === 'manualNumber') {
      value = value.toUpperCase()
    }
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleReceiptChange = (id, field, value) => {
    setReceipts(prev => prev.map(receipt => 
      receipt.id === id ? { ...receipt, [field]: value } : receipt
    ))
  }

  const addReceipt = () => {
    const newId = receipts.length > 0 ? Math.max(...receipts.map(r => r.id)) + 1 : 1
    setReceipts([...receipts, {
      id: newId,
      receiptNumber: "",
      receiptDate: "",
      receiptAmount: "",
      clientName: ""
    }])
  }

  const removeReceipt = (id) => {
    if (receipts.length > 1) {
      setReceipts(receipts.filter(receipt => receipt.id !== id))
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClear = () => {
    setFormData({
      manualNumber: "",
      titleCode: "",
      category: "",
      region: "",
      applicationDate: new Date().toISOString().split('T')[0],
      referenceNumber: "",
      clientCode: "",
      clientName: "",
      mineralCategory: "",
      mineralName: "",
      rate: ""
    })
    setReceipts([{
      id: 1,
      receiptNumber: "",
      receiptDate: "",
      receiptAmount: "",
      clientName: ""
    }])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Application Management
      </Button>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Application Registration</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">New Application registration</p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700"/>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">AP</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Application No:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{applicationNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manual No: </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{formData.manualNumber || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Submit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Created Date:</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep === step.number 
                    ? 'bg-gray-800 text-white' 
                    : currentStep > step.number
                    ? 'bg-gray-400 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <span className={`mt-2 text-sm ${
                  currentStep === step.number ? 'text-gray-800 font-medium' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-4 ${
                  currentStep > step.number ? 'bg-gray-400' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Application Categorization */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Application Categorization</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title Code</label>
                  <select 
                    value={formData.titleCode}
                    onChange={(e) => handleInputChange('titleCode', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Select a Title Code</option>
                    <option value="TC001">TC001</option>
                    <option value="TC002">TC002</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Select a Category</option>
                    <option value="Mining">Mining</option>
                    <option value="Quarrying">Quarrying</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Region</label>
                  <select 
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Region</option>
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Application Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Application Details</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Manual Number</label>
                  <input
                    type="text"
                    value={formData.manualNumber}
                    onChange={(e) => handleInputChange('manualNumber', e.target.value)}
                    placeholder="Manual Number"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Application Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="Application Date - Auto Filled"
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg pr-10 text-gray-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Reference Number</label>
                  <input
                    type="text"
                    value={formData.referenceNumber}
                    onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                    placeholder="Reference Number"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client Code</label>
                  <select 
                    value={formData.clientCode}
                    onChange={(e) => handleInputChange('clientCode', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Client Code</option>
                    <option value="CL001">CL001</option>
                    <option value="CL002">CL002</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Receipt Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Receipt Details</h3>
              {receipts.map((receipt, index) => (
                <div key={receipt.id} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Receipt {index + 1}</h4>
                    {receipts.length > 1 && (
                      <button
                        onClick={() => removeReceipt(receipt.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Receipt Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={receipt.receiptNumber}
                          onChange={(e) => handleReceiptChange(receipt.id, 'receiptNumber', e.target.value)}
                          placeholder="Search Receipt Number"
                          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Receipt Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value="Receipt Date - Auto Filled"
                          readOnly
                          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg pr-10 text-gray-500"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Receipt Amount</label>
                      <input
                        type="text"
                        value="Receipt Amount - Auto Filled"
                        readOnly
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <input
                      type="text"
                      value="Client Name - Auto Filled"
                      readOnly
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-500"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={addReceipt}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Add More
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Minerals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Minerals</h3>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mineral Category</label>
                  <select 
                    value={formData.mineralCategory}
                    onChange={(e) => handleInputChange('mineralCategory', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Mineral Category</option>
                    <option value="CAT1">Category 1</option>
                    <option value="CAT2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mineral Category</label>
                  <select 
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Mineral Category</option>
                    <option value="CAT1">Category 1</option>
                    <option value="CAT2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rate (%)</label>
                  <input
                    type="text"
                    value="Rate (%) - Auto Filled"
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mineral Name</label>
                <select 
                  value={formData.mineralName}
                  onChange={(e) => handleInputChange('mineralName', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Mineral Name</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Plan and Deed Details</h3>
            <p className="text-gray-500 mt-2">Content coming soon...</p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Area Details</h3>
            <p className="text-gray-500 mt-2">Content coming soon...</p>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Approval Details</h3>
            <p className="text-gray-500 mt-2">Content coming soon...</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleNext}
            disabled={currentStep === 4}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}