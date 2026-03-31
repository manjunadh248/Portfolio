
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  gradient: string;
  icon: string;
}

const educationData: EducationEntry[] = [
  {
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    location: 'Punjab, India',
    period: "Aug '23 – Present",
    score: 'CGPA: 7.69',
    gradient: 'from-cyan-400 to-blue-600',
    icon: '🎓',
  },
  {
    institution: 'Narayana College',
    degree: 'Intermediate',
    location: 'Kakinada, Andhra Pradesh',
    period: "Mar '22 – Apr '23",
    score: 'Percentage: 80.5%',
    gradient: 'from-purple-400 to-violet-600',
    icon: '📚',
  },
  {
    institution: 'Narayana Public School',
    degree: 'Matriculation',
    location: 'Kakinada, Andhra Pradesh',
    period: "Mar '20 – Apr '21",
    score: 'Percentage: 96.2%',
    gradient: 'from-green-400 to-emerald-600',
    icon: '🏫',
  },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.set(titleRef.current, { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Entry animations
    entriesRef.current.forEach((entry, index) => {
      if (!entry) return;
      const xFrom = index % 2 === 0 ? -60 : 60;
      gsap.set(entry, { opacity: 0, x: xFrom, scale: 0.95, filter: 'blur(8px)' });
      gsap.to(entry, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Hover animations
    entriesRef.current.forEach((card) => {
      if (!card) return;
      const handleEnter = () =>
        gsap.to(card, {
          y: -8,
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)',
          duration: 0.3,
          ease: 'power2.out',
        });
      const handleLeave = () =>
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
          duration: 0.3,
          ease: 'power2.out',
        });
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 px-6 bg-slate-900/50 relative overflow-hidden"
    >
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)',
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            🎓 Academic Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Education
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, #22d3ee, #8b5cf6, #22d3ee)',
            }}
          />

          <div className="space-y-10 pl-14 md:pl-20">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="relative"
                ref={(el) => {
                  if (el) entriesRef.current[index] = el;
                }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 md:-left-[3.85rem] top-6 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-900 pulse-glow"
                  style={{ boxShadow: '0 0 10px 2px rgba(34,211,238,0.5)' }}
                />

                {/* Card */}
                <div className="glassmorphic rounded-2xl p-6 md:p-8 cursor-default">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-2xl">{edu.icon}</span>
                        <h3 className="text-xl font-medium text-white">{edu.institution}</h3>
                      </div>
                      <p
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${edu.gradient} font-medium text-sm`}
                      >
                        {edu.degree}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">{edu.location}</p>
                    </div>
                    <span className="text-slate-400 text-sm font-medium whitespace-nowrap flex-shrink-0 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      {edu.period}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${edu.gradient} bg-opacity-20 text-white text-sm rounded-full border border-white/10 font-medium`}>
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)',
        }}
      />
    </section>
  );
};

export default Education;
