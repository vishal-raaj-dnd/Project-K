import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Zap, Shield, Gauge, AlertCircle } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: Zap, label: "Lightning Fast", desc: "2-second detection" },
    { icon: Shield, label: "AI Powered", desc: "90% accuracy" },
    { icon: Gauge, label: "Real-time", desc: "Live monitoring" },
    { icon: AlertCircle, label: "Smart Alerts", desc: "Instant notifications" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE951] via-[#FF0080] to-[#0080FF] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#00FF80] rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0099FF] rounded-full opacity-20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b-4 border-black bg-white/80 backdrop-blur-sm shadow-[0_8px_0px_#000000]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src="/logo.svg" alt="Project K" className="w-10 h-10" />
              <span className="font-black text-2xl text-black">PROJECT K</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                className="bg-[#FF0080] text-white border-3 border-black hover:bg-[#FF006E] font-black shadow-[4px_4px_0px_#000000]"
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
                className="text-6xl lg:text-7xl font-black text-black mb-6 leading-tight"
              >
                AI Traffic Intelligence
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-bold text-black/80 mb-8"
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
                <div className="bg-[#FFE951] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  <div className="font-black text-3xl text-black">1.7L+</div>
                  <div className="font-bold text-sm text-black/70">Lives Lost Annually</div>
                </div>
                <div className="bg-[#0080FF] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  <div className="font-black text-3xl text-white">2 sec</div>
                  <div className="font-bold text-sm text-white/70">Detection Time</div>
                </div>
                <div className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  <div className="font-black text-3xl text-black">13L+</div>
                  <div className="font-bold text-sm text-black/70">Cameras Connected</div>
                </div>
                <div className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
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
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                  className="w-full bg-black text-white border-4 border-black hover:bg-gray-800 font-black py-8 text-lg shadow-[6px_6px_0px_#000000]"
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
              <div className="bg-gradient-to-br from-[#0080FF] to-[#00FF80] border-4 border-black p-8 shadow-[12px_12px_0px_#000000]">
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
        <section className="bg-black border-t-4 border-black py-20">
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
                    className="bg-[#FFE951] border-4 border-black p-6 shadow-[6px_6px_0px_#000000]"
                  >
                    <Icon className="w-12 h-12 text-black mb-4" />
                    <h3 className="font-black text-lg text-black mb-2">{feature.label}</h3>
                    <p className="font-bold text-sm text-black/70">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#FF0080] to-[#0080FF] border-t-4 border-black py-20">
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
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                className="bg-white text-black border-4 border-black hover:bg-gray-100 font-black py-8 px-12 text-lg shadow-[6px_6px_0px_#000000]"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t-4 border-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-bold text-white/70">© 2024 Project K. Powered by AI Traffic Intelligence.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}