"use client"

import { useState } from "react"
import { FaChevronDown, FaChevronUp, FaRegCalendarAlt, FaRegClock } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { effectiveDate, lastUpdated, sections, summaryItems } from "@/app/constants/terms"

export default function TermsPage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-6 lg:px-8" style={{ backgroundColor: "#080D27" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-1 bg-gradient-to-b from-[#2EF2FF] to-[#3C52D9]"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#EAEDFF]">Terms of Service</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#C4CBF5]">
            <div className="flex items-center gap-1.5">
              <FaRegCalendarAlt className="text-[#2EF2FF]" />
              <span>Effective Date: {effectiveDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRegClock className="text-[#2EF2FF]" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-lg mb-8" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#2EF2FF]">Quick Summary</h2>
            <p className="text-[#C4CBF5] text-sm">
              This is a simplified summary of our Terms of Service to help you understand the key points. Please read
              the full terms below for complete details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {summaryItems.map((item, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: "#263466" }}>
                  <h3 className="font-medium text-[#C8EA80] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#C4CBF5]">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="hidden md:block space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="rounded-lg overflow-hidden" style={{ backgroundColor: "#0C1838" }}>
                <div className="p-4 font-semibold text-lg flex items-center" style={{ backgroundColor: "#263466" }}>
                  <h3 className="text-[#EAEDFF]">{section.title}</h3>
                </div>
                <div className="p-6 text-[#C4CBF5]">{section.content}</div>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-3">
            {sections.map((section, index) => (
              <div key={index} className="rounded-lg overflow-hidden" style={{ backgroundColor: "#0C1838" }}>
                <button
                  className="p-4 font-semibold text-left w-full flex items-center justify-between"
                  style={{ backgroundColor: "#263466" }}
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-[#EAEDFF]">{section.title}</h3>
                  {expandedSection === index ? (
                    <FaChevronUp className="text-[#2EF2FF]" />
                  ) : (
                    <FaChevronDown className="text-[#2EF2FF]" />
                  )}
                </button>
                {expandedSection === index && <div className="p-4 text-[#C4CBF5]">{section.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
