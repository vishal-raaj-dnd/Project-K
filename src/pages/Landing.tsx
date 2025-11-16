import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Heart, Zap, TrendingDown, DollarSign } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeDHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create animated geometric shapes
    const geometry1 = new THREE.IcosahedronGeometry(1.5, 4);
    const material1 = new THREE.MeshPhongMaterial({ color: 0xFF0080, wireframe: false });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(-3, 1, 0);
    scene.add(mesh1);

    const geometry2 = new THREE.OctahedronGeometry(1.2, 2);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x00FF80, wireframe: false });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(3, -1, 0);
    scene.add(mesh2);

    const geometry3 = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material3 = new THREE.MeshPhongMaterial({ color: 0x0080FF, wireframe: false });
    const mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.set(0, 0, -2);
    scene.add(mesh3);

    // Lighting
    const light1 = new THREE.PointLight(0xFF0080, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00FF80, 1, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mesh1.rotation.x += 0.005;
      mesh1.rotation.y += 0.008;
      mesh1.position.y += Math.sin(Date.now() * 0.001) * 0.01;

      mesh2.rotation.x -= 0.006;
      mesh2.rotation.z += 0.007;
      mesh2.position.y += Math.cos(Date.now() * 0.001) * 0.01;

      mesh3.rotation.z += 0.003;
      mesh3.rotation.x += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFE951]">
      {/* Navbar */}
      <nav className="bg-[#FF0080] border-b-4 border-black p-4 shadow-[0_8px_0px_#000000] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Project K" className="w-12 h-12" />
            <h1 className="text-3xl font-black text-white">PROJECT K</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#problem" className="font-black text-white hover:text-[#FFE951] transition-colors">Problem</a>
            <a href="#solution" className="font-black text-white hover:text-[#FFE951] transition-colors">Solution</a>
            <a href="#impact" className="font-black text-white hover:text-[#FFE951] transition-colors">Impact</a>
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-[#00FF80] text-black border-4 border-black hover:bg-green-400 font-black shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000]"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Custom 3D */}
      <section className="relative h-screen overflow-hidden border-b-4 border-black">
        <ThreeDHero />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 drop-shadow-[8px_8px_0px_#000000]">
              PROJECT K
            </h1>
            <p className="text-3xl md:text-4xl font-black text-[#00FF80] mb-8 drop-shadow-[4px_4px_0px_#000000]">
              Revolutionary AI-Powered Traffic Intelligence Platform
            </p>
            <Button
              onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#FF0080] text-white border-4 border-black hover:bg-pink-600 font-black text-xl px-8 py-6 shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000]"
            >
              Discover How It Works
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-[#0080FF] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-5xl font-black text-white mb-6 drop-shadow-[4px_4px_0px_#000000]">
                The Crisis on India's Roads
              </h2>
              <div className="space-y-4 text-xl font-bold text-white">
                <p className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  🚨 In India, traffic-related incidents claim over <span className="text-[#FFE951]">1.7 lakh lives</span> every year
                </p>
                <p className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  💰 Traffic accidents cost the economy <span className="text-[#FFE951]">₹45,000+ crores</span> annually
                </p>
                <p className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  ⏱️ Emergency response delays of <span className="text-[#FFE951]">15-30 minutes</span> worsen outcomes
                </p>
                <p className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  🚑 Ambulances stuck in traffic waste critical minutes - <span className="text-[#FFE951]">every minute costs lives</span>
                </p>
                <p className="bg-[#FF0080] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  ⚠️ Current traffic management is <span className="text-[#FFE951]">reactive, not predictive</span>
                </p>
                <p className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000] text-black">
                  ✅ <span className="text-[#FF0080]">15,000-30,000 lives</span> could be saved with better road intelligence
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-[#FFE951] border-4 border-black p-8 shadow-[8px_8px_0px_#000000]">
                <div className="text-center space-y-6">
                  <div className="text-8xl">🚨</div>
                  <div className="text-6xl font-black text-[#FF0080]">1.7L+</div>
                  <div className="text-2xl font-black text-black">Lives Lost Annually</div>
                  <div className="text-8xl">🚑</div>
                  <div className="text-6xl font-black text-[#FF0080]">15-30</div>
                  <div className="text-2xl font-black text-black">Minutes Delay</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-[#FFE951] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-[#0080FF] border-4 border-black p-8 shadow-[8px_8px_0px_#000000]">
                <div className="text-center space-y-4">
                  <div className="text-6xl">☁️</div>
                  <div className="text-3xl font-black text-white">Central AI Hub</div>
                  <div className="text-8xl">📹</div>
                  <div className="text-5xl font-black text-[#00FF80]">13L+</div>
                  <div className="text-2xl font-black text-white">Cameras Connected</div>
                  <div className="text-6xl">⚡</div>
                  <div className="text-5xl font-black text-[#FFE951]">2 sec</div>
                  <div className="text-2xl font-black text-white">Detection Time</div>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-5xl font-black text-black mb-6 drop-shadow-[4px_4px_0px_#FF0080]">
                What If There Was a Better Way?
              </h2>
              <div className="space-y-4 text-xl font-bold text-black">
                <p className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  📹 Leverages India's existing network of <span className="text-[#FF0080]">13+ lakh</span> government and private traffic cameras
                </p>
                <p className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  ☁️ Centralized cloud AI hub instead of expensive edge AI upgrades
                </p>
                <p className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  ⚡ Real-time detection of accidents, congestion, potholes, flooding within <span className="text-[#FF0080]">2 seconds</span>
                </p>
                <p className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  🚑 Instant alerts to emergency services, reducing response time from 15+ minutes to <span className="text-[#00FF80]">under 2 seconds</span>
                </p>
                <p className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  💰 <span className="text-[#FF0080]">90% cost reduction</span> compared to traditional edge AI infrastructure
                </p>
                <p className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  🔒 Privacy-first: snapshots only, no continuous video or facial recognition
                </p>
                <p className="bg-[#00FF80] border-4 border-black p-4 shadow-[4px_4px_0px_#000000]">
                  🎯 One image every 30-60 seconds analyzed by high-accuracy AI models (<span className="text-[#FF0080]">95%+ accuracy</span>)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-[#0080FF] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-black text-white text-center mb-12 drop-shadow-[4px_4px_0px_#000000]">
            Key Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🚨", title: "Real-Time Accident Detection", color: "#FF0080" },
              { icon: "🚗", title: "Traffic Congestion Analysis", color: "#00D4FF" },
              { icon: "🕳️", title: "Pothole & Road Damage Detection", color: "#FFA500" },
              { icon: "🌊", title: "Waterlogging Alert System", color: "#0099FF" },
              { icon: "🚑", title: "Emergency Response Optimization", color: "#00FF88" },
              { icon: "🗺️", title: "Personalized Navigation", color: "#9D4EDD" },
            ].map((capability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card
                  className="p-8 text-center border-4 border-black shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all"
                  style={{ backgroundColor: capability.color }}
                >
                  <div className="text-6xl mb-4">{capability.icon}</div>
                  <h3 className="text-2xl font-black text-black">{capability.title}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section id="impact" className="py-20 bg-[#FFE951] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-black text-black text-center mb-12 drop-shadow-[4px_4px_0px_#FF0080]">
            Real-World Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="w-16 h-16" />, number: "15K-30K", label: "Lives Saved Annually", color: "#FF0080" },
              { icon: <DollarSign className="w-16 h-16" />, number: "₹45K Cr", label: "Economic Impact", color: "#00FF80" },
              { icon: <Zap className="w-16 h-16" />, number: "2 Sec", label: "Detection to Alert", color: "#0080FF" },
              { icon: <TrendingDown className="w-16 h-16" />, number: "90%", label: "Cost Reduction", color: "#FFA500" },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="p-8 text-center border-4 border-black shadow-[8px_8px_0px_#000000]"
                  style={{ backgroundColor: metric.color }}
                >
                  <div className="flex justify-center mb-4 text-white">{metric.icon}</div>
                  <div className="text-5xl font-black text-white mb-2">{metric.number}</div>
                  <div className="text-xl font-black text-black">{metric.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FF0080] border-b-4 border-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black text-white mb-8 drop-shadow-[4px_4px_0px_#000000]">
              Ready to Save Lives?
            </h2>
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              className="bg-[#00FF80] text-black border-4 border-black hover:bg-green-400 font-black text-2xl px-12 py-8 shadow-[8px_8px_0px_#000000] hover:shadow-[4px_4px_0px_#000000]"
            >
              Explore the Live Dashboard
              <ArrowRight className="ml-3 w-8 h-8" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t-4 border-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-black text-xl">PROJECT K - Saving Lives Through AI</p>
          <p className="font-bold mt-2">© 2024 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}