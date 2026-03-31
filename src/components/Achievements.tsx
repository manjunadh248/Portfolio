
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Download, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AchievementCard {
  icon: string;
  gradient: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  link?: string;
}

const achievements: AchievementCard[] = [
  {
    icon: '💻',
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Solved 350+ Coding Problems',
    subtitle: 'Competitive Programming',
    date: "Nov '25",
    description:
      'Solved 350+ coding problems across Codeforces, LeetCode, GFG, and HackerRank, sharpening problem-solving skills and algorithmic thinking.',
  },
  {
    icon: '🏆',
    gradient: 'from-purple-400 to-violet-600',
    title: 'Top 3 Team – "Code of Duty" Hackathon',
    subtitle: 'Web Development Hackathon',
    date: "Nov '25",
    description:
      'Secured Top 3 Team Position in "Code of Duty" Web Hackathon, demonstrating strong problem solving, collaboration, and full-stack development skills.',
  },
  {
    icon: '🥇',
    gradient: 'from-green-400 to-emerald-600',
    title: 'Gold Medal in Kabaddi',
    subtitle: 'Athletic Achievement – Lovely Professional University',
    date: "Dec '23",
    description:
      'Awarded Gold Medal in Kabaddi at Lovely Professional University during 1st Semester for outstanding athletic performance and teamwork.',
  },
];

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

    // Achievement cards
    gsap.set('.achievement-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.to('.achievement-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.achievement-card',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // Hover
    document.querySelectorAll('.achievement-card').forEach((card) => {
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
          boxShadow: '0 0 0 rgba(168,85,247,0)',
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
      id="achievements"
      className="py-24 px-6 bg-slate-900/50 relative overflow-hidden"
    >
      {/* Section divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)' }}
      />

      {/* Background subtle glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-yellow-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* ACHIEVEMENTS */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            🏆 Milestones & Recognition
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            Achievements &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Honors
            </span>
          </h2>
        </div>

        {/* Achievement Cards – grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="achievement-card glassmorphic rounded-2xl p-6 cursor-default group"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-medium text-base leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-slate-500 text-xs flex-shrink-0 mt-0.5">{item.date}</span>
                  </div>
                  <p
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} text-xs font-medium mb-3`}
                  >
                    {item.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-cyan-400 text-xs hover:text-cyan-300 transition-colors duration-200 font-medium"
                      style={{ transition: 'none' }}
                    >
                      View Profile →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)' }}
      />
    </section>
  );
};

export default Achievements;
