import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import VideoAnalysis from "@/components/VideoAnalysis";
import RouteAssistant from "@/components/RouteAssistant";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"detection" | "routing">("detection");
  const [detectionData, setDetectionData] = useState({
    accidentDetected: false,
    trafficLevel: "moderate" as "high" | "moderate" | "low",
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDetectionUpdate = (results: any) => {
    setDetectionData({
      accidentDetected: results.accident > 70,
      trafficLevel: results.traffic > 75 ? "high" : results.traffic > 40 ? "moderate" : "low",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFE951]">
      {/* Navbar */}
      <nav className="bg-[#FF0080] border-b-4 border-black p-4 shadow-[0_8px_0px_#000000]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Project K" className="w-12 h-12 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-3xl font-black text-white">PROJECT K</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-black text-white">{user?.email || "Guest"}</span>
            <Button
              onClick={handleSignOut}
              className="bg-black text-white border-4 border-white hover:bg-gray-800 font-black shadow-[4px_4px_0px_#000000]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-[#0080FF] border-b-4 border-black p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Button
            onClick={() => setActiveTab("detection")}
            className={`font-black text-lg border-4 border-black shadow-[4px_4px_0px_#000000] ${
              activeTab === "detection"
                ? "bg-[#00FF80] text-black"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            🎥 Live Detection
          </Button>
          <Button
            onClick={() => setActiveTab("routing")}
            className={`font-black text-lg border-4 border-black shadow-[4px_4px_0px_#000000] ${
              activeTab === "routing"
                ? "bg-[#00FF80] text-black"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            🗺 Route Assistant
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "detection" ? (
            <VideoAnalysis onDetectionUpdate={handleDetectionUpdate} />
          ) : (
            <RouteAssistant
              accidentDetected={detectionData.accidentDetected}
              trafficLevel={detectionData.trafficLevel}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
