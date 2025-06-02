import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
const Game = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [activeGame, setActiveGame] = useState(null);
  const [gameProgress, setGameProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [levelUnlocked, setLevelUnlocked] = useState({ beginner: true, intermediate: false, difficult: false });
  const [currentLevel, setCurrentLevel] = useState('');
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const validResponses = {
    "name a fruit": ["apple", "banana", "orange", "grape", "mango", "strawberry", "watermelon", "pineapple", "pear", "peach", "kiwi", "blueberry", "raspberry", "blackberry", "lemon", "lime", "cherry", "coconut", "pomegranate", "apricot", "plum", "melon", "fig", "guava", "papaya"],
    "name a color": ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "silver", "gold", "maroon", "navy", "teal", "turquoise", "lavender", "violet", "indigo", "magenta", "cyan", "olive", "salmon", "beige"],
    "name a pet animal": ["dog", "cat", "fish", "bird", "hamster", "rabbit", "turtle", "snake", "lizard", "ferret", "guinea pig", "mouse", "rat", "parrot", "canary", "gerbil", "chinchilla", "hedgehog", "hermit crab", "frog", "gecko", "tarantula", "potato", "pig", "goat"],
    "name a vehicle": ["car", "truck", "bus", "motorcycle", "bicycle", "scooter", "train", "plane", "helicopter", "boat", "ship", "submarine", "jet", "rocket", "spaceship", "ambulance", "fire truck", "police car", "taxi", "van", "tractor", "bulldozer", "excavator", "tank", "segway"],
    "name a country": ["usa", "canada", "mexico", "brazil", "argentina", "uk", "france", "germany", "italy", "spain", "china", "japan", "india", "russia", "australia", "egypt", "south africa", "nigeria", "kenya", "morocco", "turkey", "saudi arabia", "thailand", "vietnam", "indonesia"],
    "name a bird": ["eagle", "hawk", "sparrow", "pigeon", "owl", "parrot", "peacock", "flamingo", "penguin", "ostrich", "swan", "duck", "goose", "robin", "blue jay", "cardinal", "woodpecker", "hummingbird", "crow", "raven", "falcon", "vulture", "seagull", "pelican", "stork"],
    "name an electronic gadget": ["phone", "smartphone", "tablet", "laptop", "computer", "tv", "television", "camera", "headphones", "earbuds", "speaker", "microphone", "watch", "smartwatch", "fitness tracker", "router", "modem", "printer", "scanner", "projector", "drone", "gps", "calculator", "game console", "vr headset"],
    "name an emotion": ["happy", "sad", "angry", "excited", "scared", "surprised", "confused", "bored", "tired", "nervous", "anxious", "calm", "relaxed", "jealous", "proud", "embarrassed", "guilty", "ashamed", "lonely", "hopeful", "disappointed", "frustrated", "grateful", "content", "loved"],
    "name a programming language": ["javascript", "python", "java", "c", "c++", "c#", "php", "ruby", "swift", "kotlin", "go", "rust", "typescript", "r", "dart", "scala", "perl", "haskell", "lua", "matlab", "sql", "html", "css", "bash", "assembly"]
  };
  const games = [
    {
      id: 'tongue-twisters',
      title: 'Twister Talk',
      description: 'Twist your tongue with fun phrases!',
      icon: '🌀',
      color: 'from-purple-500 to-indigo-600',
      levels: {
        beginner: [
          "She sells seashells by the seashore",
          "How can a clam cram in a clean cream can?",
          "Fuzzy Wuzzy was a bear."
        ],
        intermediate: [
          "Six slippery snails slid slowly seaward",
          "Betty bought butter but the butter was bitter",
          "I saw a kitten eating chicken in the kitchen"
        ],
        difficult: [
          "The thirty-three thieves thought that they thrilled the throne throughout Thursday",
          "A proper copper coffee pot",
          "The seething sea ceaseth and thus the seething sea sufficeth us"
        ]
      }
    },
    {
      id: 'shadow-pronunciation',
      title: 'Echo Voice',
      description: 'Listen and repeat the phrase!',
      icon: '🔊',
      color: 'from-blue-500 to-cyan-600',
      levels: {
        beginner: [
          "The quick brown fox jumps over the lazy dog.",
          "How much wood would a woodchuck chuck?",
          "A fast red fox jumps over a slow dog."
        ],
        intermediate: [
          "Peter Piper picked a peck of pickled peppers.",
          "I scream, you scream, we all scream for ice cream.",
          "The rain in Spain stays mainly in the plain."
        ],
        difficult: [
          "A big black bug bit a big black dog on his big black nose.",
          "If two witches were watching two watches, which witch would watch which watch?",
          "The thirty-three thieves thought that they thrilled the throne throughout Thursday."
        ]
      }
    },
    {
      id: 'quick-think',
      title: 'Quick Think',
      description: 'Think fast and answer the category!',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600',
      levels: {
        beginner: [
          "Name a fruit",
          "Name a color",
          "Name a pet animal"
        ],
        intermediate: [
          "Name a vehicle",
          "Name a country",
          "Name a bird"
        ],
        difficult: [
          "Name an electronic gadget",
          "Name an emotion",
          "Name a programming language"
        ]
      }
    }
  ];

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    if (activeGame?.id === 'shadow-pronunciation') {
      utterance.rate = speechSpeed;
    }
    speechSynthesis.speak(utterance);
  };
