import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "@/stores/store";
import { ArrowRight, CheckCircle, MessageCircle, PlayCircle, Shield, CircleDashed, UserPlus, AlertCircle, ArrowLeft } from 'lucide-react';
import Sliderbar from "@/Layout/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Main() {
  const selectIsUserLoggedIn = (state: RootState) => state.user.user !== null;
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const selectUserName = (state: RootState) => state.user.user?.name;
  const userName = useSelector(selectUserName);
  const [panDetail, setPanDetails] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://i.ibb.co/QKSJMyp/itrdemo.png",
    "https://img.freepik.com/premium-vector/tax-preparation-social-media-design-income-tax-return-service-social-media-banner-template_600957-335.jpg",
    "https://img.freepik.com/premium-vector/tax-preparation-social-media-design-income-tax-return-service-social-media-banner-template_600957-334.jpg"
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [sessionYear, setSessionYear] = useState("");

  useEffect(() => {
    const calculateSessionYear = () => {
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      setSessionYear(`AY ${currentYear} - ${nextYear}`);
    };

    calculateSessionYear();

    const fetchContactDetail = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/fillDetail/getContactDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setPanDetails(data.panNumber);
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    if (isUserLoggedIn) {
      fetchContactDetail();
    }
  }, [isUserLoggedIn]);

  return (
    <div className="min-h-screen font-poppins bg-gray-100">
      <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 flex-grow">
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          {panDetail && (
            <div>
            <span className="font-medium">PAN:</span> {panDetail}
            </div>
          )}
          <div>
            <span className="font-medium">Filing Status:</span> {sessionYear} (current)
          </div>
          </div>

          <div className="mb-6">
          <p className="text-gray-600 mb-2 text-xl">Hi {userName}, it&apos;s a good day today to complete e-filing 😊</p>
          <h2 className="text-2xl font-semibold text-gray-900">Choose your filing method</h2>
          <p className="text-gray-500 mt-2">We recommend our new Smart Filing for faster, more accurate results</p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <CircleDashed className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">Link PAN & Pre-fill</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <CircleDashed className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">Add your Details</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
            <span className="text-sm font-medium">File ITR</span>
          </div>
          </div>

          <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-gray-600">Know more about steps</span>
          <ArrowRight className="w-4 h-4 text-blue-500" />
          </div>

          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >

          {/* Smart Filing Option - Primary Recommendation */}
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                ⭐ RECOMMENDED
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                NEW
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🚀 Smart Filing</h3>
            <p className="text-gray-600 mb-4">
              AI-powered filing with document auto-fill, real-time tax calculation, and 20 minutes average completion time.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Auto PAN verification</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Form 16 OCR scanning</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time tax preview</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>ITR type recommendation</span>
              </div>
            </div>
            <Link to="/fileITR/smart-flow/assessment" className="block">
              <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Smart Filing (Recommended)
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>

          {/* Traditional Filing Options */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Or continue with traditional filing</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link to="/fileITR/addPanCardDetail" className="flex-1">
                <button className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Complete Your E-Filing
                </button>
              </Link>
              <Link to="/fileITR/addPanCardDetail" className="flex-1">
                <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Manual Filing
                </button>
              </Link>
              <Link to="/fileITR/addPanCardDetail" className="flex-1">
                <button className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out">
                  <UserPlus className="w-4 h-4 mr-2" />
                  File for Family/Friend
                </button>
              </Link>
            </div>
          </div>
          </motion.div>

          <div className="flex items-center mt-5 gap-2">
          <Shield className="w-5 h-5" />
          <span className="text-xs">Burnblack is a Govt. authorized ERI license holder. Your data is 100% secure with Burnblack.</span>
          </div>
        </div>
        </div>

        <div className="flex flex-col">
        <div className="flex-grow">
          <div className="flex items-center gap-8 ">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between">
            <button className="p-2 bg-gray-200 rounded-full ml-2" onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}>
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-200 rounded-full mr-2" onClick={() => setCurrentImage((currentImage + 1) % images.length)}>
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
            </div>
            <img src={images[currentImage]} alt="slider image" className="w-full h-full object-cover rounded-2xl" />
          </div>
          </div>
        </div>
        </div>
      </div>
      </main>
      <Sliderbar />
    </div>
  );
}

export default Main;
