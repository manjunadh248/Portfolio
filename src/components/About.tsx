import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CertificateModal from './CertificateModal';
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const skillCategories = [{
    emoji: '🧠',
    title: 'Programming Languages',
    skills: ['C/C++', 'JavaScript', 'Python', 'Java', 'HTML', 'CSS', 'SQL']
  }, {
    emoji: '🌐',
    title: 'Frameworks & Libraries',
    skills: ['ReactJS', 'Pandas', 'NumPy', 'Scikit-Learn', 'Seaborn', 'Matplotlib']
  }, {
    emoji: '🔧',
    title: 'Tools & Platforms',
    skills: ['Linux', 'Git', 'GitHub', 'Maven', 'Gradle', 'Docker']
  }, {
    emoji: '💻',
    title: 'Core Competencies',
    skills: ['Data Structure & Algorithms', 'Operating System', 'Computer Networking']
  }, {
    emoji: '🚀',
    title: 'Soft Skills',
    skills: ['Time Management', 'Problem-Solving', 'Adaptability', 'Quick Learner']
  }];

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
    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      filter: 'blur(10px)'
    });
    gsap.set(imageRef.current, {
      x: -50
    });
    gsap.set(contentRef.current, {
      x: 50
    });
    gsap.set('.skill-category', {
      opacity: 0,
      y: 30
    });

    // Animate elements
    tl.to([imageRef.current, contentRef.current], {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }).to('.skill-category', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Image hover animation
    const profileImage = imageRef.current;
    if (profileImage) {
      const handleMouseEnter = () => {
        gsap.to(profileImage, {
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      const handleMouseLeave = () => {
        gsap.to(profileImage, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      profileImage.addEventListener('mouseenter', handleMouseEnter);
      profileImage.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        profileImage.removeEventListener('mouseenter', handleMouseEnter);
        profileImage.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);
  return (
    <>
      <section ref={sectionRef} className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div ref={imageRef} className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 p-1">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src="/uploads/profile.jpg" alt="Pradeep - Full-Stack Developer" className="w-full h-full object-cover object-top rounded-full scale-110" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Me</span>
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-6">I'm a Computer Science student at Lovely Professional University with a CGPA of 7.69, passionate about building AI-powered applications and full-stack web platforms. I've worked on projects integrating biometric verification, machine learning, and competitive programming tools. I love working with Python, JavaScript, and modern web frameworks, and I'm always eager to solve real-world problems with clean, efficient code.</p>

                {/* Resume Buttons – Preview + Download */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={() => setResumeModalOpen(true)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 hover:text-white hover:bg-white/10 font-medium px-5 py-3 rounded-xl transition-all duration-200"
                    style={{ transition: 'none' }}
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Preview Resume
                  </Button>
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/uploads/fd397f5f-a602-4776-b7d2-4077a1df25dc.png';
                      link.target = '_blank';
                      link.download = 'Pradeep_Resume.png';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-medium px-5 py-3 rounded-xl transition-all duration-200 shadow-lg"
                    style={{ transition: 'none' }}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </div>
              </div>

              <div ref={skillsRef}>
                <h3 className="text-2xl font-light text-white mb-6">Skills</h3>
                <div className="space-y-4">
                  {skillCategories.map((category, index) => <Collapsible key={category.title} className="skill-category">
                    <CollapsibleTrigger className="w-full glassmorphic p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.emoji}</span>
                          <h4 className="text-white font-medium text-left">{category.title}</h4>
                        </div>
                        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="pt-3 pb-1 px-4">
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-slate-300 text-sm rounded-full border border-white/10 hover:border-white/20 transition-colors duration-200">
                            {skill}
                          </span>)}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Preview Modal */}
      {resumeModalOpen && (
        <CertificateModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
          title="Pradeep's Resume"
          issuer="Full-Stack Developer & AI/ML Enthusiast"
          previewUrl="/uploads/cv_resume.png"
          downloadUrl="/uploads/cv_resume.png"
          status="📄 Resume"
        />
      )}
    </>
  );
};

export default About;
