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
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
            <span className="font-bold text-xl text-gray-900">PROJECT K</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              onClick={() => handleNavigation(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-lg cursor-pointer"
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
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
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              AI Traffic Intelligence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
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
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">1.7L+</div>
                <div className="text-sm text-gray-600">Lives Lost Annually</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">2 sec</div>
                <div className="text-sm text-gray-600">Detection Time</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">13L+</div>
                <div className="text-sm text-gray-600">Cameras Connected</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">90%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                onClick={() => handleNavigation(isAuthenticated ? "/dashboard" : "/auth")}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-6 text-lg rounded-lg cursor-pointer"
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
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-8 rounded-2xl">
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
                    className="bg-white border border-gray-200 p-6 text-center rounded-lg"
                  >
                    <div className="text-5xl mb-2">{item.emoji}</div>
                    <div className="font-semibold text-gray-900">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
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
                  className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.label}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Ready to Transform Traffic Safety?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 mb-8"
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
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-6 px-12 text-lg rounded-lg cursor-pointer"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            See It In Action
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-gray-200 p-8 rounded-2xl"
          >
            <video
              className="w-full h-auto rounded-lg"
              controls
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            >
              <source 
                src="https://drive.google.com/uc?export=download&id=18QpiCSsN_aEgGj8Pesf-zN3GICQcU_G-" 
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
            <p className="text-lg text-gray-600 mb-6">
              Watch how Project K detects accidents, congestion, potholes, and flooding in real-time.
            </p>
            <a
              href="https://drive.google.com/uc?export=download&id=18QpiCSsN_aEgGj8Pesf-zN3GICQcU_G-"
              download
              className="inline-block"
            >
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-6 px-8 text-lg rounded-lg cursor-pointer"
              >
                📥 Download Sample Video
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 Project K. Powered by AI Traffic Intelligence.</p>
        </div>
      </footer>
    </div>
  );
}