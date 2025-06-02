import  { useState, useEffect } from 'react';
import { FiMic, FiCheck, FiRefreshCw, FiVolume2, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

const PublicSpeakingApp = () => {
  // State for all features
  const [activeTab, setActiveTab] = useState('outline');
  const [speechTopic, setSpeechTopic] = useState('');
  const [generatedOutline, setGeneratedOutline] = useState('');
  const [vocabWord, setVocabWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [sentence, setSentence] = useState('');
  const [grammarFeedback, setGrammarFeedback] = useState([]);
  const [accent, setAccent] = useState('american');
  const [accentTips, setAccentTips] = useState('');
  const [directPhrase, setDirectPhrase] = useState('');
  const [politePhrase, setPolitePhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // API Configuration
   
 const getAIResponse = async (endpoint, data) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/public-speaking/${endpoint}`, data);
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    throw new Error('Failed to get AI response. Please try again.');
  }
};

const generateOutline = async (topic) => {
  if (!topic.trim()) return;

  setIsLoading(true);
  setError('');
  try {
    const { outline } = await getAIResponse('outline', { topic });
    setGeneratedOutline(outline);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const fetchSynonyms = async (word) => {
  if (!word.trim()) return;A

  setIsLoading(true);
  setError('');
  try {
    const { synonyms } = await getAIResponse('synonyms', { word });
    setSynonyms(synonyms);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const analyzeGrammar = async (text) => {
  if (!text.trim()) return;
  setIsLoading(true);
  setError('');
  try {
    const { feedback } = await getAIResponse('grammar', { text });
    setGrammarFeedback(feedback);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const getAccentTips = async (selectedAccent) => {
  setIsLoading(true);
  setError('');
  try {
    const { tips } = await getAIResponse('accent', { accent: selectedAccent });
    setAccentTips(tips);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

const rephraseSentence = async (text) => {
  if (!text.trim()) return;

  setIsLoading(true);
  setError('');
  try {
    const { politePhrases } = await getAIResponse('rephrase', { text });
    setPolitePhrase(politePhrases);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  // Speech synthesis function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setError('Error with speech synthesis');
      };
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      setError('Speech synthesis not supported in your browser');
    }
  };

  // Effect hooks with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (speechTopic.length > 3) {
        generateOutline(speechTopic);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [speechTopic]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (vocabWord.length > 2) {
        fetchSynonyms(vocabWord);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [vocabWord]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sentence.length > 5) {
        analyzeGrammar(sentence);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [sentence]);

  useEffect(() => {
    getAccentTips(accent);
  }, [accent]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FiVolume2 size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SpeechMaster AI</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setActiveTab('outline')} 
              className={`px-3 py-2 font-medium ${activeTab === 'outline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Speech Outline
            </button>
            <button 
              onClick={() => setActiveTab('vocab')} 
              className={`px-3 py-2 font-medium ${activeTab === 'vocab' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Vocabulary
            </button>
            <button 
              onClick={() => setActiveTab('grammar')} 
              className={`px-3 py-2 font-medium ${activeTab === 'grammar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Grammar
            </button>
            <button 
              onClick={() => setActiveTab('accent')} 
              className={`px-3 py-2 font-medium ${activeTab === 'accent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Accent
            </button>
            <button 
              onClick={() => setActiveTab('politeness')} 
              className={`px-3 py-2 font-medium ${activeTab === 'politeness' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Politeness
            </button>
          </nav>
          <div className="md:hidden">
            <select 
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={activeTab}
            >
              <option value="outline">Speech Outline</option>
              <option value="vocab">Vocabulary</option>
              <option value="grammar">Grammar</option>
              <option value="accent">Accent</option>
              <option value="politeness">Politeness</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <div className="flex justify-between items-center">
              <p>{error}</p>
              <button 
                onClick={() => setError('')}
                className="text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Speech Outline Generator */}
        {activeTab === 'outline' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiMic className="mr-2 text-blue-600" /> Speech Outline Generator
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your speech topic (e.g., 'Future of AI')"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={speechTopic}
                onChange={(e) => setSpeechTopic(e.target.value)}
              />
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : generatedOutline ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-2">Generated Outline:</h3>
                    <div className="whitespace-pre-line text-gray-800">{generatedOutline}</div>
                  </div>
                  <button
                    onClick={() => speakText(generatedOutline)}
                    disabled={isSpeaking}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${isSpeaking ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                  >
                    <FiVolume2 />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen to Outline'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Enter a topic to generate a speech outline
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vocabulary Enhancer */}
        {activeTab === 'vocab' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiCheck className="mr-2 text-blue-600" /> Vocabulary Enhancer
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter a word to find better alternatives"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={vocabWord}
                onChange={(e) => setVocabWord(e.target.value)}
              />
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : synonyms.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Suggested Alternatives for "{vocabWord}":</h3>
                  <div className="flex flex-wrap gap-2">
                    {synonyms.map((word, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 cursor-pointer"
                        onClick={() => {
                          setVocabWord(word);
                          fetchSynonyms(word);
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Enter a word to find sophisticated alternatives
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grammar Checker */}
        {activeTab === 'grammar' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiRefreshCw className="mr-2 text-blue-600" /> Grammar Assistant
            </h2>
            <div className="space-y-4">
              <textarea
                placeholder="Type or paste your sentence/paragraph here"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
              />
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : grammarFeedback.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Suggestions:</h3>
                  <ul className="space-y-2">
                    {grammarFeedback.map((item, index) => (
                      <li key={index} className="text-gray-800 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{item.replace(/^- /, '').trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : sentence.length > 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Analyzing your text...
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Enter text to get grammar suggestions
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accent Training */}
        {activeTab === 'accent' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiVolume2 className="mr-2 text-blue-600" /> Accent Training
            </h2>
            <div className="space-y-4">
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              >
                <option value="american">🇺🇸 American English</option>
                <option value="british">🇬🇧 British English</option>
                <option value="australian">🇦🇺 Australian English</option>
              </select>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : accentTips ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-2">Tips for {accent.charAt(0).toUpperCase() + accent.slice(1)} accent:</h3>
                    <div className="whitespace-pre-line text-gray-800">{accentTips}</div>
                  </div>
                  <button
                    onClick={() => speakText(`Practice this sentence with ${accent} accent: "The weather is better in November and December."`)}
                    disabled={isSpeaking}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${isSpeaking ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                  >
                    <FiVolume2 />
                    <span>{isSpeaking ? 'Speaking...' : 'Hear Example Sentence'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading accent tips...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Polite Rephrasing */}
        {activeTab === 'politeness' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiChevronDown className="mr-2 text-blue-600" /> Diplomatic Rephrasing
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder='Enter a direct phrase (e.g., "This is wrong")'
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={directPhrase}
                onChange={(e) => setDirectPhrase(e.target.value)}
              />
              <button
                onClick={() => rephraseSentence(directPhrase)}
                disabled={isLoading || !directPhrase.trim()}
                className={`px-6 py-3 rounded-lg ${isLoading || !directPhrase.trim() ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isLoading ? 'Rephrasing...' : 'Make More Polite'}
              </button>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : politePhrase ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Professional Alternatives:</h3>
                  <div className="whitespace-pre-line text-gray-800">{politePhrase}</div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Enter a phrase to get diplomatic alternatives
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4">💡 General Speaking Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Practice speaking slowly (aim for 120-150 words per minute)",
              "Use pauses effectively to emphasize points",
              "Maintain eye contact with your audience",
              "Vary your pitch to avoid monotone delivery",
              "Record yourself and analyze playback",
              "Join Toastmasters or speaking clubs",
              "Prepare 3 key messages for any speech",
              "Use the 'rule of three' in explanations"
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">{index + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SpeechMaster AI. Educational tool for English learners.</p>
          <p className="mt-1">Note: This app uses AI and may occasionally generate incorrect information.</p>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-700">Analyzing your content...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicSpeakingApp;