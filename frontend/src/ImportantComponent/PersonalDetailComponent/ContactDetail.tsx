import React, { useState, useEffect } from "react"
import axios from "axios"
import debounce from "lodash.debounce"
import { useSelector } from "react-redux"
import { RootState } from "@/stores/store"
import { ChevronDown, ChevronUp, ChevronUpIcon, CircleUserRound, HelpCircle } from 'lucide-react'
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { motion } from "framer-motion"


interface FormData {
  aadharNumber: string,
    aadharEnrollment: string,
    panNumber: string,
    mobileNumber:string,
    email: string,
    secondaryMobileNumber: string,
    secondaryEmail: string,
    landlineStd: string,
    landlineNumber: string
}
type TrackedField = 'aadharNumber' | 'panNumber'| 'mobileNumber' | 'email' | 'secondaryMobileNumber' | 'secondaryEmail'|'landlineStd'|'landlineNumber';
function ContactDetail() {
  const selectIsUserLoggedIn = (state: RootState) => state.user.user !== null;
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  const [isOpen, setIsOpen] = useState(true)
  const [useEnrollment, setUseEnrollment] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    aadharNumber: "",
    aadharEnrollment: "",
    panNumber: "",
    mobileNumber: "",
    email: "",
    secondaryMobileNumber: "",
    secondaryEmail: "",
    landlineStd: "",
    landlineNumber: "",
  })

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const trackedFields: TrackedField[] = ['aadharNumber' , 'panNumber', 'mobileNumber' , 'email' , 'secondaryMobileNumber' , 'secondaryEmail','landlineStd','landlineNumber'];
  const getFilledFieldsCount = () => {
    return trackedFields.filter(field => formData[field] && formData[field].trim() !== "").length;
  };

  
  const getTotalFieldsCount = () => {
    return trackedFields.length;
  };
  // Debounced function to update the database
  const updateDatabase = debounce(async (data) => {
    const token = localStorage.getItem("token");
    setSaveStatus("saving");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/personal/contact-details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSaveStatus("saved");
    } catch (error) {
      console.error("Error updating contact details:", error)
    }
  }, 1000)

  useEffect(() => {
    const fetchContactDetail = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/personal/contact-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = response.data
        setFormData(data);
        setSaveStatus("saved");
      } catch (error) {
        console.error("Error fetching personal details:", error)
      }
    }

    if (isUserLoggedIn) {
      fetchContactDetail()
    }
  }, [isUserLoggedIn])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData);
    setSaveStatus("unsaved");
    // updateDatabase(updatedData)
  }
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData);
    // setSaveStatus("unsaved");
    updateDatabase(updatedData)
  }

  const handlePhoneChange = (value: string, name: string) => {
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData);
    setSaveStatus("unsaved");
    // updateDatabase(updatedData)
  }
  const handleInputBlurPhone = () => {
    // Since we already have the latest value in formData, we can just use that
    updateDatabase(formData);
}

  return (
    <div className="mx-auto bg-white border rounded-md overflow-hidden max-w-4xl ">
      <div onClick={toggleOpen} className="cursor-pointer p-2 border-b border-gray-200 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      
        <div className="flex items-center space-x-4">
          <CircleUserRound className="h-7 w-7  text-blue-500 ml-2" />
          <div>
            <h2 className="text-lg sm:text-base font-semibold text-gray-800">Identification & Contact details</h2>
            <p className="text-xs sm:text-xs text-gray-600">
              To e-file your returns, please provide your Aadhaar, PAN and contact details.
            </p>
          </div>
          </div>
          <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{getFilledFieldsCount()}</span>
            <span className="mx-1">/</span>
            <span>{getTotalFieldsCount()}</span>
            <span className="ml-1">fields filled</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs font-medium ${
                saveStatus === "saved"
                  ? "text-green-500"
                  : saveStatus === "saving"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {saveStatus === "saved" && "Saved"}
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "unsaved" && "Unsaved"}
            </span>
            <ChevronUpIcon className={`w-5 h-5 transition-transform ${isOpen ? "" : "rotate-180"}`} />
          </div>
        </div>
      </div>
    {isOpen && (
      <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 space-y-6"
    >
      <div className=" space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <div>
            {/* <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">Aadhaar Details *</label> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  onBlur={handleInputBlur}
                  placeholder="XXXX XXXX XXXX"
                  disabled={useEnrollment}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OR Aadhaar Enrollment No.</label>
                <input
                  type="text"
                  name="aadharEnrollment"
                  value={formData.aadharEnrollment}
                  onBlur={handleInputBlur}
                  onChange={handleChange}
                  placeholder="Enter 28 digit number"
                  disabled={!useEnrollment}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <span className="text-xs sm:text-xs text-gray-500">
                Don't remember your Aadhaar number or Enrollment number?{" "}
                <button className="text-blue-500 hover:underline">Search it here</button>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PAN *</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              onBlur={handleInputBlur}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              placeholder="Enter PAN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No *</label>
            <PhoneInput
              country="in"
              value={formData.mobileNumber}
              onChange={(value) => handlePhoneChange(value, "mobileNumber")}
              onBlur={handleInputBlurPhone}
              inputClass="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              containerClass="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleInputBlur}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <hr className="my-4 sm:my-6 border-gray-200" />

        <div className="space-y-4">
          <div>
            <label className="block text-base sm:text-base font-medium text-gray-700">Additional Information (Optional)</label>
            <p className="text-xs sm:text-sm text-gray-500">Leave empty if you don't have additional information</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Mobile Number</label>
            <PhoneInput
              country="in"
              value={formData.secondaryMobileNumber}
              onChange={(value) => handlePhoneChange(value, "secondaryMobileNumber")}
            onBlur={handleInputBlurPhone}
              inputClass="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              containerClass="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Email Address</label>
            <input
              type="email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleChange}
              onBlur={handleInputBlur}
              placeholder="eg: email@gmail.com"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Landline Number</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="landlineStd"
                value={formData.landlineStd}
                onChange={handleChange}
                onBlur={handleInputBlur}
                placeholder="STD code"
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                onBlur={handleInputBlur}
                placeholder="Enter your landline telephone number"
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    )}
  </div>
  )
}

export default ContactDetail

