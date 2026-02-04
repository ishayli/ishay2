import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}

interface Recommendation {
  id: number;
  text: string;
  author: string;
  role: string;
}

interface Experience {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string[];
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, title: "Shekem Electric", description: "SEO & Web Development Project", link: "https://shekem-electric.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(12).jpg?updatedAt=1747675850373" },
  { id: 2, title: "Aeronautics Systems", description: "Web Development & SEO Optimization", link: "https://aeronautics-sys.com", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(5).jpg?updatedAt=1747675850313" },
  { id: 3, title: "Commtact", description: "Website Design & Development", link: "https://commtact-systems.com/", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(7).jpg?updatedAt=1747675854108" },
  { id: 4, title: "Student", description: "Educational Platform Development", link: "https://www.student.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(4).jpg?updatedAt=1747675850299" },
  { id: 5, title: "Kav Lahinuch", description: "Educational Website Development", link: "http://kav-lahinuch.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(2).jpg?updatedAt=1747675850454" },
  { id: 6, title: "Naama Levanat", description: "Personal Brand Website", link: "https://naamalevanat.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(11).jpg?updatedAt=1747675854267" },
  { id: 7, title: "Sharing HR", description: "HR Platform Development", link: "http://www.sharing-hr.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(3).jpg?updatedAt=1747675850757" },
  { id: 8, title: "Jambi", description: "E-commerce Development", link: "https://jambi.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(8).jpg?updatedAt=1747675854896" },
  { id: 9, title: "Algoma", description: "Corporate Website", link: "http://www.algoma.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(13).jpg?updatedAt=1747675850326" },
  { id: 10, title: "STL Ghana", description: "International Business Website", link: "https://www.stlghana.com", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(6).jpg?updatedAt=1747675854161" },
  { id: 11, title: "BHN Energies Gmbh", description: "Sustainable Energy Company", link: "https://bhn-energies.com/", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(9).jpg?updatedAt=1747675854084" },
  { id: 12, title: "Unique Light", description: "E-commerce & Product Showcase", link: "http://www.unique-light.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(10).jpg?updatedAt=1747675854041" },
  { id: 13, title: "Mazor Insurance", description: "Insurance Services Website", link: "http://www.mazor-ins.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design.png?updatedAt=1747675851125" },
  { id: 14, title: "Blogeristit", description: "Blogging Platform", link: "https://www.blogeristit.com", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(1).jpg?updatedAt=1747675850359" },
  { id: 15, title: "Info Electric", description: "Electrical Industry Information Portal", link: "http://www.infoelectric.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design%20(1).png?updatedAt=1747675850931" },
  { id: 16, title: "Asaf Shefer", description: "Personal Brand Website", link: "https://asafshefer.co.il", image: "https://ik.imagekit.io/dog9jpsfm/Untitled%20design.jpg?updatedAt=1747675850397" },
];

const recommendations: Recommendation[] = [
  { id: 1, text: "Ishay Lindenberg is a courteous, honest, and outstanding internet professional. He has designed, upgraded, and managed the internet project for the Tel Aviv Beach Rescue Organization and continues to provide support for the website's management. Throughout this process, he has demonstrated great patience, attention to detail, excellent interpersonal skills, and a keen ability to listen and understand our needs.", author: "Naamit Mor Chaim", role: "Director & Publicist, Tel Aviv Beach Rescue Organization" },
  { id: 2, text: "Mr. Ishay Lindenberg performed his duties with professionalism, thoroughness, and responsibility, demonstrating extensive knowledge in the fields of internet technologies, project management, and SEO, excelling in his area of expertise. His interpersonal relationships with colleagues were excellent, characterized by collaboration, courtesy, consideration for others, and reliability.", author: "Elik Cohen", role: "CEO, Daronet Ltd." },
  { id: 3, text: "Mr. Lindenberg carried out his work with the utmost professionalism, demonstrating responsibility, thoroughness, meticulous attention to detail, and extensive knowledge in the field. He is a person of integrity with excellent interpersonal skills, consistently fostering seamless collaboration, attentiveness to client needs, and a proactive approach to providing the most efficient and effective solutions.", author: "Shari Ashpiz", role: "Chairperson, Chaim LeBaalei Chaim NGO" },
  { id: 4, text: "After a less successful experience with a previous instructor, I was fortunate to find an exceptional teacher in Ishay. He is highly professional, extremely knowledgeable, and possesses excellent teaching abilities, along with great patience and a genuine willingness to share his expertise and assist in every way necessary to help me advance in the field of website development.", author: "Yaara Barkan", role: "Website Developer" },
  { id: 5, text: "Through Ishay's support, I gained valuable insights, solutions, and innovative ideas that significantly contributed to my website's growth, helping me reach my target audience and strengthen the Sharing HR brand. During our collaboration, I discovered Ishay to be highly professional, creative, innovative, and adaptable, always attentive and tailoring solutions to meet my website's specific needs.", author: "Michal Magen", role: "Founder of Sharing HR" },
  { id: 6, text: "Thank you very much for building my website and for designing it strategically to match my target audience in an intelligent and thoughtful manner. Your guidance and explanations were highly professional and extremely helpful, enabling me to manage and operate the website independently moving forward.", author: "Assaf Shefer", role: "Personal Brand" },
  { id: 7, text: "Ishay is an inspiring technologist and project manager who motivates his team to tackle any task. His open-mindedness and teamwork foster a positive work environment. It was a pleasure to witness his creativity and a privilege to work with him.", author: "Avishai Becker", role: "Programmatic Expert | Digital Strategist" },
  { id: 8, text: "I had the pleasure of working alongside Ishay at Daronet, where we were part of the same Project/Product Management team. From the beginning, it was clear that he is an exceptional professional with a deep understanding of SEO project strategy. He is detail-oriented, and his projects were always delivered on time. Beyond his technical skills, Ishay is a fantastic team player.", author: "Dana Ber Gerber", role: "Sr Product Manager @ Getida" },
];

const experiences: Experience[] = [
  {
    id: 1,
    date: "Jan 2022 - Apr 2024",
    title: "Operational Specialist",
    company: "World Chess | Berlin, Germany",
    description: [
      "Established and led a strategic department for a global chess organization, implementing scalable operational frameworks that drove 80% growth in customer engagement.",
      "Designed and optimized cross-functional processes that enhanced member experiences and supported the company's international expansion initiatives.",
      "Collaborated with executive leadership to align operational strategies with long-term business objectives, resulting in improved efficiency and customer satisfaction metrics."
    ]
  },
  {
    id: 2,
    date: "Feb 2020 - Present",
    title: "Product Manager & Digital Strategist",
    company: "InterMind (Self employed) | Berlin, Germany",
    description: [
      "Developed and executed comprehensive digital strategies for European B2B clients, including a German renewable energy company that saw a 40% increase in user engagement.",
      "Managed end-to-end product development cycles, from concept and market research to implementation and performance analysis.",
      "Orchestrated SEO optimization campaigns and programmatic advertising initiatives that consistently delivered measurable ROI for clients across diverse industries."
    ]
  },
  {
    id: 3,
    date: "Mar 2014 - Jan 2020",
    title: "Data Analyst, Trading Department",
    company: "Hiro Media | Berlin, Germany (Remote)",
    description: [
      "Led data-driven monetization strategies through advanced analysis of real-time traffic patterns and user behavior across multiple platforms.",
      "Optimized product performance through sophisticated analysis using enterprise-level tools including Tableau, Power BI, and custom analytics solutions.",
      "Contributed to the company's recognition as a Deloitte Technology \"Fast 50\" Startup winner for two consecutive years (2014-2015).",
      "Developed predictive models that increased advertising revenue by 35% while maintaining high-quality user experiences."
    ]
  },
  {
    id: 4,
    date: "Apr 2006 - Jan 2014",
    title: "Senior Project Manager, Team Lead",
    company: "Daronet Digital | Tel Aviv, Israel",
    description: [
      "Directed complex web development projects for enterprise clients, consistently delivering solutions on time and within budget while exceeding client expectations.",
      "Led and mentored a cross-functional team of developers and designers, fostering a collaborative environment that produced innovative digital solutions.",
      "Delivered an e-commerce platform redesign 15% under budget and 3 weeks ahead of schedule, resulting in a 25% increase in conversion rates.",
      "Successfully resolved critical technical challenges for a government website project, preventing potential delays and ensuring seamless implementation.",
      "Managed a $1.2M enterprise project, optimizing resource allocation to achieve 10% cost savings while maintaining exceptional quality standards."
    ]
  },
  {
    id: 5,
    date: "Jul 2005 - Feb 2006",
    title: "SEO Project Manager",
    company: "Proto sites (Sortex) | Tel Aviv, Israel",
    description: [
      "Developed and implemented comprehensive SEO strategies that significantly improved client website rankings and organic traffic metrics.",
      "Conducted in-depth website audits and competitive analysis to identify optimization opportunities and develop tailored SEO roadmaps.",
      "Collaborated with content and development teams to ensure technical SEO best practices were integrated into all client websites."
    ]
  }
];

const skills = {
  "Technologies": ["HTML, CSS, PHP, JavaScript", "SAAS, AWS", "Apache Server", "MS Office Suite", "Visual Studio"],
  "Design Tools": ["Adobe Photoshop", "GIMP", "Flash", "Dreamweaver"],
  "SEO Tools": ["Google Analytics", "Google Search Console", "SEMRush, Ahrefs, Moz", "Majestic SEO", "SEO Quake", "Screaming Frog"],
  "AdTech": ["Programmatic Advertising", "SSP/DSP Platforms", "Media Math, Appnexus", "Sitescout", "Visualization tools (Tableau, Looker)"],
  "AI Tools": ["OpenAI (ChatGPT, DALL-E)", "Anthropic Claude", "Google Gemini", "Midjourney & Stable Diffusion", "AI-powered analytics platforms", "AI content optimization tools", "Hugging Face", "LangChain", "AutoGPT", "Bing Chat"],
  "Product Management": ["Agile methodologies", "Project lifecycle management", "User experience design", "Stakeholder management", "Product strategy"]
};

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particle Animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100
      });
    }

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.3;
          particle.vy -= (dy / dist) * force * 0.3;
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.5, particle.color + '60');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Hero Section Animations
    const tl = gsap.timeline();

    tl.fromTo(heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(titleRef.current,
      { y: 80, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" },
      "-=1"
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(summaryRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(contactRef.current?.children || [],
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.4"
    );

    // Section Animations
    gsap.utils.toArray<HTMLElement>('.section-title').forEach((title: HTMLElement) => {
      gsap.fromTo(title,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Portfolio Grid Animations
    gsap.utils.toArray<HTMLElement>('.portfolio-item').forEach((item, i) => {
      gsap.fromTo(item,
        { y: 100, opacity: 0, scale: 0.8, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          delay: i * 0.05,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animation
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.05, y: -10, duration: 0.4, ease: "power2.out" });
        gsap.to(item.querySelector('.portfolio-image img'), { scale: 1.15, duration: 0.6, ease: "power2.out" });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(item.querySelector('.portfolio-image img'), { scale: 1, duration: 0.6, ease: "power2.out" });
      });
    });

    // Timeline Animations
    gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -150 : 150, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Skills Cards
    gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.8, rotateY: -30 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Recommendations
    gsap.utils.toArray<HTMLElement>('.recommendation-item').forEach((item, i) => {
      gsap.fromTo(item,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Floating animation for tech icons
    gsap.utils.toArray<HTMLElement>('.tech-icon').forEach((icon, i) => {
      gsap.to(icon, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      });
    });

    // Magnetic cursor effect
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e: any) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.4)"
        });
      });
    });

  }, []);

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recommendations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-indigo-900/20 to-slate-950/80 z-10" />
        
        {/* Floating Tech Icons */}
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
          {['🤖', '⚡', '🎯', '🚀', '💡', '📊', '🔧', '🌐'].map((icon, i) => (
            <div
              key={i}
              className="tech-icon absolute text-4xl md:text-6xl opacity-20"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${15 + ((i * 17) % 70)}%`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow: '0 0 80px rgba(59, 130, 246, 0.6)'
              }}
            >
              Ishay Lindenberg
            </h1>
          </div>
          
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-blue-200 mb-6 font-semibold tracking-wide"
          >
            Digital Product Strategy & GEO/SEO Growth Leader
          </p>
          
          <p
            ref={summaryRef}
            className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed px-4"
          >
            With over 20 years of experience in the high-tech sector, I specialise in driving organic growth and operational excellence for B2B platforms, marketplaces, and content-driven products. My expertise lies at the intersection of Technical SEO, Product Management, and Generative AI, where I develop strategies that satisfy both human users and AI-driven search models.
          </p>
          
          <div ref={contactRef} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            <a
              href="tel:+4917671206323"
              className="magnetic group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-semibold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-400/60 hover:shadow-3xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                📞 +49 17671206323
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="mailto:ishay.lindenberg@gmail.com"
              className="magnetic group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-400/60 hover:shadow-3xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                📧 Email Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="https://linkedin.com/in/ishay-l"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic group relative px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-blue-600/40 hover:shadow-blue-500/60 hover:shadow-3xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                💼 LinkedIn
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-blue-300 text-sm font-medium">Scroll to explore</span>
            <div className="w-8 h-14 border-3 border-blue-400 rounded-full flex justify-center p-3">
              <div className="w-2 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center text-lg md:text-xl mb-16 max-w-3xl mx-auto">
            A curated selection of projects that demonstrate my expertise in digital strategy, SEO optimization, and web development
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-item group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/80 transition-all duration-500"
                style={{ perspective: '1200px' }}
              >
                <div className="portfolio-image aspect-video overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-800"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm md:text-base transition-colors group/link"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">View Project</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-gray-400 text-center text-lg md:text-xl mb-16 max-w-2xl mx-auto">
            Recommendations from colleagues, clients, and industry leaders
          </p>
          
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {recommendations.map((rec) => (
                  <div key={rec.id} className="recommendation-item min-w-full px-4 md:px-8">
                    <div className="relative bg-gradient-to-br from-slate-800/95 via-blue-900/50 to-slate-900/95 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-blue-500/30 backdrop-blur-xl overflow-hidden">
                      {/* Quote icon */}
                      <div className="absolute top-6 left-8 text-8xl md:text-9xl text-blue-400/15 font-serif leading-none">
                        "
                      </div>
                      
                      <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed relative z-10">
                        {rec.text}
                      </p>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-500/50 flex-shrink-0">
                          {rec.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-cyan-400 font-bold text-xl md:text-2xl mb-1">
                            {rec.author}
                          </p>
                          <p className="text-gray-400 text-base md:text-lg italic">
                            {rec.role}
                          </p>
                        </div>
                      </div>
                      
                      {/* Closing quote */}
                      <div className="absolute bottom-8 right-12 text-8xl md:text-9xl text-blue-400/10 font-serif leading-none">
                        "
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="magnetic absolute left-0 md:-left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 hover:scale-110"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="magnetic absolute right-0 md:-right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 hover:scale-110"
            >
              →
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {recommendations.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-4 h-4 rounded-full transition-all duration-400 ${i === currentSlide ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 w-12 shadow-lg shadow-blue-500/60' : 'bg-slate-600 hover:bg-slate-500'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-center text-lg md:text-xl mb-16 max-w-3xl mx-auto">
            A comprehensive toolkit of skills and technologies accumulated over 20 years of industry experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="skill-card group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl p-8 md:p-10 backdrop-blur-xl border border-slate-700/60 hover:border-blue-500/80 transition-all duration-500 overflow-hidden"
                style={{ perspective: '1000px' }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-2xl md:text-3xl font-black text-cyan-400 mb-8 flex items-center gap-4 relative z-10">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-blue-500/50">
                    {category === 'Technologies' && '💻'}
                    {category === 'Design Tools' && '🎨'}
                    {category === 'SEO Tools' && '📊'}
                    {category === 'AdTech' && '📈'}
                    {category === 'AI Tools' && '🤖'}
                    {category === 'Product Management' && '🎯'}
                  </span>
                  {category}
                </h3>
                <ul className="space-y-3 relative z-10">
                  {items.map((skill, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-300 group/item p-2 rounded-xl hover:bg-white/5"
                    >
                      <span className="text-cyan-400 text-xl mt-0.5 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300">
                        ▹
                      </span>
                      <span className="text-base md:text-lg leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-gray-400 text-center text-lg md:text-xl mb-20 max-w-2xl mx-auto">
            Over 20 years of experience driving growth and innovation in the high-tech sector
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600 rounded-full transform md:-translate-x-1/2 shadow-lg shadow-blue-500/50" />
            
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`timeline-item relative mb-16 last:mb-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-12 md:ml-auto md:w-1/2'} pl-12 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-auto top-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 border-4 border-slate-950 transform -translate-x-1/2 md:translate-x-0 shadow-xl shadow-blue-500/60 ${i % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'}`}>
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                </div>
                
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-3xl p-8 md:p-10 backdrop-blur-xl border border-slate-700/60 hover:border-blue-500/80 transition-all duration-500 group overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 rounded-full text-sm md:text-base font-bold mb-5 border border-cyan-400/30 relative z-10">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 relative z-10">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg italic mb-6 relative z-10">
                    {exp.company}
                  </p>
                  <ul className={`space-y-3 ${i % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                    {exp.description.map((desc, j) => (
                      <li key={j} className="text-gray-300 flex items-start gap-3 group/item relative z-10">
                        <span className="text-cyan-400 text-xl mt-1 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300">
                          ▸
                        </span>
                        <span className="text-sm md:text-base leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            <a
              href="https://linkedin.com/in/ishay-l"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic group relative px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-blue-600 hover:to-indigo-700 rounded-2xl font-bold text-lg transition-all duration-400 border border-slate-700 hover:border-blue-500 shadow-xl hover:shadow-blue-500/40 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                💼 LinkedIn Profile
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="mailto:ishay.lindenberg@gmail.com"
              className="magnetic group relative px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-cyan-600 hover:to-blue-700 rounded-2xl font-bold text-lg transition-all duration-400 border border-slate-700 hover:border-cyan-500 shadow-xl hover:shadow-cyan-500/40 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                📧 Get in Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="https://ilmedia.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic group relative px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-purple-600 hover:to-pink-700 rounded-2xl font-bold text-lg transition-all duration-400 border border-slate-700 hover:border-purple-500 shadow-xl hover:shadow-purple-500/40 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                🌐 Personal Website
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
          
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-10" />
          
          <p className="text-gray-400 text-lg md:text-xl mb-4">
            © 2025 Ishay Lindenberg. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            Crafted with 💡 innovation and 🚀 passion for digital excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;