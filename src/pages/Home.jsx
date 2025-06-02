import { motion } from "framer-motion";
import { Mic, CheckCircle, BarChart2, Globe } from "lucide-react";

const Home = () => {
  const heroImage = "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-10">
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Globe className="w-5 h-5" />
            <span className="font-medium">தமிழ் பேசுபவர்களுக்கான ஆங்கில பேச்சுத் திறன் மேம்பாடு</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master <span className="text-blue-600">Public Speaking</span> <br className="hidden lg:block" />
            in English with Confidence
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Specialized training to help Tamil speakers overcome public speaking challenges in English. 
            Get AI-powered feedback on your delivery, clarity, and stage presence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-200 transition-all">
              Start Free Trial
            </button>
            <button className="text-lg px-8 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Confidence Building</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Speech Delivery Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700">Progress Tracking</span>
            </div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative"
        >
          <img
            src={heroImage}
            alt="Public speaking practice"
            className="w-full max-w-md mx-auto relative z-10 rounded-lg shadow-xl"
          />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full opacity-40"></div>
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-purple-100 rounded-full opacity-40"></div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Designed for Tamil Speakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl hover:bg-blue-50 transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Overcome Mother Tongue Influence</h3>
              <p className="text-gray-600">
                Special techniques to reduce Tamil accent interference in English public speaking
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl hover:bg-blue-50 transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Cultural Context Matters</h3>
              <p className="text-gray-600">
                Training that understands Tamil cultural references in English communication
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl hover:bg-blue-50 transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Real-world Scenarios</h3>
              <p className="text-gray-600">
                Practice common public speaking situations faced by Tamil professionals
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl hover:bg-white transition-all"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Confident Speakers</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl hover:bg-white transition-all"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
              <div className="text-gray-600">Reduced Stage Fear</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl hover:bg-white transition-all"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Speaking Templates</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl hover:bg-white transition-all"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Practice Anytime</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;