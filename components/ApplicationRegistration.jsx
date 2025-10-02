"use client";
import { useState } from "react";
import { ArrowLeftIcon, Calendar, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Stepper, Step, Typography } from "@material-tailwind/react";

export default function ApplicationRegistration({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationNo] = useState(`AP${Date.now()}`);

  const [formData, setFormData] = useState({
    manualNumber: "",
    titleCode: "",
    category: "",
    region: "",
    applicationDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    clientCode: "",
    clientName: "",
    mineralCategory: "",
    mineralName: "",
    rate: "",
  });

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      receiptNumber: "",
      receiptDate: "",
      receiptAmount: "",
      clientName: "",
    },
  ]);

  const steps = [
    { number: 1, label: "Basic Details" },
    { number: 2, label: "Plan and Deed Details" },
    { number: 3, label: "Area Details" },
    { number: 4, label: "Approval Details" },
  ];

  const handleInputChange = (field, value) => {
    // Capitalize manual number
    if (field === "manualNumber") {
      value = value.toUpperCase();
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReceiptChange = (id, field, value) => {
    setReceipts((prev) =>
      prev.map((receipt) =>
        receipt.id === id ? { ...receipt, [field]: value } : receipt
      )
    );
  };

  const addReceipt = () => {
    const newId =
      receipts.length > 0 ? Math.max(...receipts.map((r) => r.id)) + 1 : 1;
    setReceipts([
      ...receipts,
      {
        id: newId,
        receiptNumber: "",
        receiptDate: "",
        receiptAmount: "",
        clientName: "",
      },
    ]);
  };

  const removeReceipt = (id) => {
    if (receipts.length > 1) {
      setReceipts(receipts.filter((receipt) => receipt.id !== id));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClear = () => {
    setFormData({
      manualNumber: "",
      titleCode: "",
      category: "",
      region: "",
      applicationDate: new Date().toISOString().split("T")[0],
      referenceNumber: "",
      clientCode: "",
      clientName: "",
      mineralCategory: "",
      mineralName: "",
      rate: "",
    });
    setReceipts([
      {
        id: 1,
        receiptNumber: "",
        receiptDate: "",
        receiptAmount: "",
        clientName: "",
      },
    ]);
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Application Registration
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              New Application registration
            </p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                AP
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Application No:
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {applicationNo}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Manual No:{" "}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.manualNumber || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status:
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Submit
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Created Date:
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="w-full py-8 mb-12 px-8">
          <Stepper
            activeStep={currentStep - 1}
            lineClassName="bg-gray-200 dark:bg-gray-700"
            activeLineClassName="bg-gray-800 dark:bg-gray-600"
          >
            {steps.map((step, index) => (
              <Step
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className={`${
                  currentStep === step.number
                    ? "!bg-gray-800 dark:!bg-gray-700 !text-white"
                    : currentStep > step.number
                    ? "!bg-gray-400 dark:!bg-gray-600 !text-white"
                    : "!bg-gray-200 dark:!bg-gray-700 !text-gray-500 dark:!text-gray-400"
                } cursor-pointer !h-16 !w-16 flex items-center justify-center`}
                activeClassName="!bg-gray-800 dark:!bg-gray-700"
                completedClassName="!bg-gray-400 dark:!bg-gray-600"
              >
                {step.number}
                <div className="absolute -bottom-10 w-max text-center left-1/2 transform -translate-x-1/2">
                  <Typography
                    variant="small"
                    className={`text-sm font-medium whitespace-nowrap ${
                      currentStep === step.number
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step.label}
                  </Typography>
                </div>
              </Step>
            ))}
          </Stepper>
        </div>
        {/* <div className="mt-8"> */}
        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Application Categorization */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Categorization
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title Code
                  </label>
                  <select
                    value={formData.titleCode}
                    onChange={(e) =>
                      handleInputChange("titleCode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  >
                    <option value="">Select a Title Code</option>
                    <option value="TC001">TC001</option>
                    <option value="TC002">TC002</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  >
                    <option value="">Select a Category</option>
                    <option value="Mining">Mining</option>
                    <option value="Quarrying">Quarrying</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Details
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manual Number
                  </label>
                  <input
                    type="text"
                    value={formData.manualNumber}
                    onChange={(e) =>
                      handleInputChange("manualNumber", e.target.value)
                    }
                    placeholder="Manual Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Application Date
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    value={formData.referenceNumber}
                    onChange={(e) =>
                      handleInputChange("referenceNumber", e.target.value)
                    }
                    placeholder="Reference Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Code
                  </label>
                  <select
                    value={formData.clientCode}
                    onChange={(e) =>
                      handleInputChange("clientCode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  >
                    <option value="">Client Code</option>
                    <option value="CL001">CL001</option>
                    <option value="CL002">CL002</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Receipt Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Receipt Details
              </h3>
              {receipts.map((receipt, index) => (
                <div
                  key={receipt.id}
                  className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Receipt {index + 1}
                    </h4>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Receipt Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={receipt.receiptNumber}
                          onChange={(e) =>
                            handleReceiptChange(
                              receipt.id,
                              "receiptNumber",
                              e.target.value
                            )
                          }
                          placeholder="Search Receipt Number"
                          className="w-full px-3 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Receipt Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value="Receipt Date - Auto Filled"
                          readOnly
                          className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pr-10 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Receipt Amount
                      </label>
                      <input
                        type="text"
                        value="Receipt Amount - Auto Filled"
                        readOnly
                        className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value="Client Name - Auto Filled"
                      readOnly
                      className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={addReceipt}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600"
                >
                  Add More
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Minerals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Minerals
              </h3>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mineral Category
                  </label>
                  <select
                    value={formData.mineralCategory}
                    onChange={(e) =>
                      handleInputChange("mineralCategory", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  >
                    <option value="">Mineral Category</option>
                    <option value="CAT1">Category 1</option>
                    <option value="CAT2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mineral Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                    <option value="">Mineral Category</option>
                    <option value="CAT1">Category 1</option>
                    <option value="CAT2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rate (%)
                  </label>
                  <input
                    type="text"
                    value="Rate (%) - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mineral Name
                </label>
                <select
                  value={formData.mineralName}
                  onChange={(e) =>
                    handleInputChange("mineralName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
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
          <div className="space-y-6">
            {/* Plan and Deed */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Plan and Deed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deed Number
                  </label>
                  <input
                    type="text"
                    placeholder="Deed Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Plan Number
                  </label>
                  <input
                    type="text"
                    placeholder="Plan Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lot Number
                  </label>
                  <input
                    type="text"
                    placeholder="Lot Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deed Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value="Deed Date"
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg pr-10 text-gray-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Plan Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value="Plan Date"
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg pr-10 text-gray-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Ownership */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ownership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ownership
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                    <option value="">Ownership</option>
                    <option value="owned">Owned</option>
                    <option value="leased">Leased</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Surveyor Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Surveyor Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name Of the Surveyor
                  </label>
                  <input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Surveyor Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="Lot Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name Of the Notary Public
                  </label>
                  <input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notary Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="Lot Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Boundaries */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Boundaries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    North By
                  </label>
                  <input
                    type="text"
                    placeholder="North By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    East By
                  </label>
                  <input
                    type="text"
                    placeholder="East By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    South By
                  </label>
                  <input
                    type="text"
                    placeholder="South By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    West By
                  </label>
                  <input
                    type="text"
                    placeholder="West By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Area Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Area Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Province
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                    <option value="">Select a Province</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                    <option value="">Select a District</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Divisional Secretariat
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                    <option value="">Select a Divisional Secretariat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grama Niladari Division
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                  <option value="">Select a Grama Niladari Division</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Village
                </label>
                <input
                  type="text"
                  placeholder="Village"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Inspection Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="Selected Inspection Date"
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg pr-10 text-gray-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Land Owner
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white">
                  <option value="">Select a Land Owner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Land Owner Name
                </label>
                <input
                  type="text"
                  value="Land Owner Name - Auto Filled"
                  readOnly
                  className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name Of the Land
                </label>
                <input
                  type="text"
                  placeholder="Name Of the Land"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Approved Area
                </label>
                <input
                  type="text"
                  placeholder="Approved Area"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Extend of Land
                </label>
                <input
                  type="text"
                  placeholder="Extend of Land"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  River
                </label>
                <input
                  type="text"
                  placeholder="River"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mining Depth
                </label>
                <input
                  type="text"
                  placeholder="Mining Depth"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mining Hight
                </label>
                <input
                  type="text"
                  placeholder="Mining Hight"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Approve HE
                </label>
                <input
                  type="text"
                  placeholder="Lot Number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E
                </label>
                <input
                  type="text"
                  placeholder="North/South position"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  N
                </label>
                <input
                  type="text"
                  placeholder="East/West position"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GPS Device Number
                </label>
                <input
                  type="text"
                  placeholder="GPS Device Number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* GPS of Boundaries */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                GPS of Boundaries
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      E
                    </label>
                    <input
                      type="text"
                      placeholder="North/South position"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      N
                    </label>
                    <input
                      type="text"
                      placeholder="East/West position"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Remark
                    </label>
                    <input
                      type="text"
                      placeholder="East By"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600">
                    Add More
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
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
      <div className="flex justify-between gap-4">
        {/* Left side - Previous button */}
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
            >
              Previous
            </Button>
          )}
        </div>

        {/* Right side buttons */}
        <div className="flex gap-4">
          {currentStep < 3 ? (
            // Steps 1-3: Next, Clear, Close
            <>
              <Button
                onClick={handleNext}
                className="bg-gray-900 dark:bg-gray-700"
              >
                Next
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                Clear
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                onClick={onBack}
              >
                Close
              </Button>
            </>
          ) : (
            // Step 4: Submit, Clear, Close
            <>
              <Button className="bg-gray-900 dark:bg-gray-700">Submit</Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                Clear
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                onClick={onBack}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
