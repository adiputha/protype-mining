"use client";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, Calendar, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Input } from "./ui/input";
import SearchableSelect from "./ui/searchable-select";
import { masterDataService } from "@/lib/masterDataService";

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
    mineralSubCategory: "",
    mineralName: "",
    rate: "",
  });

  const [masterData, setMasterData] = useState({
    countries: [],
    provinces: [],
    districts: [],
    dsDivisions: [],
    cities: [],
    titles: [],
    taxTypes: [],
    attachmentTypes: [],
    statuses: [],
    postalCodes: [],
  });

  useEffect(() => {
    setMasterData({
      countries: masterDataService.getCountries(),
      provinces: masterDataService.getProvinces(),
      districts: masterDataService.getDistricts(),
      dsDivisions: masterDataService.getDSDivisions(),
      cities: masterDataService.getCities(),
      titles: masterDataService.getTitles(),
      taxTypes: masterDataService.getTaxTypes(),
      attachmentTypes: masterDataService.getAttachmentTypes(),
      statuses: masterDataService.getStatuses(),
      postalCodes: masterDataService.getPostalCodes(),
    });
  }, []);

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
      mineralSubCategory: "",
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
    <div className="space-y-6">
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="w-full py-4 mb-12 px-10">
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
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Application Categorization */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Categorization
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Title Code
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "TC001", label: "TC001" },
                      { value: "TC002", label: "TC002" },
                    ]}
                    value={formData.titleCode}
                    onValueChange={(value) =>
                      handleInputChange("titleCode", value)
                    }
                    displayValue={formData.titleCode}
                    placeholder="Select a Title Code"
                    searchPlaceholder="Search title codes..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Category
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "Mining", label: "Mining" },
                      { value: "Quarrying", label: "Quarrying" },
                    ]}
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    displayValue={formData.category}
                    placeholder="Select a Category"
                    searchPlaceholder="Search categories..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Region
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "Western", label: "Western" },
                      { value: "Central", label: "Central" },
                    ]}
                    value={formData.region}
                    onValueChange={(value) =>
                      handleInputChange("region", value)
                    }
                    displayValue={formData.region}
                    placeholder="Select a Region"
                    searchPlaceholder="Search regions..."
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Application Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Application Details
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Manual Number
                  </label>
                  <Input
                    type="text"
                    value={formData.manualNumber}
                    onChange={(e) =>
                      handleInputChange("manualNumber", e.target.value)
                    }
                    placeholder="Manual Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Application Date
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value="Application Date - Auto Filled"
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg pr-10 text-gray-500 dark:text-gray-400 text-sm"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Reference Number
                  </label>
                  <Input
                    type="text"
                    value={formData.referenceNumber}
                    onChange={(e) =>
                      handleInputChange("referenceNumber", e.target.value)
                    }
                    placeholder="Reference Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Client Code
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "CL001", label: "CL001" },
                      { value: "CL002", label: "CL002" },
                    ]}
                    value={formData.clientCode}
                    onChange={(value) => handleInputChange("clientCode", value)}
                    displayValue={formData.clientCode}
                    placeholder="Select a Client Code"
                    searchPlaceholder="Search client codes..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Client Name
                  </label>
                  <Input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

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
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Receipt Number
                      </label>
                      <div className="relative">
                        <Input
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
                          className="w-full px-3 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Receipt Date
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value="Receipt Date - Auto Filled"
                          readOnly
                          className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pr-10 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Receipt Amount
                      </label>
                      <Input
                        type="text"
                        value="Receipt Amount - Auto Filled"
                        readOnly
                        className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Client Name
                    </label>
                    <Input
                      type="text"
                      value="Client Name - Auto Filled"
                      readOnly
                      className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={addReceipt}
                  className="flex items-center gap-2 px-2 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 text-sm"
                >
                  Add More
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Minerals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Minerals
              </h3>
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Mineral Category
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "CAT1", label: "Category 1" },
                      { value: "CAT2", label: "Category 2" },
                    ]}
                    value={formData.mineralCategory}
                    onChange={(value) =>
                      handleInputChange("mineralCategory", value)
                    }
                    displayValue={formData.mineralCategory}
                    placeholder="Select a Mineral Category"
                    searchPlaceholder="Search mineral categories..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Mineral Sub Category
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "SCAT1", label: " Sub Category 1" },
                      { value: "SCAT2", label: "Sub Category 2" },
                    ]}
                    value={formData.mineralSubCategory}
                    onChange={(value) =>
                      handleInputChange("mineralSubCategory", value)
                    }
                    displayValue={formData.mineralSubCategory}
                    placeholder="Select a Mineral Sub-Category"
                    searchPlaceholder="Search mineral sub-categories..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Rate (%)
                  </label>
                  <Input
                    type="text"
                    value="Rate (%) - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Mineral Name
                </label>
                <SearchableSelect
                  value={formData.mineralName}
                  onChange={(value) => handleInputChange("mineralName", value)}
                  options={[
                    { value: "Gold", label: "Gold" },
                    { value: "Silver", label: "Silver" },
                  ]}
                  displayValue={formData.mineralName}
                  placeholder="Select a Mineral Name"
                  searchPlaceholder="Search mineral names..."
                />
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Deed Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Deed Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Plan Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Plan Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Lot Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Surveyor Registration Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Name Of the Notary Public
                  </label>
                  <Input
                    type="text"
                    value="Client Name - Auto Filled"
                    readOnly
                    className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Notary Registration Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Notary Registration Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Boundaries */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Boundaries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    North By
                  </label>
                  <Input
                    type="text"
                    placeholder="North By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    East By
                  </label>
                  <Input
                    type="text"
                    placeholder="East By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    South By
                  </label>
                  <Input
                    type="text"
                    placeholder="South By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    West By
                  </label>
                  <Input
                    type="text"
                    placeholder="West By"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Province
                  </label>
                  <SearchableSelect
                    options={masterData.provinces.map((province) => ({
                      value: province.name,
                      label: province.name,
                    }))}
                    onChange={(value) => handleInputChange("province", value)}
                    placeholder="Select a Province"
                    searchPlaceholder="Search provinces..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    District
                  </label>
                  <SearchableSelect
                    options={masterData.districts.map((district) => ({
                      value: district.name,
                      label: district.name,
                    }))}
                    onChange={(value) => handleInputChange("district", value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Divisional Secretariat
                  </label>
                 <SearchableSelect
                    options={masterData.dsDivisions.map((ds) => ({
                      value: ds.name,
                      label: ds.name,
                    }))}
                    onChange={(value) => handleInputChange("dsDivision", value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Grama Niladari Division
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm">
                  <option value="">Select a Grama Niladari Division</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Village
                </label>
                <input
                  type="text"
                  placeholder="Village"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Expected Inspection Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="Selected Inspection Date"
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg pr-10 text-gray-500 dark:text-gray-400 text-sm"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Land Owner
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm">
                  <option value="">Select a Land Owner</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Land Owner Name
                </label>
                <input
                  type="text"
                  value="Land Owner Name - Auto Filled"
                  readOnly
                  className="w-full px-3 py-2 bg-muted dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Name Of the Land
                </label>
                <input
                  type="text"
                  placeholder="Name Of the Land"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Approved Area
                </label>
                <input
                  type="text"
                  placeholder="Approved Area"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Extend of Land
                </label>
                <input
                  type="text"
                  placeholder="Extend of Land"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  River
                </label>
                <input
                  type="text"
                  placeholder="River"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Mining Depth
                </label>
                <input
                  type="text"
                  placeholder="Mining Depth"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Mining Hight
                </label>
                <input
                  type="text"
                  placeholder="Mining Hight"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Approve HE
                </label>
                <input
                  type="text"
                  placeholder="Approve HE"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  E
                </label>
                <input
                  type="text"
                  placeholder="North/South position"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  N
                </label>
                <input
                  type="text"
                  placeholder="East/West position"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  GPS Device Number
                </label>
                <input
                  type="text"
                  placeholder="GPS Device Number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                />
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* GPS of Boundaries */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                GPS of Boundaries
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      E
                    </label>
                    <input
                      type="text"
                      placeholder="North/South position"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      N
                    </label>
                    <input
                      type="text"
                      placeholder="East/West position"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Remark
                    </label>
                    <input
                      type="text"
                      placeholder="Remark"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 text-sm">
                    Add More
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            {/* DS Approval Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                DS Approval Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Divisional Secretariat Name
                  </label>
                  <input
                    type="text"
                    placeholder="Divisional Secretariat Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Remark
                  </label>
                  <input
                    type="text"
                    placeholder="Remark"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Access/ Temporary/ Stock Piling Land */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Access/ Temporary/ Stock Piling Land
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Ownership
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "owned", label: "Owned" },
                      { value: "leased", label: "Leased" },
                    ]}
                    placeholder="Ownership"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="Owner Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Plan Number
                  </label>
                  <input
                    type="text"
                    placeholder="Plan Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Lot Number
                  </label>
                  <input
                    type="text"
                    placeholder="Lot Number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white bg-white text-sm"
                  />
                </div>
              </div>
            </div>
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
          {currentStep < 4 ? (
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
