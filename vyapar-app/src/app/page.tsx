"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Search, BarChart3, Target, Palette, ShoppingCart,
  FileText, Cpu, CheckCircle, Zap, Users, TrendingUp
} from "lucide-react";

const features = [
  { icon: Search, title: "Market Analysis", desc: "Deep-dive into market size, trends, and competition level for your product category in India." },
  { icon: BarChart3, title: "Competitor Intel", desc: "Scrape Amazon for top competitors — prices, ratings, reviews, key features compared." },
  { icon: Target, title: "Pricing Strategy", desc: "AI-recommended pricing tiers with margin analysis and positioning statement." },
  { icon: Palette, title: "Brand Identity", desc: "Brand name suggestions, color palette, typography, voice, taglines, and logo concepts." },
  { icon: ShoppingCart, title: "Product Mockups", desc: "AI-generated product images to visualize your brand before manufacturing." },
  { icon: FileText, title: "Full Report", desc: "Downloadable PDF with complete business plan, BOM costs, and revenue projections." },
];

const stats = [
  { value: "50+", label: "Competitors Analyzed" },
  { value: "<5 min", label: "Report Generation" },
  { value: "100%", label: "AI-Powered" },
  { value: "₹0", label: "To Get Started" },
];

const steps = [
  { num: "01", title: "Describe Your Product", desc: "Tell us what you want to sell — a smartwatch, yoga mat, earbuds, anything." },
  { num: "02", title: "AI Analyzes Everything", desc: "We scrape Amazon, research markets, analyze competitors, and run deep AI analysis." },
  { num: "03", title: "Get Your Brand Blueprint", desc: "Receive a complete report with strategy, branding, mockups, and a generated website." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#f0f4f8]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[#1e2d40] bg-[#0a0e1a]/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Vyapar<span className="text-[#FF9900]">.AI</span></span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/demo" className="text-[#8892a4] hover:text-white transition text-sm hidden sm:block">
                Live Demo
              </Link>
              <Link href="/login" className="text-[#8892a4] hover:text-white transition text-sm">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#FF9900]/20 transition"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF9900]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#00d4ff]/5 rounded-full blur-3xl" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FF9900]/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 12}%`,
                top: `${60 + Math.random() * 30}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9900]/10 border border-[#FF9900]/20 rounded-full text-sm text-[#FF9900] mb-6"
            >
              <Zap className="w-4 h-4" />
              AI-Powered Brand Intelligence for Amazon Sellers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Turn any product idea into a{" "}
              <span className="text-gradient">launch-ready brand</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-[#8892a4] mb-8 max-w-2xl mx-auto"
            >
              AI-powered market intelligence for Amazon sellers in India. Get complete market analysis, competitor intel, pricing strategy, brand identity, and product mockups — in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#FF9900]/30 transition group"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1e2d40] rounded-xl font-semibold text-lg hover:bg-[#1a2235] transition"
              >
                <Cpu className="w-5 h-5 text-[#00d4ff]" />
                View Live Demo
              </Link>
            </motion.div>
          </div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9900]/20 to-[#00d4ff]/20 blur-3xl opacity-30" />
              <div className="relative glass rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#1e2d40]">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-sm text-[#8892a4]">Vyapar.AI Analysis Engine</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#00c853]" />
                    <span className="text-sm text-[#8892a4]">Market size: ₹8,500 Cr — High growth potential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#00c853]" />
                    <span className="text-sm text-[#8892a4]">Analyzed 7 competitors on Amazon India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#00c853]" />
                    <span className="text-sm text-[#8892a4]">Recommended price: ₹3,499 - ₹5,999 (66% margin)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                      <Cpu className="w-4 h-4 text-[#FF9900]" />
                    </motion.div>
                    <span className="text-sm text-[#FF9900]">Generating brand identity & website...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#1e2d40] bg-[#111827]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#FF9900]">{stat.value}</p>
                <p className="text-sm text-[#8892a4] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-[#8892a4]">Three steps from idea to launch-ready brand</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#FF9900]/0 via-[#FF9900]/30 to-[#FF9900]/0" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl shadow-[#FF9900]/20 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#8892a4]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-[#111827]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
            <p className="text-lg text-[#8892a4]">Everything you need to launch with confidence</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 hover:border-[#FF9900]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8892a4]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-glow border border-[#FF9900]/20 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg text-[#8892a4] mb-8 max-w-xl mx-auto">
              Join Indian SMEs transforming product ideas into launch-ready brands with AI-powered intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-xl font-bold text-lg shadow-xl shadow-[#FF9900]/30"
              >
                Start for Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1e2d40] rounded-xl font-semibold text-lg hover:bg-[#1a2235] transition"
              >
                See Demo Report
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2d40] bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Vyapar<span className="text-[#FF9900]">.AI</span></span>
            </div>
            <p className="text-sm text-[#8892a4]">
              From idea to launch-ready brand, in minutes.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#8892a4]">
              <span>Powered by</span>
              <span className="px-3 py-1 bg-[#1a2235] border border-[#1e2d40] rounded text-[#FF9900] font-semibold">AWS</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#1e2d40] text-center text-[#8892a4] text-sm">
            © {new Date().getFullYear()} Vyapar.AI. All rights reserved. Made with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
}
