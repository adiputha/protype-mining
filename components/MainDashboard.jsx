"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  EyeIcon,
  ChartBarIcon,
  MapIcon,
} from "@heroicons/react/24/outline"

const MainDashboard = ({ darkMode }) => {
  // Sample data for KPI cards
  const kpiData = [
    {
      title: "Pending Application",
      value: "+121",
      icon: DocumentTextIcon,
      color: "blue",
    },
    {
      title: "Pending Inspection",
      value: "+41",
      icon: ClipboardDocumentCheckIcon,
      color: "orange",
    },
    {
      title: "License Generated",
      value: "+4",
      icon: DocumentIcon,
      color: "green",
    },
    {
      title: "License Approved",
      value: "+20",
      icon: CheckCircleIcon,
      color: "blue",
    },
    {
      title: "License Rejected",
      value: "+121",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "License Hold",
      value: "+41",
      icon: ArrowDownTrayIcon,
      color: "yellow",
    },
    {
      title: "License Cancel",
      value: "+4",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
    {
      title: "Renewal/Extend",
      value: "+20",
      icon: ClockIcon,
      color: "purple",
    },
  ]

  // Sample data for recent status
  const recentStatusData = [
    {
      company: "Maga Engineering (Pvt) Ltd",
      applicationNumber: "2025/IML/00525",
      status: "Mining Engineer Inspection",
    },
    {
      company: "Access Engineering PLC",
      applicationNumber: "2025/IML/00605",
      status: "Mining Engineer Approve",
    },
    {
      company: "Senok Mining (pvt) Ltd",
      applicationNumber: "2025/IML/00650",
      status: "Hold",
    },
    {
      company: "Ananda Miners",
      applicationNumber: "2025/IML/00655",
      status: "License Generate",
    },
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Main Content Area - 3 columns */}
      <div className="xl:col-span-3 space-y-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20`}>
                    <kpi.icon className={`h-6 w-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Status Section */}
        <Card className="dark:bg-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Pending Applications</CardTitle>
              <Button size="sm" className="bg-gray-900 dark:bg-gray-700">
                <EyeIcon className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                <div>Application Number</div>
                <div>Status</div>
              </div>

              {recentStatusData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.applicationNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - 1 column */}
      <div className="xl:col-span-1 space-y-6">
        {/* Charts/Maps Placeholder */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Map Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Report</Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainDashboard
