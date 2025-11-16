import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as tmImage from '@teachablemachine/image';
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface DetectionResults {
  traffic: number;
  ambulance: number;
  accident: number;
  flooded: number;
  pothole: number;
  normal: number;
}

interface VideoAnalysisProps {
  onDetectionUpdate?: (results: DetectionResults, markers?: any[]) => void;
}

export default function VideoAnalysis({ onDetectionUpdate }: VideoAnalysisProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [detections, setDetections] = useState<DetectionResults>({
    traffic: 0,
    ambulance: 0,
    accident: 0,
    flooded: 0,
    pothole: 0,
    normal: 0,
  });
  const [inferenceTime, setInferenceTime] = useState(0);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [reviewedAlerts, setReviewedAlerts] = useState<Set<number>>(new Set());
  const [deployedAlerts, setDeployedAlerts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = "https://teachablemachine.withgoogle.com/models/iGwlA0SUe/model.json";
        const metadataURL = "https://teachablemachine.withgoogle.com/models/iGwlA0SUe/metadata.json";
        
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const analyzeFrame = async () => {
      if (video.paused || video.ended || !video.videoWidth) return;

      const startTime = performance.now();
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0);

      try {
        const predictions = await model.predict(canvas);
        const endTime = performance.now();
        setInferenceTime(Math.round(endTime - startTime));

        const newDetections: DetectionResults = {
          traffic: 0,
          ambulance: 0,
          accident: 0,
          flooded: 0,
          pothole: 0,
          normal: 0,
        };

        predictions.forEach((pred) => {
          const className = pred.className.toLowerCase();
          const probability = Math.round(pred.probability * 100);
          
          if (className.includes("traffic")) newDetections.traffic = probability;
          else if (className.includes("ambulance")) newDetections.ambulance = probability;
          else if (className.includes("accident")) newDetections.accident = probability;
          else if (className.includes("flood")) newDetections.flooded = probability;
          else if (className.includes("pothole")) newDetections.pothole = probability;
          else if (className.includes("normal")) newDetections.normal = probability;
        });

        setDetections(newDetections);
        
        // Generate markers for map
        const newMarkers: any[] = [];
        const detectionTypes = [
          { key: 'accident', type: 'Accident', color: '#FFA500', lat: 28.6139 + Math.random() * 0.1, lng: 77.2090 + Math.random() * 0.1 },
          { key: 'ambulance', type: 'Ambulance', color: '#FF006E', lat: 28.6139 + Math.random() * 0.1, lng: 77.2090 + Math.random() * 0.1 },
          { key: 'flooded', type: 'Flooding', color: '#0099FF', lat: 28.6139 + Math.random() * 0.1, lng: 77.2090 + Math.random() * 0.1 },
          { key: 'pothole', type: 'Pothole', color: '#A0522D', lat: 28.6139 + Math.random() * 0.1, lng: 77.2090 + Math.random() * 0.1 },
          { key: 'traffic', type: 'Traffic', color: '#00D4FF', lat: 28.6139 + Math.random() * 0.1, lng: 77.2090 + Math.random() * 0.1 },
        ];

        detectionTypes.forEach(detection => {
          const confidence = newDetections[detection.key as keyof DetectionResults];
          if (confidence > 50) {
            newMarkers.push({
              id: `${detection.key}-${Date.now()}`,
              type: detection.type,
              confidence,
              lat: detection.lat,
              lng: detection.lng,
              timestamp: Date.now(),
              color: detection.color,
            });
          }
        });

        onDetectionUpdate?.(newDetections, newMarkers);

        // Generate alerts
        const newAlerts: string[] = [];
        if (newDetections.accident > 70) {
          newAlerts.push(`🚨 ACCIDENT DETECTED! Confidence: ${newDetections.accident}%`);
        }
        if (newDetections.ambulance > 70) {
          newAlerts.push(`🚑 AMBULANCE DETECTED! Confidence: ${newDetections.ambulance}%`);
        }
        if (newDetections.flooded > 60) {
          newAlerts.push(`🌊 FLOODING DETECTED! Confidence: ${newDetections.flooded}%`);
        }
        if (newDetections.pothole > 60) {
          newAlerts.push(`🕳 POTHOLE DETECTED! Confidence: ${newDetections.pothole}%`);
        }
        
        if (newAlerts.length > 0) {
          setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
        }
      } catch (error) {
        console.error("Prediction error:", error);
      }
    };

    const interval = setInterval(analyzeFrame, 1000);
    return () => clearInterval(interval);
  }, [model, onDetectionUpdate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error("Please upload a video file");
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    
    toast.success("Video uploaded successfully!");
    
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(err => {
          console.log("Autoplay prevented:", err);
        });
      }
    }, 100);
  };

  const handleManualReview = (alert: string, index: number) => {
    setReviewedAlerts(prev => new Set(prev).add(index));
    setDeployedAlerts(prev => new Set(prev).add(index));
    toast.info("Manual Review Initiated", {
      description: `Reviewing: ${alert}`,
    });
  };

  const handleDeployAmbulance = (alert: string, index: number) => {
    setReviewedAlerts(prev => new Set(prev).add(index));
    setDeployedAlerts(prev => new Set(prev).add(index));
    toast.success("Emergency Response Dispatched", {
      description: "Ambulance has been notified and is en route to the location.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <Card className="lg:col-span-2 p-6 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">🎥 Live Traffic Analysis</h3>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 hover:from-green-500 hover:to-emerald-600 font-semibold rounded-full shadow-lg cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your Video
                </Button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1wWjZR9arSHFfEGt-tABjkKxa2apwr0E1"
                  download
                  className="inline-block"
                >
                  <Button
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0 hover:from-blue-500 hover:to-cyan-600 font-semibold rounded-full shadow-lg cursor-pointer"
                  >
                    📥 Download Sample
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              src={videoUrl || undefined}
              onError={(e) => console.error("Video load error:", e)}
              onLoadedData={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(err => {
                    console.log("Autoplay prevented:", err);
                  });
                }
              }}
            >
              {!videoUrl && (
                <source src="https://drive.google.com/uc?export=download&id=1wWjZR9arSHFfEGt-tABjkKxa2apwr0E1" type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 border-0 px-3 py-1 font-semibold text-white rounded-full shadow-lg">
              FPS: 1
            </div>
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 border-0 px-3 py-1 font-semibold text-white rounded-full shadow-lg">
              {isModelLoaded ? "✅ ANALYZING..." : "⏳ LOADING MODEL..."}
            </div>
          </div>
        </Card>

        {/* Detection Results */}
        <Card className="p-6 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">📊 AI Detection Results</h3>
          
          <div className="space-y-4">
            <DetectionBar label="🚗 Traffic" value={detections.traffic} color="from-cyan-400 to-blue-500" />
            <DetectionBar label="🚑 Ambulance" value={detections.ambulance} color="from-pink-400 to-rose-500" />
            <DetectionBar label="🚨 Accident" value={detections.accident} color="from-orange-400 to-red-500" />
            <DetectionBar label="🌊 Flooded Routes" value={detections.flooded} color="from-blue-400 to-cyan-500" />
            <DetectionBar label="🕳 Pothole" value={detections.pothole} color="from-amber-400 to-orange-500" />
            <DetectionBar label="✅ Normal Road" value={detections.normal} color="from-green-400 to-emerald-500" />
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="bg-white/50 backdrop-blur border border-white/30 p-2 font-semibold text-gray-700 rounded-lg">
              Model Status: {isModelLoaded ? "✅ ML Model Loaded" : "⏳ Loading..."}
            </div>
            <div className="bg-white/50 backdrop-blur border border-white/30 p-2 font-semibold text-gray-700 rounded-lg">
              Inference Time: {inferenceTime}ms
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="p-6 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">📢 Real-Time Alerts & Control Center</h3>
        
        {alerts.length > 0 && (
          <div className="space-y-2 mb-4">
            {alerts.slice(0, 3).map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-gradient-to-r from-yellow-100 to-amber-100 border border-white/50 p-4 font-semibold text-gray-800 rounded-2xl shadow-lg backdrop-blur"
              >
                {alert}
                <div className="flex gap-2 mt-2">
                  {reviewedAlerts.has(idx) || deployedAlerts.has(idx) ? (
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-4 py-2 font-semibold flex items-center justify-center rounded-full">
                      ✓
                    </div>
                  ) : (
                    <>
                      <Button 
                        onClick={() => handleManualReview(alert, idx)}
                        className="bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0 hover:from-gray-700 hover:to-gray-800 font-semibold rounded-full cursor-pointer"
                      >
                        Manual Review
                      </Button>
                      {(alert.includes("ACCIDENT") || alert.includes("AMBULANCE")) && (
                        <Button 
                          onClick={() => handleDeployAmbulance(alert, idx)}
                          className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 hover:from-green-500 hover:to-emerald-600 font-semibold rounded-full cursor-pointer"
                        >
                          Deploy Ambulance
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 p-4 max-h-48 overflow-y-auto rounded-2xl">
          <div className="space-y-1 font-mono text-sm text-green-400">
            {alerts.length === 0 ? (
              <div className="text-gray-300">No alerts detected. System monitoring...</div>
            ) : (
              alerts.map((alert, idx) => (
                <div key={idx} className="text-gray-200">
                  {new Date().toLocaleTimeString()} - {alert}
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function DetectionBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-gray-700 text-sm">{label}</span>
        <span className="font-semibold text-gray-700 text-sm">{value}%</span>
      </div>
      <div className={`h-6 bg-white/30 backdrop-blur border border-white/30 relative overflow-hidden rounded-full`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}