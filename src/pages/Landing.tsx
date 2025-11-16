import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Zap, Shield, Gauge, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: Zap, label: "Lightning Fast", desc: "2-second detection" },
    { icon: Shield, label: "AI Powered", desc: "90% accuracy" },
    { icon: Gauge, label: "Real-time", desc: "Live monitoring" },
    { icon: AlertCircle, label: "Smart Alerts", desc: "Instant notifications" },
  ];

  const handleNavigation = (path: string) => {
    toast.success("Navigating to " + (path === "/dashboard" ? "Dashboard" : "Get Started"));
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d0000] to-[#000000] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#CC0000] rounded-full opacity-15 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF3333] rounded-full opacity-15 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b-2 border-[#FF0000]/30 bg-black/40 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                toast.info("Welcome to Project K!");
                navigate("/");
              }}
            >
              <img src="/logo.svg" alt="Project K" className="w-10 h-10" />
              <span className="font-black text-2xl text-white">PROJECT K</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                onClick={() => handleNavigation(isAuthenticated ? "/dashboard" : "/auth")}
                className="bg-[#FF0000]/80 text-white border-2 border-[#FF0000]/50 hover:bg-[#CC0000] font-black backdrop-blur-md shadow-lg cursor-pointer"
              >
                {isAuthenticated ? "Dashboard" : "Get Started"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              >
                AI Traffic Intelligence
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-bold text-white/80 mb-8"
              >
                Real-time detection of accidents, congestion, potholes, and flooding. Save lives with intelligent routing.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <div className="bg-[#FF0000]/20 border-2 border-[#FF0000]/40 p-4 backdrop-blur-md rounded-lg shadow-lg">
                  <div className="font-black text-3xl text-white">1.7L+</div>
                  <div className="font-bold text-sm text-white/70">Lives Lost Annually</div>
                </div>
                <div className="bg-[#FF0000]/15 border-2 border-[#FF0000]/30 p-4 backdrop-blur-md rounded-lg shadow-lg">
                  <div className="font-black text-3xl text-white">2 sec</div>
                  <div className="font-bold text-sm text-white/70">Detection Time</div>
                </div>
                <div className="bg-[#FF0000]/25 border-2 border-[#FF0000]/50 p-4 backdrop-blur-md rounded-lg shadow-lg">
                  <div className="font-black text-3xl text-white">13L+</div>
                  <div className="font-bold text-sm text-white/70">Cameras Connected</div>
                </div>
                <div className="bg-[#FF0000]/10 border-2 border-[#FF0000]/25 p-4 backdrop-blur-md rounded-lg shadow-lg">
                  <div className="font-black text-3xl text-white">90%</div>
                  <div className="font-bold text-sm text-white/70">Cost Reduction</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={() => handleNavigation(isAuthenticated ? "/dashboard" : "/auth")}
                  className="w-full bg-[#FF0000] text-white border-4 border-[#FF0000] hover:bg-[#CC0000] font-black py-8 text-lg shadow-[6px_6px_0px_#FF0000] cursor-pointer"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Start Now"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#CC0000] to-[#FF3333] border-4 border-[#FF0000] p-8 shadow-[12px_12px_0px_#FF0000]">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: "🚨", label: "Accidents" },
                    { emoji: "🚑", label: "Ambulance" },
                    { emoji: "🌊", label: "Flooding" },
                    { emoji: "🕳", label: "Potholes" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                      className="bg-white border-3 border-black p-6 text-center shadow-[4px_4px_0px_#000000]"
                    >
                      <div className="text-5xl mb-2">{item.emoji}</div>
                      <div className="font-black text-black">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-black/40 border-t-2 border-[#FF0000]/30 py-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black text-white mb-12 text-center"
            >
              Why Project K?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                    className="bg-[#FF0000]/20 border-2 border-[#FF0000]/40 p-6 backdrop-blur-md rounded-lg shadow-lg hover:bg-[#FF0000]/30 transition-all"
                  >
                    <Icon className="w-12 h-12 text-white mb-4" />
                    <h3 className="font-black text-lg text-white mb-2">{feature.label}</h3>
                    <p className="font-bold text-sm text-white/70">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#FF0000]/30 to-[#CC0000]/20 border-t-2 border-[#FF0000]/30 py-20 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black text-white mb-6"
            >
              Ready to Transform Traffic Safety?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl font-bold text-white/90 mb-8"
            >
              Join thousands using AI-powered traffic intelligence to save lives and optimize routes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={() => handleNavigation(isAuthenticated ? "/dashboard" : "/auth")}
                className="bg-[#FF0000]/80 text-white border-2 border-[#FF0000]/50 hover:bg-[#CC0000] font-black py-8 px-12 text-lg backdrop-blur-md shadow-lg cursor-pointer"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Video Player Section */}
        <section className="bg-black/40 border-t-2 border-[#FF0000]/30 py-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black text-white mb-12 text-center"
            >
              See It In Action
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/40 border-2 border-[#FF0000]/40 p-8 backdrop-blur-lg rounded-2xl shadow-2xl"
            >
              <video
                className="w-full h-auto border-2 border-[#FF0000]/50 rounded-lg"
                controls
                autoPlay
                loop
                muted
                playsInline
                crossOrigin="anonymous"
              >
                <source 
                  src="https://drive.google.com/uc?export=download&id=1wWjZR9arSHFfEGt-tABjkKxa2apwr0E1" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-8"
            >
              <p className="text-xl font-bold text-white/80 mb-6">
                Watch how Project K detects accidents, congestion, potholes, and flooding in real-time.
              </p>
              <a
                href="https://drive.google.com/uc?export=download&id=1wWjZR9arSHFfEGt-tABjkKxa2apwr0E1"
                download
                className="inline-block"
              >
                <Button
                  className="bg-[#FF0000]/80 text-white border-2 border-[#FF0000]/50 hover:bg-[#CC0000] font-black py-6 px-8 text-lg backdrop-blur-md shadow-lg cursor-pointer"
                >
                  📥 Download Sample Video
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 border-t-2 border-[#FF0000]/30 py-8 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-bold text-white/70">© 2024 Project K. Powered by AI Traffic Intelligence.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}