import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/SplineScene";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-zinc-950 w-full" style={{ overscrollBehaviorBlock: "none" }}>
      <div className="h-full">
        <div className="flex w-full h-[100svh] min-h-[100svh] overflow-hidden">
          <main className="flex-col flex-grow relative flex min-h-[100svh]">
            <main className="w-full min-h-screen">
              <div className="relative w-full m-auto">
                <div className="flex w-full h-[100svh] overflow-hidden">
                  <div className="relative flex w-full min-h-[100svh]">
                    <main className="flex-col flex-grow relative flex min-h-[100svh]">
                      <main className="bg-zinc-100 relative min-h-[100svh]">
                        <div className="flex w-full min-h-[100svh]">
                          <div className="flex-col flex-grow flex w-full lg:min-h-[100svh] lg:flex-row lg:justify-end">
                            {/* Spline Background Section */}
                            <div className="items-center flex-col justify-center relative flex w-full min-h-[50vh] p-2 lg:fixed lg:right-0 lg:top-0 lg:grid lg:h-[100svh] lg:min-h-[100svh] lg:w-[70%] lg:grid-cols-1 lg:overflow-x-hidden lg:overflow-y-hidden">
                              <SplineScene 
                                scene="https://prod.spline.design/GXOyqZdSxxoCriBA/scene.splinecode"
                                className="w-full h-full"
                              />
                              
                              {/* Top Controls */}
                              <motion.section
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white/[0.7] backdrop-blur-md left-[0.50rem] absolute top-[0.50rem] z-[101] border-2 border-zinc-950/[0.05] border-solid rounded-full p-1 lg:left-[1.00rem] lg:top-[1.00rem]"
                              >
                                <div className="items-center flex gap-[0.13rem]">
                                  <div className="bg-gray-200/[0.8] items-center rounded-bl-full rounded-tl-full justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                  <div className="bg-gray-200/[0.8] items-center justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                  <div className="bg-gray-200/[0.8] items-center rounded-br-full rounded-tr-full justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                </div>
                              </motion.section>

                              {/* Top Right Controls */}
                              <motion.section
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-white/[0.7] backdrop-blur-md absolute right-[0.50rem] top-[0.50rem] z-[101] border-2 border-zinc-950/[0.05] border-solid rounded-full p-1 lg:right-[1.00rem] lg:top-[1.00rem]"
                              >
                                <div className="items-center flex gap-[0.13rem]">
                                  <div className="bg-gray-200/[0.8] items-center rounded-bl-full rounded-tl-full justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                  <div className="bg-gray-200/[0.8] items-center justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                  <div className="bg-gray-200/[0.8] items-center rounded-br-full rounded-tr-full justify-center px-2 flex h-7">
                                    <div className="bg-zinc-500/[0.2] opacity-[0.510634] w-4 h-4 rounded" />
                                  </div>
                                </div>
                              </motion.section>
                            </div>

                            {/* Content Section */}
                            <div className="flex-col justify-start px-4 flex w-full rounded-2xl lg:fixed lg:h-[100svh] lg:min-h-[100svh] lg:w-96 lg:justify-end">
                              <div className="relative w-full h-full lg:overflow-y-auto lg:overflow-x-hidden">
                                <div className="sticky z-[2] w-full">
                                  <div className="bottom-[-1.50rem] left-0 absolute right-0 z-0 -m-4">
                                    <div className="bg-gradient-to-t from-zinc-100 to-black/[0] w-full h-28" />
                                  </div>
                                </div>

                                <div className="mt-16 mb-36 lg:pt-5 lg:pr-5 lg:pb-5 lg:pl-8">
                                  {/* Header */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mb-12"
                                  >
                                    <img src="/logo.svg" alt="Project K" className="w-12 h-12 mb-4" />
                                    <h1 className="text-5xl font-black text-zinc-950 mb-3">PROJECT K</h1>
                                    <p className="text-lg font-bold text-zinc-600">Revolutionary AI-Powered Traffic Intelligence Platform</p>
                                  </motion.div>

                                  {/* Problem Section */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="mb-8"
                                  >
                                    <h2 className="text-sm font-black text-zinc-500 mb-4 uppercase tracking-wider">The Crisis</h2>
                                    <div className="space-y-3">
                                      <p className="text-sm font-bold text-zinc-700">🚨 1.7L+ lives lost annually</p>
                                      <p className="text-sm font-bold text-zinc-700">💰 ₹45,000+ crores economic cost</p>
                                      <p className="text-sm font-bold text-zinc-700">⏱️ 15-30 minutes response delay</p>
                                    </div>
                                  </motion.div>

                                  {/* Solution Section */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mb-8"
                                  >
                                    <h2 className="text-sm font-black text-zinc-500 mb-4 uppercase tracking-wider">Our Solution</h2>
                                    <div className="bg-zinc-200/[0.5] rounded-lg p-4 space-y-2">
                                      <p className="text-sm font-bold text-zinc-700">✅ 13L+ cameras connected</p>
                                      <p className="text-sm font-bold text-zinc-700">⚡ 2-second detection time</p>
                                      <p className="text-sm font-bold text-zinc-700">🎯 90% cost reduction</p>
                                    </div>
                                  </motion.div>

                                  {/* Capabilities */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="mb-8"
                                  >
                                    <h2 className="text-sm font-black text-zinc-500 mb-4 uppercase tracking-wider">Capabilities</h2>
                                    <div className="flex flex-wrap gap-2">
                                      <span className="bg-zinc-200 text-zinc-900 px-3 py-1 rounded-full text-xs font-bold">Accident Detection</span>
                                      <span className="bg-zinc-200 text-zinc-900 px-3 py-1 rounded-full text-xs font-bold">Traffic Analysis</span>
                                      <span className="bg-zinc-200 text-zinc-900 px-3 py-1 rounded-full text-xs font-bold">Pothole Detection</span>
                                      <span className="bg-zinc-200 text-zinc-900 px-3 py-1 rounded-full text-xs font-bold">Flood Alerts</span>
                                    </div>
                                  </motion.div>

                                  {/* Impact */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="mb-8"
                                  >
                                    <h2 className="text-sm font-black text-zinc-500 mb-4 uppercase tracking-wider">Impact</h2>
                                    <div className="space-y-2">
                                      <p className="text-sm font-bold text-zinc-700">📊 15K-30K lives saved annually</p>
                                      <p className="text-sm font-bold text-zinc-700">🚑 Emergency response optimized</p>
                                    </div>
                                  </motion.div>

                                  {/* CTA Button */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="border-t-2 pt-6 mt-8 border-zinc-200/[0.5] border-solid"
                                  >
                                    <Button
                                      onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
                                      className="w-full bg-zinc-950 text-white hover:bg-zinc-800 font-black py-6 rounded-lg flex items-center justify-center gap-2"
                                    >
                                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                                      <ArrowRight className="w-4 h-4" />
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </main>
                    </main>
                  </div>
                </div>
              </div>
            </main>
          </main>
        </div>
      </div>
    </div>
  );
}