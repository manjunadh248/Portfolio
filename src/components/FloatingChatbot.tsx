import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "👋 Hello! I'm Pradeep's portfolio assistant powered by Gemini. Ask me anything about his skills, projects, education, or achievements!",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);
  const createSystemPrompt = (conversationHistory: Message[], userMessage: string) => {
    const systemContext = `You are an AI assistant embedded in Simanjunadha Venkata Pradeep B's personal portfolio website. You help visitors learn about Pradeep — his background, skills, projects, education, certificates, and achievements.

STRICT RULE: Only answer questions related to Pradeep. If someone asks anything unrelated (general coding help, news, other people, etc.), politely decline with exactly: "I'm Pradeep's portfolio assistant — I can only help with questions about his skills, projects, and experience!" and redirect them to ask about Pradeep.

━━━ PERSONAL INFO ━━━
Full Name: Simanjunadha Venkata Pradeep B
Email: simanju2877@gmail.com
Mobile: +91-8074163775
LinkedIn: https://www.linkedin.com/in/b-simanjunadha/
GitHub: https://github.com/manjunadh248

━━━ EDUCATION ━━━
- B.Tech in Computer Science & Engineering
  Lovely Professional University, Punjab, India
  CGPA: 7.69 | Aug 2023 – Present
- Intermediate: Narayana College, Kakinada, Andhra Pradesh | 80.5% | Mar 2022 – Apr 2023
- Matriculation: Narayana Public School, Kakinada, Andhra Pradesh | 96.2% | Mar 2020 – Apr 2021

━━━ SKILLS ━━━
Languages: C/C++, JavaScript, Python, Java, HTML, CSS, SQL
Frameworks & Libraries: ReactJS, Pandas, NumPy, Scikit-Learn, Seaborn, Matplotlib
Tools & Platforms: Linux, Git, GitHub, Maven, Gradle, Docker
Core Competencies: Data Structure & Algorithms, Operating System, Computer Networking
Soft Skills: Time Management, Problem-Solving, Adaptability, Quick Learner

━━━ PROJECTS ━━━

1. BioVerify – Fake Social Media Account Detection (Jun–Jul 2025)
   GitHub: https://github.com/manjunadh248/Bioverify
   - AI-powered fake account detection with biometric verification and ML-based risk scoring
   - SHA-256 hashing, face recognition, liveness detection, XGBoost for risk prediction
   - Interactive Streamlit web interface
   Tech: Python, XGBoost, MediaPipe, OpenCV, Streamlit, SHA-256, Machine Learning

2. CodeCompare – Competitive Programming Matcher (Dec 2025)
   GitHub: https://github.com/manjunadh248/code_campare
   - AI-powered browser extension matching competitive programming problems
   - Semantic embeddings, cosine similarity, hybrid ranking algorithm
   Tech: MongoDB, Express.js, React.js, Node.js, REST APIs

3. Human Auto Typer (Mar 2026)
   GitHub: https://github.com/manjunadh248/human_auto_typer
   - Smart typing automation tool simulating human-like typing patterns
   Tech: JavaScript

4. DevOps Command Lab (Dec 2025)
   GitHub: https://github.com/manjunadh248/devops-command-lab
   - Hands-on DevOps command practice platform
   Tech: JavaScript, DevOps, Docker

5. Blood Camp (Dec 2025)
   GitHub: https://github.com/manjunadh248/blood-camp
   - Blood donation camp management system
   Tech: JavaScript, HTML, CSS

6. Mental Health Simulation (Jul 2025)
   GitHub: https://github.com/manjunadh248/Mental_Health_Simulation
   - Java-based mental health simulation application
   Tech: Java, OOP

━━━ TRAINING ━━━
- Data Structures and Algorithms – CipherSchools (Jun–Jul 2025)
  Intensive summer training at LPU covering arrays, linked lists, stacks, queues, trees, heaps, graphs, sorting, recursion, and dynamic programming
  Techstack: Java, C++

━━━ CERTIFICATES ━━━
1. Cloud Infrastructure 2025 AI Foundations Associate – Oracle (Feb 2025)
2. Google Analytics: Data Collection & Processing – Google Skillshop (Sep 2025)
3. Structured Query Language (SQL) – HackerRank (Oct 2025)
4. Mastering C++ Language – Udemy (Mar 2025)

━━━ ACHIEVEMENTS ━━━
- Solved 350+ coding problems across Codeforces, LeetCode, GFG, HackerRank (Nov 2025)
- Top 3 Team Position in "Code of Duty" Web Hackathon (Nov 2025)
- Gold Medal in Kabaddi at LPU during 1st Semester (Dec 2023)

Keep responses helpful, conversational, and confident. Be specific when mentioning projects, tech stacks, and links.

Recent conversation:`;

    // Add conversation history
    const recentHistory = conversationHistory.slice(-4); // Keep last 4 exchanges
    let conversationText = systemContext;
    recentHistory.forEach(msg => {
      conversationText += `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
    });
    conversationText += `\nUser: ${userMessage}\nAssistant:`;
    return conversationText;
  };
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      console.log('Sending message to Gemini API...');
      const prompt = createSystemPrompt(messages, userMessage.content);
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            topP: 0.8,
            topK: 40
          }
        })
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Gemini response received');
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
        console.error('Invalid Gemini response structure:', data);
        throw new Error('Invalid response from Gemini API');
      }
      const aiResponse = data.candidates[0].content.parts[0].text;
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Chat Error",
        description: "Sorry, I'm having trouble responding right now. Please try again.",
        variant: "destructive"
      });
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
        <Button onClick={() => setIsOpen(!isOpen)} className="relative h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/10" size="icon">
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && <div className="fixed bottom-28 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pradeep's AI</h3>
                  <p className="text-xs opacity-90">Powered by Gemini</p>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => <div key={index} className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>}
                <div className={`max-w-[75%] p-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-sm shadow-md' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm shadow-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.role === 'user' && <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>}
              </div>)}
              {isLoading && <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Pradeep's projects..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-700 text-white placeholder-slate-400 caret-white text-sm"
              />
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} size="icon" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-2xl h-12 w-12 shadow-lg transition-transform hover:scale-105">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Send className="h-5 w-5 text-white" />}
              </Button>
            </div>
          </div>
        </div>}
    </>;
};
export default FloatingChatbot;