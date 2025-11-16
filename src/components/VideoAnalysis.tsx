import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as tmImage from '@teachablemachine/image';

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
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
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

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = "https://teachablemachine.withgoogle.com/models/KINDW01t3/model.json";
        const metadataURL = "https://teachablemachine.withgoogle.com/models/KINDW01t3/metadata.json";
        
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <Card className="lg:col-span-2 p-6 bg-[#FFE951] border-4 border-black shadow-[8px_8px_0px_#000000]">
          <h3 className="text-2xl font-black mb-4 text-black">🎥 Live Traffic Analysis</h3>
          <div className="relative bg-black border-4 border-black rounded-none overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            >
              Your browser does not support the video tag.
            </video>
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute top-4 right-4 bg-[#00FF80] border-3 border-black px-3 py-1 font-black text-black">
              FPS: 1
            </div>
            <div className="absolute bottom-4 left-4 bg-[#FF0080] border-3 border-black px-3 py-1 font-black text-white">
              {isModelLoaded ? "✅ ANALYZING..." : "⏳ LOADING MODEL..."}
            </div>
          </div>
        </Card>

        {/* Detection Results */}
        <Card className="p-6 bg-[#0080FF] border-4 border-black shadow-[8px_8px_0px_#000000]">
          <h3 className="text-2xl font-black mb-4 text-white">📊 AI Detection Results</h3>
          
          <div className="space-y-4">
            <DetectionBar label="🚗 Traffic" value={detections.traffic} color="#00D4FF" />
            <DetectionBar label="🚑 Ambulance" value={detections.ambulance} color="#FF006E" />
            <DetectionBar label="🚨 Accident" value={detections.accident} color="#FFA500" />
            <DetectionBar label="🌊 Flooded Routes" value={detections.flooded} color="#0099FF" />
            <DetectionBar label="🕳 Pothole" value={detections.pothole} color="#A0522D" />
            <DetectionBar label="✅ Normal Road" value={detections.normal} color="#00FF88" />
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="bg-white border-3 border-black p-2 font-bold text-black">
              Model Status: {isModelLoaded ? "✅ ML Model Loaded" : "⏳ Loading..."}
            </div>
            <div className="bg-white border-3 border-black p-2 font-bold text-black">
              Inference Time: {inferenceTime}ms
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="p-6 bg-[#FF0080] border-4 border-black shadow-[8px_8px_0px_#000000]">
        <h3 className="text-2xl font-black mb-4 text-white">📢 Real-Time Alerts & Control Center</h3>
        
        {alerts.length > 0 && (
          <div className="space-y-2 mb-4">
            {alerts.slice(0, 3).map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-[#FFE951] border-4 border-black p-4 font-black text-black shadow-[4px_4px_0px_#000000]"
              >
                {alert}
                <div className="flex gap-2 mt-2">
                  <Button className="bg-black text-white border-3 border-black hover:bg-gray-800 font-black">
                    Manual Review
                  </Button>
                  {alert.includes("ACCIDENT") || alert.includes("AMBULANCE") ? (
                    <Button className="bg-[#00FF80] text-black border-3 border-black hover:bg-green-400 font-black">
                      Deploy Ambulance
                    </Button>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-black border-4 border-white p-4 max-h-48 overflow-y-auto">
          <div className="space-y-1 font-mono text-sm text-[#00FF80]">
            {alerts.length === 0 ? (
              <div className="text-white">No alerts detected. System monitoring...</div>
            ) : (
              alerts.map((alert, idx) => (
                <div key={idx} className="text-white">
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
        <span className="font-black text-white text-sm">{label}</span>
        <span className="font-black text-white text-sm">{value}%</span>
      </div>
      <div className="h-6 bg-white border-3 border-black relative overflow-hidden">
        <motion.div
          className="h-full border-r-3 border-black"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}