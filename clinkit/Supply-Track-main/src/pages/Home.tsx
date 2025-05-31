import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tractor, ShieldCheck, TrendingUp, WifiOff,
  Smartphone, Clock, ArrowRight, Trash2, Camera, Truck, Globe
} from "lucide-react";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-black font-sans">

      {/* HERO SECTION */}
      <section className="relative bg-green-200 py-24 border-b-8 border-green-800 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-6xl font-black text-green-900 mb-4">BHARAT TRACE</h1>
          <p className="text-2xl max-w-3xl mx-auto font-medium">
            🌾 Empowering Farmers. 🌍 Ensuring Trust. 🔗 Powered by HyperLedger Blockchain.
          </p>
          <p className="text-lg text-green-800 mt-4 max-w-xl mx-auto">
            Say goodbye to middlemen, fraud, and wastage. Bharat Trace brings transparency, fair payments, and data security to agriculture.
          </p>
          <div className="mt-8">
            <Link to="/map" className="inline-flex items-center px-8 py-4 bg-green-700 text-white font-bold border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-green-800 transition">
              Launch Interactive Map
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY BHARAT TRACE */}
      <section className="bg-white py-20 border-b-8 border-green-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Bharat Trace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <Feature icon={<ShieldCheck />} title="Fraud Prevention" description="Track origin, quality, and certification of seeds, crops, and inputs with tamper-proof records." />
            <Feature icon={<TrendingUp />} title="Better Market Access" description="Enable fair price discovery and direct buyer-seller connections using verified digital trails." />
            <Feature icon={<WifiOff />} title="Offline Ready" description="Rural areas? No problem. Our app works offline with data syncing when internet resumes." />
            <Feature icon={<Smartphone />} title="Farmer-Friendly" description="Local language support, voice assistance, and visual UX built for low digital literacy users." />
            <Feature icon={<Tractor />} title="Traceable Supply Chains" description="From seed to table, ensure transparency in procurement, logistics, and exports." />
            <Feature icon={<Clock />} title="Smart Contracts" description="Enable automatic, transparent, and secure payments linked to delivery milestones." />
          </div>
        </div>
      </section>

      {/* SUCCESS IN MAHARASHTRA */}
      <section className="py-24 bg-yellow-50 border-b-8 border-green-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Start with Maharashtra?</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Maharashtra is already leading blockchain pilots in agriculture. Bharat Trace can scale these efforts by focusing on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <Feature title="Scale Pilot Projects" description="Expand to high-value crops like grapes, pomegranates, and onions." icon={<TrendingUp />} />
            <Feature title="Local Language Training" description="Hands-on training in Marathi for farmers and cooperatives." icon={<Smartphone />} />
            <Feature title="Smart Infrastructure" description="Integrate IoT devices for temperature, humidity, and real-time crop data." icon={<Clock />} />
          </div>
        </div>
      </section>

      {/* BLOCKCHAIN ADOPTION & OUR EDGE */}
      <section className="py-32 bg-green-100 border-b-8 border-green-800">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-14 drop-shadow-md">Blockchain in Agriculture — Global & National Landscape</h2>

          {/* Overview */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg max-w-5xl mx-auto leading-relaxed mb-16"
          >
            Blockchain technology is revolutionizing agriculture worldwide — from traceability to ensuring fair trade and sustainability. Countries like the 
            <span className="font-semibold text-green-800"> USA, Australia, Netherlands, and China </span> 
            have implemented blockchain pilots to monitor produce quality, combat fraud, and enhance supply chain transparency.
          </motion.p>

          {/* Country Highlights Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto mb-20"
          >
            <Feature
              icon={<Globe className="w-12 h-12 text-green-700" />}
              title="USA & Australia"
              description="Use blockchain to track organic certification and optimize export logistics."
            />
            <Feature
              icon={<Globe className="w-12 h-12 text-green-700" />}
              title="Netherlands"
              description="Blockchain integration for greenhouse crop monitoring and waste reduction."
            />
            <Feature
              icon={<Globe className="w-12 h-12 text-green-700" />}
              title="China"
              description="Large scale food safety verification via blockchain-enabled supply chains."
            />
          </motion.div>

          {/* Indian States */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Blockchain Adoption in India
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12 text-lg"
          >
            States such as 
            <span className="font-semibold text-green-800">Andhra Pradesh, Telangana, Karnataka, and Maharashtra</span> are pioneering blockchain projects focused on transparency, direct farmer payments, and crop traceability.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          >
            <Feature
              icon={<ShieldCheck className="w-10 h-10 text-green-700" />}
              title="Transparency & Security"
              description="Verified digital trails help eradicate middlemen fraud and guarantee fair pricing."
            />
            <Feature
              icon={<TrendingUp className="w-10 h-10 text-green-700" />}
              title="Inclusive Market Access"
              description="Connecting farmers directly to buyers through blockchain-backed contracts."
            />
          </motion.div>

          {/* Our Differentiator */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-20 max-w-5xl mx-auto bg-green-50 border-4 border-green-700 rounded-xl p-10 shadow-lg"
          >
            <h3 className="text-4xl font-extrabold mb-6 text-green-900">What Sets Bharat Trace Apart?</h3>
            <p className="text-lg mb-6 leading-relaxed text-green-900">
              Unlike others, Bharat Trace is the only end-to-end agri blockchain solution with integrated 
              <span className="font-semibold"> NFC-based tamper-proof tags</span>, offline-first capabilities, and AI-powered analytics — all tailored for India’s unique farming ecosystem.
            </p>
            <ul className="list-disc list-inside text-left text-green-800 text-lg space-y-4">
              <li>
                <span className="font-semibold">Free NFC tags & smart devices:</span> We will provide free NFC tags to farmers, retailers, and consumers after product launch to ensure product authenticity and boost trust.
              </li>
              <li>
                <span className="font-semibold">Multi-language support:</span> Designed for users with low digital literacy and multiple regional languages.
              </li>
              <li>
                <span className="font-semibold">Smart contract-based payments:</span> Automated milestone-based payments to eliminate delays and disputes.
              </li>
              <li>
                <span className="font-semibold">Food wastage reduction:</span> AI tools integrated to predict expiry, optimize discounts, and improve logistics efficiency.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* AI TOOL INTEGRATION */}
      <section className="py-24 bg-white border-b-8 border-green-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Smart Tools by Bharat Trace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModelCard title="Maintenance Predictor" description="Predict breakdowns before they occur." url="https://maintainence.streamlit.app/" icon={<Truck />} />
            <ModelCard title="Discount Optimization" description="Auto-manage markdowns to reduce waste." url="https://waste-management-ai.streamlit.app/" icon={<Trash2 />} />
            <ModelCard title="Expiry Date Automation" description="Detect expiry from images and apply smart pricing." url="https://expiry-date-ai.streamlit.app/" icon={<Camera />} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-green-300 text-black text-center border-t-8 border-black">
        <h2 className="text-5xl font-bold mb-6">Join the Agri-Tech Revolution</h2>
        <p className="text-xl mb-10 max-w-xl mx-auto">
          Bharat Trace isn’t just a product—it's a mission to empower India’s farmers. Let's build the future of agriculture together.
        </p>
        <Link
          to="/map"
          className="inline-flex items-center px-10 py-5 bg-green-700 text-white font-bold border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-green-800 transition"
        >
          Explore Bharat Trace
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </div>
  );
};

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-green-100 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center rounded-lg hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:scale-105">
      <div className="mb-4 flex justify-center text-green-800 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-gray-800">{description}</p>
    </div>
  );
}

function ModelCard({ icon, title, description, url }: { icon: React.ReactNode; title: string; description: string; url: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      className="cursor-pointer p-6 bg-green-100 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg transition-colors hover:bg-green-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex justify-center mb-4 text-green-800 text-5xl">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm mt-2">{description}</p>
        <ArrowRight className="mt-4 w-5 h-5 text-green-700" />
      </div>
    </motion.div>
  );
}

export default Home;
