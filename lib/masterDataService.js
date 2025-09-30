// This simulates fetching data from the master data components
export const masterDataService = {
  getClientTypes: () => [
    { id: 1, name: "Individual", status: "Active" },
    { id: 2, name: "Company", status: "Active" },
    { id: 3, name: "Partnership", status: "Active" },
  ],

  getCountries: () => [
    { id: 1, name: "Sri Lanka", code: "LK", dialCode: "+94", status: "Active" },
    { id: 2, name: "India", code: "IN", dialCode: "+91", status: "Active" },
    { id: 3, name: "United States", code: "US", dialCode: "+1", status: "Active" },
    { id: 4, name: "United Kingdom", code: "GB", dialCode: "+44", status: "Active" },
  ],

  getProvinces: () => [
    { id: 1, name: "Western Province", country: "Sri Lanka", status: "Active" },
    { id: 2, name: "Central Province", country: "Sri Lanka", status: "Active" },
    { id: 3, name: "Southern Province", country: "Sri Lanka", status: "Active" },
    { id: 4, name: "Northern Province", country: "Sri Lanka", status: "Active" },
  ],

  getDistricts: () => [
    { id: 1, name: "Colombo", province: "Western Province", status: "Active" },
    { id: 2, name: "Gampaha", province: "Western Province", status: "Active" },
    { id: 3, name: "Kalutara", province: "Western Province", status: "Active" },
    { id: 4, name: "Kandy", province: "Central Province", status: "Active" },
    { id: 5, name: "Matale", province: "Central Province", status: "Active" },
  ],

  getDSDivisions: () => [
    { id: 1, name: "Colombo", district: "Colombo", status: "Active" },
    { id: 2, name: "Dehiwala-Mount Lavinia", district: "Colombo", status: "Active" },
    { id: 3, name: "Moratuwa", district: "Colombo", status: "Active" },
    { id: 4, name: "Negombo", district: "Gampaha", status: "Active" },
    { id: 5, name: "Gampaha", district: "Gampaha", status: "Active" },
  ],

  getCities: () => [
    { id: 1, name: "Colombo", district: "Colombo", postalCode: "00100", status: "Active" },
    { id: 2, name: "Dehiwala", district: "Colombo", postalCode: "10350", status: "Active" },
    { id: 3, name: "Mount Lavinia", district: "Colombo", postalCode: "10370", status: "Active" },
    { id: 4, name: "Moratuwa", district: "Colombo", postalCode: "10400", status: "Active" },
    { id: 5, name: "Negombo", district: "Gampaha", postalCode: "11500", status: "Active" },
  ],

  getTitles: () => [
    { id: 1, name: "Mr.", description: "Mister", status: "Active" },
    { id: 2, name: "Mrs.", description: "Missus", status: "Active" },
    { id: 3, name: "Ms.", description: "Miss", status: "Active" },
    { id: 4, name: "Dr.", description: "Doctor", status: "Active" },
    { id: 5, name: "Prof.", description: "Professor", status: "Active" },
  ],

  getTaxTypes: () => [
    { id: 1, name: "VAT", description: "Value Added Tax", rate: "18%", status: "Active" },
    { id: 2, name: "NBT", description: "Nation Building Tax", rate: "2%", status: "Active" },
    { id: 3, name: "WHT", description: "Withholding Tax", rate: "5%", status: "Active" },
    { id: 4, name: "SVAT", description: "Social Security Contribution Levy", rate: "2.5%", status: "Active" },
  ],

  getAttachmentTypes: () => [
    {
      id: 1,
      name: "National ID",
      description: "National Identity Card",
      extensions: "PDF, JPG, PNG",
      status: "Active",
    },
    { id: 2, name: "Passport", description: "Passport Document", extensions: "PDF, JPG, PNG", status: "Active" },
    {
      id: 3,
      name: "Business Registration",
      description: "Business Registration Certificate",
      extensions: "PDF",
      status: "Active",
    },
    {
      id: 4,
      name: "Tax Certificate",
      description: "Tax Registration Certificate",
      extensions: "PDF",
      status: "Active",
    },
  ],

  getStatuses: () => [
    { id: 1, name: "Active", description: "Active status", color: "green", status: "Active" },
    { id: 2, name: "Inactive", description: "Inactive status", color: "gray", status: "Active" },
    { id: 3, name: "Pending", description: "Pending approval", color: "yellow", status: "Active" },
    { id: 4, name: "Approved", description: "Approved status", color: "blue", status: "Active" },
    { id: 5, name: "Rejected", description: "Rejected status", color: "red", status: "Active" },
  ],

  getPostalCodes: () => [
    { id: 1, code: "00100", city: "Colombo", status: "Active" },
    { id: 2, code: "10350", city: "Dehiwala", status: "Active" },
    { id: 3, code: "10370", city: "Mount Lavinia", status: "Active" },
    { id: 4, code: "10400", city: "Moratuwa", status: "Active" },
    { id: 5, code: "11500", city: "Negombo", status: "Active" },
  ],
}
