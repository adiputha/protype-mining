"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { HomeIcon as HomeIconSolid, UserGroupIcon as UserGroupIconSolid } from "@heroicons/react/24/solid"
import MainDashboard from "./MainDashboard"
import ClientManagement from "./ClientManagement"
import ApplicationManagement from "./ApplicationManagement"
import ClientRegistration from "./ClientRegistration"
import ApplicationRegistration from "./ApplicationRegistration"
import ClientTypeMaster from "./master-data/ClientTypeMaster"
import CountryMaster from "./master-data/CountryMaster"
import ProvinceMaster from "./master-data/ProvinceMaster"
import DistrictMaster from "./master-data/DistrictMaster"
import DSDivisionMaster from "./master-data/DSDivisionMaster"
import CityMaster from "./master-data/CityMaster"
import TitleMaster from "./master-data/TitleMaster"
import TaxTypeMaster from "./master-data/TaxTypeMaster"
import AttachmentTypeMaster from "./master-data/AttachmentTypeMaster"
import StatusMaster from "./master-data/StatusMaster"
import PostalCodeMaster from "./master-data/PostalCodeMaster"

const MiningDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sampleOpen, setSampleOpen] = useState(false)
  const [adminModuleOpen, setAdminModuleOpen] = useState(false)
  const [masterItemsOpen, setMasterItemsOpen] = useState(false)
  const [applicationsOpen, setApplicationsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { theme, setTheme } = useTheme()
  const [currentView, setCurrentView] = useState("dashboard")
  const [hoveredItem, setHoveredItem] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const navigationItems = [
    {
      label: "Dashboard",
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      href: "#",
      active: currentView === "dashboard",
      view: "dashboard",
    },
    {
      label: "Client Management",
      icon: UserGroupIcon,
      activeIcon: UserGroupIconSolid,
      href: "#",
      active: currentView === "client-management",
      view: "client-management",
    },
    {
      label: "Applications",
      icon: DocumentTextIcon,
      href: "#",
      hasSubmenu: true,
      submenu: [
        { label: "Application Management", href: "#", view: "application-management" },
        { label: "Sample", href: "#" },
      ],
    },
    {
      label: "Sample",
      icon: ClipboardDocumentListIcon,
      href: "#",
    },
    {
      label: "Sample",
      icon: DocumentTextIcon,
      href: "#",
    },
    {
      label: "Admin Module",
      icon: Cog6ToothIcon,
      href: "#",
      hasSubmenu: true,
      submenu: [
        {
          label: "Master Items",
          href: "#",
          isSubmenuHeader: true,
          hasSubmenu: true,
          submenu: [
            { label: "Client Type", href: "#", view: "client-type-master" },
            { label: "Country", href: "#", view: "country-master" },
            { label: "Province", href: "#", view: "province-master" },
            { label: "District", href: "#", view: "district-master" },
            { label: "DS Division", href: "#", view: "ds-division-master" },
            { label: "City", href: "#", view: "city-master" },
            { label: "Postal Code", href: "#", view: "postal-code-master" },
            { label: "Title", href: "#", view: "title-master" },
            { label: "Tax Type", href: "#", view: "tax-type-master" },
            { label: "Attachment Type", href: "#", view: "attachment-type-master" },
            { label: "Status", href: "#", view: "status-master" },
          ],
        },
      ],
    },
  ]

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setTheme(theme === "dark" ? "light" : "dark")

  const handleMouseEnter = (item, event) => {
    if (!sidebarOpen) {
      const rect = event.currentTarget.getBoundingClientRect()
      setTooltipPosition({
        x: rect.right + 8,
        y: rect.top + rect.height / 2,
      })
      setHoveredItem(item.label)
    }
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <MainDashboard />
      case "client-management":
        return <ClientManagement onNewClient={() => setCurrentView("client-registration")} />
      case "client-registration":
        return <ClientRegistration onBack={() => setCurrentView("client-management")} />
      case "application-management":
        return <ApplicationManagement onNewApplication={() => setCurrentView("application-registration")} />
      case "application-registration":
        return <ApplicationRegistration onBack={() => setCurrentView("application-management")} />
      case "client-type-master":
        return <ClientTypeMaster />
      case "country-master":
        return <CountryMaster />
      case "province-master":
        return <ProvinceMaster />
      case "district-master":
        return <DistrictMaster />
      case "ds-division-master":
        return <DSDivisionMaster />
      case "city-master":
        return <CityMaster />
      case "postal-code-master":
        return <PostalCodeMaster />
      case "title-master":
        return <TitleMaster />
      case "tax-type-master":
        return <TaxTypeMaster />
      case "attachment-type-master":
        return <AttachmentTypeMaster />
      case "status-master":
        return <StatusMaster />
      default:
        return <MainDashboard />
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex min-h-screen bg-background">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "w-80" : "w-16"
            } transition-all duration-300 bg-card shadow-lg flex flex-col border-r border-border fixed left-0 top-0 bottom-0 z-50`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                {sidebarOpen && <h2 className="text-xl font-bold text-foreground">Mining</h2>}
                <Button variant="ghost" size="sm" onClick={toggleSidebar} className="text-muted-foreground">
                  {sidebarOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Search Input */}
            {sidebarOpen && (
              <div className="p-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-2 space-y-1">
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    <div className="relative">
                      <Button
                        variant={item.active ? "secondary" : "ghost"}
                        className={`w-full ${!sidebarOpen ? "justify-center px-2" : "justify-start"} ${
                          item.active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => {
                          if (!sidebarOpen) {
                            setSidebarOpen(true)
                          }
                          if (item.view) {
                            setCurrentView(item.view)
                          } else if (item.label === "Sample" && item.hasSubmenu) {
                            setSampleOpen(!sampleOpen)
                          } else if (item.label === "Applications" && item.hasSubmenu) {
                            setApplicationsOpen(!applicationsOpen)
                          } else if (item.label === "Admin Module" && item.hasSubmenu) {
                            setAdminModuleOpen(!adminModuleOpen)
                          }
                        }}
                        onMouseEnter={(e) => handleMouseEnter(item, e)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <item.icon className="h-5 w-5" />
                        {sidebarOpen && (
                          <>
                            <span className="ml-3 font-medium">{item.label}</span>
                            {item.hasSubmenu && (
                              <ChevronDownIcon
                                className={`h-4 w-4 ml-auto transition-transform ${
                                  (item.label === "Sample" && sampleOpen) ||
                                  (item.label === "Applications" && applicationsOpen) ||
                                  (item.label === "Admin Module" && adminModuleOpen)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            )}
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Submenu */}
                    {sidebarOpen && item.hasSubmenu && (
                      <Collapsible
                        open={
                                item.label === "Sample" ? sampleOpen : 
                                item.label === "Applications" ? applicationsOpen :
                                item.label === "Admin Module" ? adminModuleOpen : false
                            }
                      >
                        <CollapsibleContent className="pl-4 space-y-1">
                          {item.submenu?.map((subItem, subIndex) =>
                            subItem.isHeader ? (
                              <div
                                key={subIndex}
                                className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                              >
                                {subItem.label}
                              </div>
                            ) : subItem.isSubmenuHeader ? (
                              <div key={subIndex}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                  onClick={() => setMasterItemsOpen(!masterItemsOpen)}
                                >
                                  <span className="text-sm font-medium">{subItem.label}</span>
                                  <ChevronDownIcon
                                    className={`h-3 w-3 ml-auto transition-transform ${
                                      masterItemsOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </Button>
                                <Collapsible open={masterItemsOpen}>
                                  <CollapsibleContent className="pl-4 space-y-1">
                                    {subItem.submenu?.map((masterItem, masterIndex) => (
                                      <Button
                                        key={masterIndex}
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground text-xs"
                                        onClick={() => {
                                          if (masterItem.view) {
                                            setCurrentView(masterItem.view)
                                          }
                                        }}
                                      >
                                        <span>{masterItem.label}</span>
                                      </Button>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                            ) : (
                              <Button
                                key={subIndex}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                onClick={() => {
                                  if (subItem.view) {
                                    setCurrentView(subItem.view)
                                  }
                                }}
                              >
                                <span className="text-sm">{subItem.label}</span>
                              </Button>
                            ),
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Settings */}
            <div className="p-2 border-t border-border">
              <div className="relative">
                <Button
                  variant="ghost"
                  className={`w-full ${!sidebarOpen ? "justify-center px-2" : "justify-start"} text-foreground hover:bg-accent hover:text-accent-foreground`}
                  onClick={() => {
                    if (!sidebarOpen) {
                      setSidebarOpen(true)
                    }
                  }}
                  onMouseEnter={(e) => handleMouseEnter({ label: "Settings" }, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3 font-medium">Settings</span>}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 flex flex-col ${sidebarOpen ? "ml-80" : "ml-16"} transition-all duration-300`}>
            {/* Top Navigation */}
            <header className="sticky top-0 z-10 bg-card shadow-md border-b border-border">
              <div className="flex items-center justify-between px-4 py-3 lg:px-8">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleSidebar}>
                    <Bars3Icon className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Language Button */}
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <GlobeAltIcon className="h-5 w-5" />
                  </Button>

                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="text-muted-foreground relative">
                    <BellIcon className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                      5
                    </Badge>
                  </Button>

                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 text-foreground">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="avatar"
                          />
                          <AvatarFallback>TU</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Test User</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem onClick={toggleDarkMode} className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <div
                          className={`w-10 h-5 rounded-full transition-colors ${theme === "dark" ? "bg-primary" : "bg-muted"} relative`}
                        >
                          <div
                            className={`w-4 h-4 bg-background rounded-full absolute top-0.5 transition-transform ${theme === "dark" ? "translate-x-5" : "translate-x-0.5"} shadow-sm border border-border`}
                          />
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 bg-background">{renderCurrentView()}</main>
          </div>
        </div>

        {hoveredItem && !sidebarOpen && (
          <div
            className="fixed z-[10000] px-3 py-2 text-sm font-medium bg-popover text-popover-foreground border border-border rounded-md shadow-lg pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: "translateY(-50%)",
            }}
          >
            {hoveredItem}
          </div>
        )}
      </div>
    </>
  )
}

export default MiningDashboard
