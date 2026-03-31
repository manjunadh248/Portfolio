
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'BioVerify',
      subtitle: 'Fake Social Media Account Detection',
      period: "Jun '25–Jul '25",
      bannerImage: '/uploads/projects/bioverify.jpg',
      description: 'AI-powered fake account detection system integrating biometric verification and machine learning-based risk scoring to prevent fraudulent social media profiles.',
      tech: ['Python', 'XGBoost', 'MediaPipe', 'OpenCV', 'Streamlit', 'SHA-256', 'Machine Learning'],
      gradient: 'from-violet-500 to-purple-700',
      icon: '🔐',
      githubUrl: 'https://github.com/manjunadh248/Bioverify',
      features: [
        'Biometric verification with face recognition and liveness detection',
        'SHA-256 hashing for secure dual authentication flows',
        'XGBoost-based risk prediction with real-time visualization',
        'Interactive web interface built with Streamlit'
      ]
    },
    {
      id: 2,
      title: 'CodeCompare',
      subtitle: 'Competitive Programming Matcher',
      period: "Dec '25",
      bannerImage: '/uploads/projects/codecompare.jpg',
      description: 'AI-powered browser extension that matches similar competitive programming problems across platforms using semantic embeddings and cosine similarity.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
      gradient: 'from-cyan-400 to-blue-600',
      icon: '💻',
      githubUrl: 'https://github.com/manjunadh248/code_campare',
      features: [
        'Hybrid ranking algorithm combining difficulty metadata and semantic similarity',
        'Match classification (Exact / Similar / No Match) with local caching',
        'Scalable REST APIs and managed data storage for fast retrieval',
        'Browser extension for seamless cross-platform matching'
      ]
    },
    {
      id: 3,
      title: 'Human Auto Typer',
      subtitle: 'Smart Typing Automation Tool',
      period: "Mar '26",
      bannerImage: '/uploads/projects/autotyper.jpg',
      description: 'An intelligent typing automation tool that simulates human-like typing patterns for text input automation.',
      tech: ['JavaScript', 'Automation', 'Web APIs'],
      gradient: 'from-green-400 to-emerald-600',
      icon: '⌨️',
      githubUrl: 'https://github.com/manjunadh248/human_auto_typer',
      features: [
        'Simulates natural human typing speed and patterns',
        'Configurable typing speed and error simulation',
        'Lightweight JavaScript-based implementation',
        'Easy-to-use interface for text automation'
      ]
    },
    {
      id: 4,
      title: 'DevOps Command Lab',
      subtitle: 'DevOps Learning & Practice Platform',
      period: "Dec '25",
      bannerImage: '/uploads/projects/devops-lab.jpg',
      description: 'A hands-on DevOps command practice platform for learning infrastructure management, CI/CD pipelines, and deployment workflows.',
      tech: ['JavaScript', 'DevOps', 'Docker', 'CI/CD'],
      gradient: 'from-orange-400 to-amber-500',
      icon: '🔧',
      githubUrl: 'https://github.com/manjunadh248/devops-command-lab',
      features: [
        'Interactive command-line practice environment',
        'DevOps workflow simulation and learning',
        'Docker and containerization exercises',
        'Real-world infrastructure scenarios'
      ]
    },
    {
      id: 5,
      title: 'Blood Camp',
      subtitle: 'Blood Donation Management System',
      period: "Dec '25",
      bannerImage: '/uploads/projects/bloodcamp.jpg',
      description: 'A web-based blood donation camp management system to facilitate donor registration, blood inventory tracking, and camp organization.',
      tech: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
      gradient: 'from-red-400 to-pink-600',
      icon: '🩸',
      githubUrl: 'https://github.com/manjunadh248/blood-camp',
      features: [
        'Donor registration and management system',
        'Blood inventory tracking and analytics',
        'Camp scheduling and organization tools',
        'Social impact focused healthcare solution'
      ]
    },
    {
      id: 6,
      title: 'Mental Health Simulation',
      subtitle: 'Mental Health Awareness Application',
      period: "Jul '25",
      bannerImage: '/uploads/projects/mental-health.jpg',
      description: 'A Java-based mental health simulation application that helps users understand and manage mental health conditions through interactive scenarios.',
      tech: ['Java', 'OOP', 'Simulation'],
      gradient: 'from-blue-400 to-indigo-600',
      icon: '🧠',
      githubUrl: 'https://github.com/manjunadh248/Mental_Health_Simulation',
      features: [
        'Interactive mental health simulation scenarios',
        'Object-oriented design with Java',
        'Educational content for mental health awareness',
        'User-friendly interface for engagement'
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial setup
    gsap.set('.project-card', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      filter: 'blur(10px)'
    });

    // Animate cards
    tl.to('.project-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Card hover animations
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A showcase of my latest work, featuring AI-integrated applications, full-stack platforms, and innovative solutions.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glassmorphic rounded-xl overflow-hidden cursor-pointer group"
            >
              {/* Banner — always render gradient as base, image sits on top */}
              <div className="relative h-44 overflow-hidden rounded-t-2xl flex-shrink-0">
                {/* Gradient base layer — always visible as fallback */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

                {/* Real banner image */}
                {project.bannerImage && (
                  <img
                    src={project.bannerImage}
                    alt={`${project.title} banner`}
                    loading="lazy"
                    className="project-banner-img absolute inset-0 object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}

                {/* Dark + brand overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 pointer-events-none`} />

                {/* Icon bubble — bottom left */}
                <div className="absolute bottom-3 left-4 z-10">
                  <div className="w-11 h-11 bg-black/30 rounded-xl flex items-center justify-center backdrop-blur-md text-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                </div>

                {/* Period badge — top right */}
                {project.period && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-xs bg-black/50 text-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {project.period}
                    </span>
                  </div>
                )}
              </div>


              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Key Features:</p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-slate-600/30 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
