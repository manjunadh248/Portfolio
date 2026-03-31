
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Download, X } from 'lucide-react';
import CertificateModal from './CertificateModal';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  icon: string;
  gradient: string;
  title: string;
  issuer: string;
  date: string;
  previewUrl?: string;
  downloadUrl?: string;
}

const certificates: Certificate[] = [
  {
    icon: '☁️',
    gradient: 'from-orange-400 to-amber-500',
    title: 'Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle',
    date: "Feb '25",
    previewUrl: '/uploads/certificates/oracle.png',
    downloadUrl: '/uploads/certificates/oracle.png',
  },
  {
    icon: '📊',
    gradient: 'from-cyan-400 to-blue-600',
    title: 'Google Analytics: Data Collection & Processing',
    issuer: 'Google Skillshop',
    date: "Sep '25",
    previewUrl: 'https://skillshop.exceedlms.com/student/collection/1/course/1',
    downloadUrl: 'https://skillshop.exceedlms.com/student/collection/1/course/1',
  },
  {
    icon: '🗃️',
    gradient: 'from-green-400 to-teal-500',
    title: 'Structured Query Language (SQL)',
    issuer: 'HackerRank',
    date: "Oct '25",
    previewUrl: 'https://www.hackerrank.com/certifications/sql',
    downloadUrl: 'https://www.hackerrank.com/certifications/sql',
  },
  {
    icon: '💻',
    gradient: 'from-purple-400 to-violet-600',
    title: 'Mastering C++ Language',
    issuer: 'Udemy',
    date: "Mar '25",
    previewUrl: 'https://www.udemy.com/course/beginning-c-plus-plus-programming',
    downloadUrl: 'https://www.udemy.com/course/beginning-c-plus-plus-programming',
  },
];

const Certificates: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title
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

    // Cards
    gsap.set('.cert-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.to('.cert-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cert-card',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // Hover
    document.querySelectorAll('.cert-card').forEach((card) => {
      const handleEnter = () =>
        gsap.to(card, { y: -8, boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)', duration: 0.3, ease: 'power2.out' });
      const handleLeave = () =>
        gsap.to(card, { y: 0, boxShadow: '0 0 0 rgba(168,85,247,0)', duration: 0.3, ease: 'power2.out' });
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="py-24 px-6 bg-slate-800/30 relative overflow-hidden"
    >
      {/* Divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #a855f7, transparent)' }}
      />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm mb-6">
            📜 Verified Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Certificates
            </span>
          </h2>
        </div>

        {/* Certificates in grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="cert-card bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden group cursor-default"
            >
              {/* Top gradient banner */}
              <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  {/* Icon bubble */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white font-medium text-sm leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                        {cert.title}
                      </h3>
                      {/* Verified badge */}
                      <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Verified ✓
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{cert.issuer}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{cert.date}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  {cert.previewUrl && (
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  )}
                  {cert.downloadUrl && (
                    <button
                      onClick={() => window.open(cert.downloadUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Preview Modal */}
        {selectedCert && (
          <CertificateModal
            isOpen={Boolean(selectedCert)}
            onClose={() => setSelectedCert(null)}
            title={selectedCert.title}
            issuer={selectedCert.issuer}
            previewUrl={selectedCert.previewUrl || ''}
            downloadUrl={selectedCert.downloadUrl || ''}
            status={`✓ ${selectedCert.issuer}`}
          />
        )}
      </div>

      {/* Divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #a855f7, #22d3ee, transparent)' }}
      />
    </section>
  );
};

export default Certificates;
