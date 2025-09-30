"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import SearchableSelect from "@/components/ui/searchable-select"
import DialCodeSelector from "@/components/ui/dial-code-selector"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  DocumentArrowUpIcon,
  ArrowLeftIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { masterDataService } from "@/lib/masterDataService"

const ClientRegistration = ({ onBack }) => {
  const [companyDetailsOpen, setCompanyDetailsOpen] = useState(true)
  const [contactPersonOpen, setContactPersonOpen] = useState(true)
  const [taxDetailsOpen, setTaxDetailsOpen] = useState(true)
  const [attachmentsOpen, setAttachmentsOpen] = useState(true)
  const [statusOpen, setStatusOpen] = useState(true)

  const [showClientTypeDialog, setShowClientTypeDialog] = useState(false)
  const [pendingClientType, setPendingClientType] = useState("")

  const [masterData, setMasterData] = useState({
    clientTypes: [],
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
  })

  const [attachments, setAttachments] = useState([{ id: 1, attachmentType: "", file: null, fileName: "" }])

  const [formData, setFormData] = useState({
    clientType: "",
    clientCode: "",
    title: "",
    fullName: "",
    initial: "",
    lastName: "",
    nameWithInitials: "",
    nic: "",
    passportNumber: "",
    companyName: "",
    brNumber: "",
    countryOfIncorporation: "",
    province: "",
    district: "",
    dsDivision: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    country: "",
    city: "",
    postalCode: "",
    telDialCode: "+94",
    telNumber: "",
    mobileDialCode: "+94",
    mobileNumber: "",
    faxDialCode: "+94",
    faxNumber: "",
    email: "",
    contactPersonTitle: "",
    contactPersonName: "",
    contactPersonDesignation: "",
    contactPersonTelDialCode: "+94",
    contactPersonTelNumber: "",
    contactPersonMobileDialCode: "+94",
    contactPersonMobileNumber: "",
    contactPersonFaxDialCode: "+94",
    contactPersonFaxNumber: "",
    contactPersonEmail: "",
    contactPersonInitials: "",
    contactPersonLastName: "",
    contactPersonNameWithInitials: "",
    contactPersonNic: "",
    contactPersonPassportNumber: "",
    contactPersonFullName: "",
    contactAddressLine1: "",
    contactAddressLine2: "",
    contactAddressLine3: "",
    contactCountry: "",
    contactCity: "",
    contactPostalCode: "",
    attachments: [{ type: "", file: null }],
  })

  useEffect(() => {
    setMasterData({
      clientTypes: masterDataService.getClientTypes().filter((item) => item.status === "Active"),
      countries: masterDataService.getCountries().filter((item) => item.status === "Active"),
      provinces: masterDataService.getProvinces().filter((item) => item.status === "Active"),
      districts: masterDataService.getDistricts().filter((item) => item.status === "Active"),
      dsDivisions: masterDataService.getDSDivisions().filter((item) => item.status === "Active"),
      cities: masterDataService.getCities().filter((item) => item.status === "Active"),
      titles: masterDataService.getTitles().filter((item) => item.status === "Active"),
      taxTypes: masterDataService.getTaxTypes().filter((item) => item.status === "Active"),
      attachmentTypes: masterDataService.getAttachmentTypes().filter((item) => item.status === "Active"),
      statuses: masterDataService.getStatuses().filter((item) => item.status === "Active"),
      postalCodes: masterDataService.getPostalCodes().filter((item) => item.status === "Active"),
    })
  }, [])

  useEffect(() => {
    if (!formData.clientCode) {
      const currentYear = new Date().getFullYear()
      const clientCode = `${currentYear}/IML/00001`
      setFormData((prev) => ({ ...prev, clientCode }))
    }
  }, [])

  useEffect(() => {
    if (formData.clientType === "Individual") {
      const nameWithInitials = formData.initial && formData.lastName ? `${formData.initial} ${formData.lastName}` : ""
      setFormData((prev) => ({ ...prev, nameWithInitials }))
    } else {
      // Clear the field when not Individual type
      setFormData((prev) => ({ ...prev, nameWithInitials: "" }))
    }
  }, [formData.initial, formData.lastName, formData.clientType])

  useEffect(() => {
    const contactNameWithInitials =
      formData.contactPersonInitials && formData.contactPersonLastName
        ? `${formData.contactPersonInitials} ${formData.contactPersonLastName}`
        : ""
    setFormData((prev) => ({ ...prev, contactPersonNameWithInitials: contactNameWithInitials }))
  }, [formData.contactPersonInitials, formData.contactPersonLastName])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const formatFullName = (value) => {
    // Restrict numeric typing and capitalize first letter of each word
    const lettersOnly = value.replace(/[0-9]/g, "")
    return lettersOnly
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const formatInitials = (value) => {
    // Restrict numeric typing
    const lettersOnly = value.replace(/[0-9]/g, "").toUpperCase()
    // Remove all spaces first, then add single spaces between characters
    const noSpaces = lettersOnly.replace(/\s/g, "")
    // Add single space between each character, but not after the last one
    return noSpaces.split("").join(" ").trim()
  }

  const formatCapitalizeWords = (value) => {
    return value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const formatLettersOnly = (value) => {
    return value.replace(/[0-9]/g, "")
  }

  const formatNumbersOnly = (value) => {
    // Allow only numbers
    return value.replace(/[^0-9]/g, "")
  }

  const handleInputChange = (field, value) => {
    if (field === "fullName" || field === "contactPersonFullName") {
      const lettersOnly = formatLettersOnly(value)
      const formatted = formatCapitalizeWords(lettersOnly)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (field === "initial" || field === "contactPersonInitials") {
      const formatted = formatInitials(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (field === "lastName" || field === "contactPersonLastName") {
      const lettersOnly = formatLettersOnly(value)
      const formatted = formatCapitalizeWords(lettersOnly)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (field === "companyName") {
      const formatted = formatCapitalizeWords(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (
      field === "addressLine1" ||
      field === "addressLine2" ||
      field === "addressLine3" ||
      field === "contactAddressLine1" ||
      field === "contactAddressLine2" ||
      field === "contactAddressLine3"
    ) {
      const formatted = formatCapitalizeWords(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (
      field === "telNumber" ||
      field === "mobileNumber" ||
      field === "faxNumber" ||
      field === "contactTelNumber" ||
      field === "contactMobileNumber" ||
      field === "contactFaxNumber"
    ) {
      const formatted = formatNumbersOnly(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    if (field === "email" || field === "contactEmail") {
      setFormData((prev) => ({ ...prev, [field]: value }))
      return
    }

    if (field === "nic" || field === "contactPersonNic") {
      const formatted = formatNIC(value)
      setFormData((prev) => ({ ...prev, [field]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value || "" }))
  }

  const formatNIC = (value) => {
    // Remove all non-alphanumeric characters
    let cleaned = value.replace(/[^0-9VXvx]/g, "")

    // Convert v and x to uppercase
    cleaned = cleaned.replace(/[vx]/g, (match) => match.toUpperCase())

    if (cleaned.length <= 9) {
      // First 9 characters should be numbers only
      cleaned = cleaned.replace(/[^0-9]/g, "")
      return cleaned
    } else if (cleaned.length === 10) {
      // 10th character can be V or X
      const first9 = cleaned.slice(0, 9).replace(/[^0-9]/g, "")
      const tenth = cleaned.slice(9, 10)
      if (tenth === "V" || tenth === "X") {
        return first9 + tenth
      } else if (/[0-9]/.test(tenth)) {
        // If 10th is a number, allow up to 12 digits
        return first9 + tenth
      } else {
        return first9
      }
    } else if (cleaned.length <= 12) {
      // Check if this is a 12-digit format
      const first10 = cleaned.slice(0, 10)
      if (/^\d{10}$/.test(first10)) {
        // All 12 should be numbers
        return cleaned.replace(/[^0-9]/g, "").slice(0, 12)
      } else {
        // This is old format with V/X at position 10
        const first9 = cleaned.slice(0, 9).replace(/[^0-9]/g, "")
        const tenth = cleaned.slice(9, 10)
        if (tenth === "V" || tenth === "X") {
          return first9 + tenth
        }
        return first9
      }
    }

    return cleaned.slice(0, 12)
  }

  const handleClientTypeChange = (newClientType) => {
    if (formData.clientType && formData.clientType !== newClientType) {
      // Check if any form data has been filled
      const hasData = Object.entries(formData).some(
        ([key, value]) => key !== "clientType" && key !== "clientCode" && value && value.toString().trim() !== "",
      )

      if (hasData) {
        setPendingClientType(newClientType)
        setShowClientTypeDialog(true)
        return
      }
    }

    // If no data or same type, proceed with change
    setFormData((prev) => ({ ...prev, clientType: newClientType }))
  }

  const confirmClientTypeChange = () => {
    setFormData({
      clientType: pendingClientType,
      clientCode: formData.clientCode, // Keep the client code
      title: "",
      fullName: "",
      initial: "",
      lastName: "",
      nameWithInitials: "",
      nic: "",
      passportNumber: "",
      companyName: "",
      brNumber: "",
      countryOfIncorporation: "",
      province: "",
      district: "",
      dsDivision: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      country: "",
      city: "",
      postalCode: "",
      telDialCode: "+94",
      telNumber: "",
      mobileDialCode: "+94",
      mobileNumber: "",
      faxDialCode: "+94",
      faxNumber: "",
      email: "",
      contactPersonTitle: "",
      contactPersonName: "",
      contactPersonDesignation: "",
      contactPersonTelDialCode: "+94",
      contactPersonTelNumber: "",
      contactPersonMobileDialCode: "+94",
      contactPersonMobileNumber: "",
      contactPersonFaxDialCode: "+94",
      contactPersonFaxNumber: "",
      contactPersonEmail: "",
      contactPersonInitials: "",
      contactPersonLastName: "",
      contactPersonNameWithInitials: "",
      contactPersonNic: "",
      contactPersonPassportNumber: "",
      contactPersonFullName: "",
      contactAddressLine1: "",
      contactAddressLine2: "",
      contactAddressLine3: "",
      contactCountry: "",
      contactCity: "",
      contactPostalCode: "",
      attachments: [{ type: "", file: null }],
    })
    setShowClientTypeDialog(false)
    setPendingClientType("")
  }

  const cancelClientTypeChange = () => {
    setShowClientTypeDialog(false)
    setPendingClientType("")
  }

  const handleDialCodeChange = (field, dialCode) => {
    handleInputChange(field, dialCode)
  }

  const handleCountryChange = (field, countryName) => {
    handleInputChange(field, countryName)

    // Auto-fill dial codes when country is selected
    const selectedCountry = masterData.countries.find((c) => c.name === countryName)
    if (selectedCountry) {
      const dialCode = selectedCountry.dialCode

      if (field === "country") {
        // Auto-fill dial codes for main contact section
        handleInputChange("telDialCode", dialCode)
        handleInputChange("mobileDialCode", dialCode)
        handleInputChange("faxDialCode", dialCode)
      } else if (field === "contactCountry") {
        // Auto-fill dial codes for contact person section
        handleInputChange("contactTelDialCode", dialCode)
        handleInputChange("contactMobileDialCode", dialCode)
        handleInputChange("contactFaxDialCode", dialCode)
      }
    }
  }

  const CharacterCounter = ({ value, maxLength, className = "" }) => {
    const count = value ? value.length : 0
    return (
      <span className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}>
        {count}/{maxLength}
      </span>
    )
  }

  const getClientDisplayName = () => {
    if (formData.clientType === "Individual") {
      return formData.nameWithInitials || "Not specified"
    } else {
      return formData.companyName || "Not specified"
    }
  }

  const getClientTypeOptions = () => {
    return masterData.clientTypes.map((type) => ({
      value: type.name,
      label: type.name,
    }))
  }

  const getTitleOptions = () => {
    return masterData.titles.map((title) => ({
      value: title.name,
      label: title.name,
    }))
  }

  const getCountryOptions = () => {
    return masterData.countries.map((country) => ({
      value: country.name,
      label: country.name,
    }))
  }

  const getCountryDisplayValue = (countryName) => {
    const country = masterData.countries.find((c) => c.name === countryName)
    return country ? country.name : ""
  }

  const getProvinceOptions = () => {
    return masterData.provinces.map((province) => ({
      value: province.name,
      label: province.name,
    }))
  }

  const getDistrictOptions = (provinceName) => {
    if (!provinceName) return []
    return masterData.districts
      .filter((district) => district.province === provinceName)
      .map((district) => ({
        value: district.name,
        label: district.name,
      }))
  }

  const getDSDivisionOptions = (districtName) => {
    if (!districtName) return []
    return masterData.dsDivisions
      .filter((dsDivision) => dsDivision.district === districtName)
      .map((dsDivision) => ({
        value: dsDivision.name,
        label: dsDivision.name,
      }))
  }

  const getCityOptions = (districtName) => {
    if (!districtName) return []
    return masterData.cities
      .filter((city) => city.district === districtName)
      .map((city) => ({
        value: city.name,
        label: city.name,
      }))
  }

  const getPostalCodeOptions = (cityName) => {
    if (!cityName) return []
    return masterData.postalCodes
      .filter((postalCode) => postalCode.city === cityName)
      .map((postalCode) => ({
        value: postalCode.code,
        label: postalCode.code,
      }))
  }

  const getPostalCodeDisplayValue = (postalCode) => {
    const postal = masterData.postalCodes.find((p) => p.code === postalCode)
    return postal ? postal.code : ""
  }

  const getTaxTypeOptions = () => {
    return masterData.taxTypes.map((taxType) => ({
      value: taxType.name,
      label: taxType.name,
    }))
  }

  const removeAttachment = (id) => {
    setAttachments((prevAttachments) => prevAttachments.filter((attachment) => attachment.id !== id))
  }

  const getAttachmentTypeOptions = () => {
    return masterData.attachmentTypes.map((attachmentType) => ({
      value: attachmentType.name,
      label: attachmentType.name,
    }))
  }

  const updateAttachment = (id, field, value) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) => (attachment.id === id ? { ...attachment, [field]: value } : attachment)),
    )
  }

  const handleFileChange = (id, event) => {
    const file = event.target.files[0]
    if (file) {
      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.id === id ? { ...attachment, file: file, fileName: file.name } : attachment,
        ),
      )
    }
  }

  const removeFile = (id) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.id === id ? { ...attachment, file: null, fileName: "" } : attachment,
      ),
    )
  }

  const addAttachment = () => {
    const newId = attachments.length > 0 ? Math.max(...attachments.map((a) => a.id)) + 1 : 1
    setAttachments([...attachments, { id: newId, attachmentType: "", file: null, fileName: "" }])
  }

  const getStatusOptions = () => {
    return masterData.statuses.map((status) => ({
      value: status.name,
      label: status.name,
    }))
  }

  return (
    <div className="space-y-6">
      <AlertDialog open={showClientTypeDialog} onOpenChange={setShowClientTypeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you really want to change the client type?</AlertDialogTitle>
            <AlertDialogDescription>Changing the client type will erase any filled data.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelClientTypeChange} autoFocus>
              No
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmClientTypeChange}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Client Management
          </Button>
        </div>

        <div className="space-y-4">
          {/* Page Title and Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Registration</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Company individual client registration</p>
          </div>

          {/* Separation Line */}
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Client Image, Code and Status in same div */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">JD</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Client:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{getClientDisplayName()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Client Code:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{formData.clientCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">{formData.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Categorization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Client Type</label>
              <SearchableSelect
                options={getClientTypeOptions()}
                value={formData.clientType}
                onValueChange={handleClientTypeChange}
                displayValue={formData.clientType}
                placeholder="Select Client Type"
                searchPlaceholder="Search client types..."
              />
            </div>
          </div>
        </div>

        <div>
          <Collapsible open={companyDetailsOpen} onOpenChange={setCompanyDetailsOpen}>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formData.clientType === "Individual" ? "Client Details" : "Company Details"}
                  </h3>
                  <Button variant="ghost" size="sm">
                    {companyDetailsOpen ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 space-y-6">
                {formData.clientType === "Individual" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Title</label>
                        <SearchableSelect
                          options={getTitleOptions()}
                          value={formData.title}
                          onValueChange={(value) => handleInputChange("title", value)}
                          displayValue={formData.title}
                          placeholder="Select Title"
                          searchPlaceholder="Search titles..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                          <CharacterCounter value={formData.fullName} maxLength={100} />
                        </div>
                        <Input
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Initial
                        </label>
                        <Input
                          placeholder="Initial"
                          value={formData.initial}
                          onChange={(e) => handleInputChange("initial", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Last Name
                        </label>
                        <Input
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Name With Initials
                        </label>
                        <Input
                          placeholder="Name With Initials"
                          value={formData.nameWithInitials}
                          readOnly
                          className="bg-muted cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">NIC</label>
                        <Input
                          placeholder="NIC Number"
                          value={formData.nic}
                          onChange={(e) => handleInputChange("nic", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Passport Number
                        </label>
                        <Input
                          placeholder="Passport Number"
                          value={formData.passportNumber}
                          onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.clientType !== "Individual" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                          <CharacterCounter value={formData.companyName} maxLength={200} />
                        </div>
                        <Input
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          maxLength={200}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          BR Number
                        </label>
                        <Input
                          placeholder="BR Number"
                          value={formData.brNumber}
                          onChange={(e) => handleInputChange("brNumber", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Country of Incorporation
                        </label>
                        <SearchableSelect
                          options={getCountryOptions()}
                          value={formData.countryOfIncorporation}
                          onValueChange={(value) => handleInputChange("countryOfIncorporation", value)}
                          displayValue={
                            formData.countryOfIncorporation
                              ? getCountryDisplayValue(formData.countryOfIncorporation)
                              : ""
                          }
                          placeholder="Select a country"
                          searchPlaceholder="Search countries..."
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Province</label>
                    <SearchableSelect
                      options={getProvinceOptions()}
                      value={formData.province}
                      onValueChange={(value) => handleInputChange("province", value)}
                      displayValue={formData.province}
                      placeholder="Select a Province"
                      searchPlaceholder="Search provinces..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">District</label>
                    <SearchableSelect
                      options={getDistrictOptions(formData.province)}
                      value={formData.district}
                      onValueChange={(value) => handleInputChange("district", value)}
                      displayValue={formData.district}
                      placeholder="Select a District"
                      searchPlaceholder="Search districts..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      DS Division
                    </label>
                    <SearchableSelect
                      options={getDSDivisionOptions(formData.district)}
                      value={formData.dsDivision}
                      onValueChange={(value) => handleInputChange("dsDivision", value)}
                      displayValue={formData.dsDivision}
                      placeholder="Select a DS Division"
                      searchPlaceholder="Search DS divisions..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 1</label>
                      <CharacterCounter value={formData.addressLine1} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 1"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 2</label>
                      <CharacterCounter value={formData.addressLine2} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 3</label>
                      <CharacterCounter value={formData.addressLine3} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 3"
                      value={formData.addressLine3}
                      onChange={(e) => handleInputChange("addressLine3", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Country</label>
                    <SearchableSelect
                      options={getCountryOptions()}
                      value={formData.country}
                      onValueChange={(value) => handleCountryChange("country", value)}
                      displayValue={formData.country ? getCountryDisplayValue(formData.country) : ""}
                      placeholder="Select a country"
                      searchPlaceholder="Search countries..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">City</label>
                    <SearchableSelect
                      options={getCityOptions(formData.district)}
                      value={formData.city}
                      onValueChange={(value) => handleInputChange("city", value)}
                      displayValue={formData.city}
                      placeholder="Select a City"
                      searchPlaceholder="Search cities..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Postal Code
                    </label>
                    <SearchableSelect
                      options={getPostalCodeOptions(formData.city)}
                      value={formData.postalCode}
                      onValueChange={(value) => handleInputChange("postalCode", value)}
                      displayValue={formData.postalCode ? getPostalCodeDisplayValue(formData.postalCode) : ""}
                      placeholder="Select a Postal Code"
                      searchPlaceholder="Search postal codes..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Tel Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.telDialCode}
                        onValueChange={(value) => handleDialCodeChange("telDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="117######"
                        value={formData.telNumber}
                        onChange={(e) => handleInputChange("telNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.mobileDialCode}
                        onValueChange={(value) => handleDialCodeChange("mobileDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="701231239"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Fax Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.faxDialCode}
                        onValueChange={(value) => handleDialCodeChange("faxDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="117######"
                        value={formData.faxNumber}
                        onChange={(e) => handleInputChange("faxNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                  <Input
                    placeholder="example@valid.net"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={!validateEmail(formData.email) && formData.email ? "border-red-500" : ""}
                  />
                  {!validateEmail(formData.email) && formData.email && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email format (e.g., example@domain.com)
                    </p>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Contact Person Agent Details */}
        <div>
          <Collapsible open={contactPersonOpen} onOpenChange={setContactPersonOpen}>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Person Agent Details</h3>
                  <Button variant="ghost" size="sm">
                    {contactPersonOpen ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Title</label>
                    <SearchableSelect
                      options={getTitleOptions()}
                      value={formData.contactPersonTitle}
                      onValueChange={(value) => handleInputChange("contactPersonTitle", value)}
                      displayValue={formData.contactPersonTitle}
                      placeholder="Select Title"
                      searchPlaceholder="Search titles..."
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <CharacterCounter value={formData.contactPersonFullName} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Full Name"
                      value={formData.contactPersonFullName}
                      onChange={(e) => handleInputChange("contactPersonFullName", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Initials</label>
                    <Input
                      placeholder="Initials A B C"
                      value={formData.contactPersonInitials}
                      onChange={(e) => handleInputChange("contactPersonInitials", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Last Name</label>
                    <Input
                      placeholder="Last Name"
                      value={formData.contactPersonLastName}
                      onChange={(e) => handleInputChange("contactPersonLastName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Name With Initials
                    </label>
                    <Input
                      placeholder="Auto Generated"
                      value={formData.contactPersonNameWithInitials}
                      readOnly
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">NIC</label>
                    <Input
                      placeholder="+94XXXXXXXXV/ 199940003445"
                      value={formData.contactPersonNic}
                      onChange={(e) => handleInputChange("contactPersonNic", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Passport Number
                    </label>
                    <Input
                      placeholder="N1234567891123"
                      value={formData.contactPersonPassportNumber}
                      onChange={(e) => handleInputChange("contactPersonPassportNumber", e.target.value)}
                    />
                  </div>
                </div>

                {/* Contact Address Fields - Similar structure as Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 1</label>
                      <CharacterCounter value={formData.contactAddressLine1} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 1"
                      value={formData.contactAddressLine1}
                      onChange={(e) => handleInputChange("contactAddressLine1", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 2</label>
                      <CharacterCounter value={formData.contactAddressLine2} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 2"
                      value={formData.contactAddressLine2}
                      onChange={(e) => handleInputChange("contactAddressLine2", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 3</label>
                      <CharacterCounter value={formData.contactAddressLine3} maxLength={100} />
                    </div>
                    <Input
                      placeholder="Address Line 3"
                      value={formData.contactAddressLine3}
                      onChange={(e) => handleInputChange("contactAddressLine3", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Country</label>
                    <SearchableSelect
                      options={getCountryOptions()}
                      value={formData.contactCountry}
                      onValueChange={(value) => handleCountryChange("contactCountry", value)}
                      displayValue={formData.contactCountry ? getCountryDisplayValue(formData.contactCountry) : ""}
                      placeholder="Select a country"
                      searchPlaceholder="Search countries..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">City</label>
                    <SearchableSelect
                      options={getCityOptions(formData.district)}
                      value={formData.contactCity}
                      onValueChange={(value) => handleInputChange("contactCity", value)}
                      displayValue={formData.contactCity}
                      placeholder="Select a City"
                      searchPlaceholder="Search cities..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Postal Code
                    </label>
                    <SearchableSelect
                      options={getPostalCodeOptions(formData.contactCity)}
                      value={formData.contactPostalCode}
                      onValueChange={(value) => handleInputChange("contactPostalCode", value)}
                      displayValue={
                        formData.contactPostalCode ? getPostalCodeDisplayValue(formData.contactPostalCode) : ""
                      }
                      placeholder="Select a Postal Code"
                      searchPlaceholder="Search postal codes..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Tel Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.contactTelDialCode}
                        onValueChange={(value) => handleDialCodeChange("contactTelDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="117######"
                        value={formData.contactTelNumber}
                        onChange={(e) => handleInputChange("contactTelNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.contactMobileDialCode}
                        onValueChange={(value) => handleDialCodeChange("contactMobileDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="701231239"
                        value={formData.contactMobileNumber}
                        onChange={(e) => handleInputChange("contactMobileNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Fax Number
                    </label>
                    <div className="flex gap-2">
                      <DialCodeSelector
                        countries={masterData.countries}
                        value={formData.contactFaxDialCode}
                        onValueChange={(value) => handleDialCodeChange("contactFaxDialCode", value)}
                        placeholder="+94"
                        className="w-24"
                      />
                      <Input
                        placeholder="117######"
                        value={formData.contactFaxNumber}
                        onChange={(e) => handleInputChange("contactFaxNumber", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                  <Input
                    placeholder="example@valid.net"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className={!validateEmail(formData.contactEmail) && formData.contactEmail ? "border-red-500" : ""}
                  />
                  {!validateEmail(formData.contactEmail) && formData.contactEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email format (e.g., example@domain.com)
                    </p>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Tax Details */}
        <div>
          <Collapsible open={taxDetailsOpen} onOpenChange={setTaxDetailsOpen}>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Details</h3>
                  <Button variant="ghost" size="sm">
                    {taxDetailsOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Tax Type</label>
                    <SearchableSelect
                      options={getTaxTypeOptions()}
                      value={formData.taxType}
                      onValueChange={(value) => handleInputChange("taxType", value)}
                      displayValue={formData.taxType}
                      placeholder="Select Tax Type"
                      searchPlaceholder="Search tax types..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Tax Identification Number (TIN)
                    </label>
                    <Input
                      placeholder="Tax Identification Number (TIN)"
                      value={formData.tinNumber}
                      onChange={(e) => handleInputChange("tinNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">VAT No</label>
                    <Input
                      placeholder="VAT No"
                      value={formData.vatNo}
                      onChange={(e) => handleInputChange("vatNo", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">SAVT No</label>
                    <Input
                      placeholder="SAVT No"
                      value={formData.savtNo}
                      onChange={(e) => handleInputChange("savtNo", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">WHT No</label>
                    <Input
                      placeholder="WHT No"
                      value={formData.whtNo}
                      onChange={(e) => handleInputChange("whtNo", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Attachments */}
        <div>
          <Collapsible open={attachmentsOpen} onOpenChange={setAttachmentsOpen}>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachments</h3>
                  <Button variant="ghost" size="sm">
                    {attachmentsOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6 space-y-6">
                {attachments.map((attachment, index) => (
                  <div
                    key={attachment.id}
                    className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Attachment {index + 1}</h4>
                      {attachments.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Attachment Type
                        </label>
                        <SearchableSelect
                          options={getAttachmentTypeOptions()}
                          value={attachment.attachmentType}
                          onValueChange={(value) => updateAttachment(attachment.id, "attachmentType", value)}
                          displayValue={attachment.attachmentType}
                          placeholder="Select Attachment Type"
                          searchPlaceholder="Search attachment types..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Upload File
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id={`file-${attachment.id}`}
                            onChange={(e) => handleFileChange(attachment.id, e)}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById(`file-${attachment.id}`).click()}
                            className="flex items-center gap-2"
                          >
                            <DocumentArrowUpIcon className="h-4 w-4" />
                            Choose File
                          </Button>
                          {attachment.fileName ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-40">
                                {attachment.fileName}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(attachment.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No file chosen</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={addAttachment} className="bg-gray-900 dark:bg-gray-700 flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Add More
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Status */}
        <div>
          <Collapsible open={statusOpen} onOpenChange={setStatusOpen}>
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h3>
                  <Button variant="ghost" size="sm">
                    {statusOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-6">
                <div className="w-full md:w-1/3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
                  <SearchableSelect
                    options={getStatusOptions()}
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                    displayValue={formData.status}
                    placeholder="Select Status"
                    searchPlaceholder="Search statuses..."
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Separation Line before action buttons */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
        >
          Print
        </Button>
        <Button className="bg-gray-900 dark:bg-gray-700">Create</Button>
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
      </div>
    </div>
  )
}

export default ClientRegistration
