import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface RouteAssistantProps {
  accidentDetected?: boolean;
  trafficLevel?: "high" | "moderate" | "low";
}

export default function RouteAssistant({ accidentDetected, trafficLevel }: RouteAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "👋 Hello! I'm your AI routing assistant. Where would you like to go today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [destination, setDestination] = useState("Destination");
  const [routes, setRoutes] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Extract destination from message
    const dest = extractDestination(userMessage);
    setDestination(dest);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateAIResponse(userMessage, dest, accidentDetected, trafficLevel);
    
    // Type out response
    setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
    setIsTyping(false);

    // Generate routes
    generateRoutes(dest, accidentDetected, trafficLevel);
    
    toast.success("Routes updated!");
  };

  const extractDestination = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("hospital")) return "Central Hospital";
    if (lowerMsg.includes("airport")) return "Airport";
    if (lowerMsg.includes("office") || lowerMsg.includes("work")) return "Tech Park Office";
    if (lowerMsg.includes("home")) return "Home";
    if (lowerMsg.includes("mall") || lowerMsg.includes("shopping")) return "City Mall";
    if (lowerMsg.includes("station") || lowerMsg.includes("railway")) return "Railway Station";
    return "Destination";
  };

  const generateAIResponse = (message: string, dest: string, accident?: boolean, traffic?: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("avoid") && lowerMsg.includes("traffic")) {
      return `Checking real-time traffic density from our cameras... ${traffic === "high" ? "High traffic detected on Highway 1 (78% congestion). I've rerouted you through Bypass Road which is currently clear." : "Traffic is moderate. I've found an optimal route for you."}`;
    }
    
    if (lowerMsg.includes("pothole")) {
      return `Understood! I'm analyzing road conditions from our pothole detection model... I found a safe route with zero potholes detected. It adds 4 minutes but ensures a smooth ride.`;
    }
    
    if (accident) {
      return `Great! Let me find the best route to ${dest}. ⚠️ Warning: Accident detected on MG Road. I've crafted 3 personalized routes for you. Route 2 is recommended - it avoids the accident zone.`;
    }
    
    return `Perfect! Let me find the best route to ${dest}. Analyzing real-time traffic data from our 13+ lakh cameras... I've crafted 3 personalized routes for you based on current conditions.`;
  };

  const generateRoutes = (dest: string, accident?: boolean, traffic?: string) => {
    const baseRoutes = [
      {
        id: 1,
        name: "Route 1 - Fastest",
        time: "28 min",
        distance: "15.3 km",
        traffic: traffic === "high" ? "High 🔴" : "Moderate 🟡",
        accidents: accident ? 1 : 0,
        potholes: 3,
        cost: "₹85",
        color: "#FF0080",
      },
      {
        id: 2,
        name: "Route 2 - Balanced",
        time: "32 min",
        distance: "18.2 km",
        traffic: "Moderate 🟡",
        accidents: 0,
        potholes: 1,
        cost: "₹95",
        color: "#00D4FF",
        recommended: true,
      },
      {
        id: 3,
        name: "Route 3 - Safest",
        time: "36 min",
        distance: "16.8 km",
        traffic: "Low 🟢",
        accidents: 0,
        potholes: 0,
        cost: "₹88",
        color: "#00FF88",
      },
    ];
    
    setRoutes(baseRoutes);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
      {/* Chatbot */}
      <Card className="lg:col-span-2 p-6 bg-[#FFE951] border-4 border-black shadow-[8px_8px_0px_#000000] flex flex-col">
        <h3 className="text-2xl font-black mb-4 text-black">💬 AI Routing Assistant</h3>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-white border-4 border-black p-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 bg-[#0080FF] border-3 border-black flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-3 border-3 border-black font-bold shadow-[4px_4px_0px_#000000] ${
                  msg.role === "user" ? "bg-[#FF0080] text-white" : "bg-white text-black"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-[#00FF80] border-3 border-black flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-black" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#0080FF] border-3 border-black flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border-3 border-black p-3 font-bold">
                AI is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Where do you want to go?"
            className="flex-1 border-4 border-black font-bold bg-white focus:ring-0 focus:border-black"
          />
          <Button
            onClick={handleSend}
            className="bg-[#0080FF] text-white border-4 border-black hover:bg-blue-600 font-black shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000]"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {/* Map & Routes */}
      <Card className="lg:col-span-3 p-6 bg-[#0080FF] border-4 border-black shadow-[8px_8px_0px_#000000]">
        <h3 className="text-2xl font-black mb-4 text-white">🗺 Personalized Route Map</h3>
        
        {/* Map Placeholder */}
        <div className="bg-white border-4 border-black h-96 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <div className="font-black text-2xl text-black mb-2">{destination}</div>
              <div className="font-bold text-black">Interactive map with routes</div>
              {accidentDetected && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mt-4 bg-[#FF0080] border-4 border-black p-3 inline-block font-black text-white"
                >
                  🚨 ACCIDENT DETECTED
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Route Comparison */}
        {routes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black bg-white">
              <thead>
                <tr className="bg-[#FFE951] border-b-4 border-black">
                  <th className="p-3 text-left font-black border-r-4 border-black">Metric</th>
                  {routes.map(route => (
                    <th key={route.id} className="p-3 text-center font-black border-r-4 border-black last:border-r-0">
                      {route.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-bold">
                <tr className="border-b-4 border-black">
                  <td className="p-3 border-r-4 border-black">Time</td>
                  {routes.map(route => (
                    <td key={route.id} className="p-3 text-center border-r-4 border-black last:border-r-0">{route.time}</td>
                  ))}
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="p-3 border-r-4 border-black">Distance</td>
                  {routes.map(route => (
                    <td key={route.id} className="p-3 text-center border-r-4 border-black last:border-r-0">{route.distance}</td>
                  ))}
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="p-3 border-r-4 border-black">Traffic</td>
                  {routes.map(route => (
                    <td key={route.id} className="p-3 text-center border-r-4 border-black last:border-r-0">{route.traffic}</td>
                  ))}
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="p-3 border-r-4 border-black">Accidents</td>
                  {routes.map(route => (
                    <td key={route.id} className="p-3 text-center border-r-4 border-black last:border-r-0">
                      {route.accidents > 0 ? `${route.accidents} ⚠` : "0 ✅"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 border-r-4 border-black">Cost</td>
                  {routes.map(route => (
                    <td key={route.id} className="p-3 text-center border-r-4 border-black last:border-r-0">{route.cost}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