useEffect(() => {
    if (activeGame && currentLevel) {
      const currentPrompt = activeGame.levels[currentLevel][gameProgress];
      if (activeGame.id === 'shadow-pronunciation') {
        speakText(currentPrompt);
      }
    }
  }, [gameProgress, currentLevel, speechSpeed]);
const startGame = (gameId) => {
    const game = games.find(g => g.id === gameId);
    setActiveGame(game);
    setShowLevelSelection(true);
    setGameProgress(0);
    setScore(0);
    setFeedback('');
    setLevelUnlocked({ beginner: true, intermediate: false, difficult: false });
    setCurrentLevel('');
    resetTranscript();
  };
  const startLevel = (level) => {
    setCurrentLevel(level);
    setGameProgress(0);
    setShowLevelSelection(false);
    resetTranscript();
    setFeedback('');
    setScore(0);
  };
  const resetLevel = () => {
    setGameProgress(0);
    resetTranscript();
    setFeedback('');
    setScore(0);
  };
const repeatPrompt = () => {
    if (activeGame && currentLevel) {
      const currentPrompt = activeGame.levels[currentLevel][gameProgress];
      speakText(currentPrompt);
    }
  };
const nextChallenge = async () => {
  const totalPrompts = activeGame.levels[currentLevel].length;
  if (gameProgress + 1 < totalPrompts) {
    setGameProgress(prev => prev + 1);
  } else {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/score/save',
        {
          gameId: activeGame.id,
          level: currentLevel,
          score: score
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error('Failed to save score:', err);
    }
    if (currentLevel === 'beginner') {
      setLevelUnlocked(prev => ({ ...prev, intermediate: true }));
    } else if (currentLevel === 'intermediate') {
      setLevelUnlocked(prev => ({ ...prev, difficult: true }));
    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    setShowLevelSelection(true);
    setCurrentLevel('');
  }
  resetTranscript();
  setFeedback('');
};
  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening();
  };
  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };
  const submitSpeech = () => {
    if (!transcript.trim()) {
      setFeedback("Please say something first.");
      return;
    }
    let accuracy = 0;
    let feedbackMsg = '';
    const response = transcript.toLowerCase().trim();
    const currentPrompt = activeGame.levels[currentLevel][gameProgress].toLowerCase();
    if (activeGame.id === 'quick-think') {
      const validAnswers = validResponses[currentPrompt] || [];
      const isCorrect = validAnswers.includes(response);
      if (isCorrect) {
        accuracy = 100;
        feedbackMsg = `✅ Correct! ${response} is a valid ${currentPrompt.split(' ')[2]}`;
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        accuracy = 0;
        feedbackMsg = `❌ Try again. ${response} doesn't match the category.`;
      }
    } else {
      const targetWords = currentPrompt.toLowerCase().split(' ');
      const spokenWords = response.split(' ');

      const matched = spokenWords.filter(word => targetWords.includes(word)).length;
      accuracy = Math.floor((matched / targetWords.length) * 100);
      if (accuracy >= 80) {
        feedbackMsg = "🎉 Excellent! Great match.";
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else if (accuracy >= 50) {
        feedbackMsg = "👍 Good job! Try for more accuracy.";
      } else {
        feedbackMsg = "💪 Keep practicing! You can do better.";
      }
    }
    setScore(prev => prev + accuracy);
    setFeedback(feedbackMsg);
    setIsListening(false);
  };
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browser Not Supported</h2>
          <p className="text-gray-600 mb-6">
            Please use Chrome, Edge, or another browser that supports speech recognition.
          </p>
          <a 
            href="https://www.google.com/chrome/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Chrome
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SpeakZone
              </span>
              <span className="ml-2 text-2xl">🗣️</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">Fun speech games for improving your English</p>
          </div>
          {activeGame && (
            <div className="flex items-center space-x-4">
              <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                <span className="font-medium text-gray-700">Score: </span>
                <span className="font-bold text-blue-600">{score}</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                <span className="font-medium text-gray-700">Level: </span>
                <span className="font-bold capitalize text-blue-600">{currentLevel}</span>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Select a Game Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {games.map((game) => (
                  <motion.div
                    key={game.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => startGame(game.id)}
                  >
                    <div className={`h-2 bg-gradient-to-r ${game.color}`}></div>
                    <div className="p-6">
                      <div className="text-4xl mb-4">{game.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{game.title}</h3>
                      <p className="text-gray-600">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : showLevelSelection ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Difficulty Level</h2>
                <p className="text-gray-600">Choose the challenge level for {activeGame.title}</p>
              </div>
              
              <div className="space-y-4">
                {['beginner', 'intermediate', 'difficult'].map((level) => (
                  <motion.div
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => levelUnlocked[level] && startLevel(level)}
                      disabled={!levelUnlocked[level]}
                      className={`w-full text-left p-6 rounded-lg transition-all ${
                        level === 'beginner' ? 'bg-green-50 hover:bg-green-100 border-green-200' :
                        level === 'intermediate' ? 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200' :
                        'bg-red-50 hover:bg-red-100 border-red-200'
                      } border-2 ${
                        !levelUnlocked[level] ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg capitalize text-gray-800">
                            {level} Level
                          </h3>
                          <p className="text-gray-600">
                            {level === 'beginner' ? 'Great for getting started' :
                             level === 'intermediate' ? 'A moderate challenge' :
                             'For advanced speakers'}
                          </p>
                        </div>
                        {!levelUnlocked[level] ? (
                          <span className="bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-500 border border-gray-200">
                            Locked
                          </span>
                        ) : (
                          <span className="bg-white rounded-full px-3 py-1 text-xs font-medium text-green-600 border border-green-200">
                            Available
                          </span>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Games
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${activeGame.color}`}></div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{activeGame.title}</h2>
                    <p className="text-gray-600">{activeGame.description}</p>
                  </div>
                  <button
                    onClick={() => setShowLevelSelection(true)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                  >
                    Change Level
                  </button>
                </div>
                
                {/* Speech speed control - only for Echo Voice */}
                {activeGame.id === 'shadow-pronunciation' && (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <label htmlFor="speedControl" className="block text-sm font-medium text-gray-700 mb-2">
                      Speech Speed: <span className="font-semibold">{speechSpeed}x</span>
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Slower</span>
                      <input
                        id="speedControl"
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={speechSpeed}
                        onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                        className="w-full max-w-md"
                      />
                      <span className="text-sm text-gray-500">Faster</span>
                    </div>
                  </div>
                )}
                
                {/* Game content */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  {activeGame.id !== 'shadow-pronunciation' ? (
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 mb-2">PROMPT</p>
                      <p className="text-2xl font-medium text-gray-800">
                        {activeGame.levels[currentLevel][gameProgress]}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 mb-2">LISTEN CAREFULLY</p>
                      <p className="text-xl text-gray-400 italic">🔊 Audio prompt will play automatically</p>
                    </div>
                  )}
                </div>
                
                {/* Speech recognition area */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-700">Your Response</p>
                    <div className={`flex items-center ${isListening ? 'text-red-500' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className="text-xs">{isListening ? 'Listening...' : 'Ready'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-20 mb-4">
                    {transcript ? (
                      <p className="text-gray-800">{transcript}</p>
                    ) : (
                      <p className="text-gray-400 italic">Your speech will appear here...</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleStartListening}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        isListening ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      } transition-colors`}
                      disabled={isListening}
                    >
                      <span className="mr-2">🎤</span> Start Speaking
                    </button>
                    <button
                      onClick={handleStopListening}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        !isListening ? 'bg-gray-200 text-gray-700' : 'bg-red-600 hover:bg-red-700 text-white'
                      } transition-colors`}
                      disabled={!isListening}
                    >
                      <span className="mr-2">⏹️</span> Stop
                    </button>
                    <button
                      onClick={submitSpeech}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <span className="mr-2">📤</span> Submit
                    </button>
                    {activeGame.id === 'shadow-pronunciation' && (
                      <button
                        onClick={repeatPrompt}
                        className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        <span className="mr-2">🔁</span> Repeat
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Feedback and navigation */}
                {feedback && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    feedback.includes('✅') || feedback.includes('🎉') ? 'bg-green-50 text-green-800' :
                    feedback.includes('❌') ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'
                  }`}>
                    <p className="font-medium">{feedback}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    onClick={resetLevel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ↻ Reset
                  </button>
                  <button
                    onClick={nextChallenge}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    Next Challenge →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SpeakZone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Game;