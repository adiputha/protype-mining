"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

const DialCodeSelector = ({ countries = [], value, onValueChange, placeholder = "+1", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)

  const filteredCountries = countries.filter(
    (country) =>
      country.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode?.includes(searchTerm),
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (country) => {
    onValueChange(country.dialCode)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between text-left font-normal px-2"
      >
        <span className="truncate text-sm">{value || placeholder}</span>
        {isOpen ? <ChevronUpIcon className="h-3 w-3 opacity-50" /> : <ChevronDownIcon className="h-3 w-3 opacity-50" />}
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-80 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredCountries.length === 0 ? (
              <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No countries found</div>
            ) : (
              filteredCountries.map((country) => (
                <div
                  key={country.id}
                  onClick={() => handleSelect(country)}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{country.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{country.code}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">{country.dialCode}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DialCodeSelector
