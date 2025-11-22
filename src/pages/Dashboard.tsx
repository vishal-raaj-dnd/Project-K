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
  const [mapEvents, setMapEvents] = useState<Array<{
    id: string;
    type: string;
    confidence: number;
    lat: number;
    lng: number;
    timestamp: number;
    color: string;
  }>>([]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDetectionUpdate = (results: any) => {
    setDetectionData({
      accidentDetected: results.accident > 70,
      trafficLevel: results.traffic > 75 ? "high" : results.traffic > 40 ? "moderate" : "low",
    });

    // Generate random coordinates for demo purposes
    const detectionTypes = [
      { key: "accident", threshold: 70, color: "#FF0080", label: "🚨 Accident" },
      { key: "ambulance", threshold: 70, color: "#FF006E", label: "🚑 Ambulance" },
      { key: "flooded", threshold: 60, color: "#0099FF", label: "🌊 Flooded" },
      { key: "pothole", threshold: 60, color: "#A0522D", label: "🕳 Pothole" },
      { key: "traffic", threshold: 75, color: "#00D4FF", label: "🚗 Traffic" },
    ];

    const newEvents: typeof mapEvents = [];
    detectionTypes.forEach(({ key, threshold, color, label }) => {
      if (results[key] > threshold) {
        // Generate random coordinates within India bounds (demo)
        const lat = 28.5 + Math.random() * 2;
        const lng = 77 + Math.random() * 2;
        newEvents.push({
          id: `${key}-${Date.now()}`,
          type: label,
          confidence: results[key],
          lat,
          lng,
          timestamp: Date.now(),
          color,
        });
      }
    });

    if (newEvents.length > 0) {
      setMapEvents(prev => [...newEvents, ...prev].slice(0, 20));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Spline */}
      <div className="fixed inset-0 z-[-1]">
        <iframe 
          src='https://my.spline.design/motiontrails-Od0YCyth9OhoYVhy5dxutkuD/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          title="3D Motion Trails Background"
        ></iframe>
      </div>
      
      {/* Overlay for readability */}
      <div className="fixed inset-0 z-[-1] bg-white/10 backdrop-blur-[2px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="bg-white/60 backdrop-blur-xl border-b border-white/30 p-4 shadow-lg rounded-b-3xl mx-4 mt-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Project K" className="w-12 h-12 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">PROJECT K</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-800 bg-white/50 px-3 py-1 rounded-full border border-white/30">{user?.email || "Guest"}</span>
            <Button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 font-semibold rounded-full shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white/40 backdrop-blur-lg border-b border-white/30 p-4 rounded-b-2xl mx-4 mb-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Button
            onClick={() => setActiveTab("detection")}
            className={`font-semibold text-lg rounded-full transition-all ${
              activeTab === "detection"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                : "bg-white/50 text-gray-800 hover:bg-white/70 border border-white/50"
            }`}
          >
            🎥 Live Detection
          </Button>
          <Button
            onClick={() => setActiveTab("routing")}
            className={`font-semibold text-lg rounded-full transition-all ${
              activeTab === "routing"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                : "bg-white/50 text-gray-800 hover:bg-white/70 border border-white/50"
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
              mapEvents={mapEvents}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}