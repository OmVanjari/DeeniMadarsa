import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Award, BookOpen, GraduationCap, Users, Target, Eye,
  ArrowRight, Quote, CheckCircle2, Landmark, Heart
} from "lucide-react";

// Count-up hook — animates from 0 to `end` when `active` becomes true
function useCountUp(end: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

// Single animated stat card
const StatCard = ({
  icon: Icon, end, suffix, labelKey, color, active,
}: {
  icon: React.ElementType; end: number; suffix: string;
  labelKey: string; color: string; active: boolean;
}) => {
  const { t } = useLanguage();
  const count = useCountUp(end, 1800, active);
  return (
    <div className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="font-heading text-3xl font-bold text-teal-700 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1 leading-snug">{t(labelKey)}</div>
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users,         end: 500, suffix: "+", labelKey: "about.achievements.students",  color: "from-teal-500 to-teal-700" },
    { icon: GraduationCap, end: 200, suffix: "+", labelKey: "about.achievements.graduates", color: "from-emerald-500 to-emerald-700" },
    { icon: Award,         end: 25,  suffix: "+", labelKey: "about.achievements.years",     color: "from-amber-500 to-amber-700" },
    { icon: BookOpen,      end: 50,  suffix: "+", labelKey: "about.achievements.scholars",  color: "from-cyan-500 to-cyan-700" },
  ];

  const timeline = [
    { year: "2004", text: "Darul Uloom Junediya Ajmatia founded on 1 March 2004 by Hazrat Syed Akmal Ahmad Ajmali Rahmatullah Alaih.", side: "left" },
    { year: "2006", text: "First batch of students completed primary education. Enrolment grew steadily with community support.", side: "right" },
    { year: "2010", text: "New building constructed — 14 rooms, 3 large halls, 1 office and 1 library added to the campus.", side: "left" },
    { year: "2015", text: "Curriculum expanded to Class 1–8 covering Science, Math, English, Hindi, Urdu and Deeniyat.", side: "right" },
    { year: "2024", text: "Crossed 500+ students milestone with a dedicated team of 7 qualified teachers and staff.", side: "left" },
  ];

  const values = [
    { icon: CheckCircle2, title: "Authentic Knowledge",   desc: "Rooted in Quran and Sunnah, every lesson is grounded in authentic Islamic scholarship." },
    { icon: Heart,        title: "Compassionate Teaching", desc: "Our teachers nurture every student with patience, care, and individual attention." },
    { icon: Landmark,     title: "Community Service",     desc: "We serve the wider community through outreach, events, and free education programs." },
    { icon: Target,       title: "Excellence",            desc: "We hold ourselves to the highest standards in both Islamic and moral education." },
  ];

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg" alt="About hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center py-24">
          <div>
            <span className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 animate-fade-in">
              Est. 1998
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight animate-fade-up">
              {t("about.title")}
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {t("about.preview.text")}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-xl hover:scale-105 transition-all duration-200">
                <Link to="/contact">{t("hero.apply")}</Link>
              </Button>
              <Button asChild size="lg"
                className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-8 hover:scale-105 transition-all duration-200 shadow-none">
                <Link to="/donation">{t("hero.donate")}</Link>
              </Button>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-72 h-72">
              {/* Rotated background frame */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 rotate-6" />
              {/* Main image card */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/20 -rotate-3 shadow-2xl">
                <img
                  src="/building.jpeg"
                  alt="Darul Uloom Junediya Ajmatia Building"
                  className="w-full h-full object-cover"
                />
                {/* Label overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/90 to-transparent px-4 py-4">
                  <p className="font-heading text-white text-sm font-bold text-center">Darul Uloom Junediya Ajmatia</p>
                  <p className="text-white/70 text-xs text-center">Mehnd, Ghazipur — Est. 2004</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
              fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-white -mt-px">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <StatCard key={i} icon={s.icon} end={s.end} suffix={s.suffix} labelKey={s.labelKey} color={s.color} active={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section className="py-20 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3 block">Our Story</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{t("about.history.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.history.text")}</p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-teal-50/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">Milestones</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Journey</h2>
          </div>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center gap-6 ${item.side === "right" ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:flex-row`}>
                  {/* Card */}
                  <div className="md:w-[calc(50%-2rem)] w-full">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-teal-100/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <span className="inline-block bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{item.year}</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow-md z-10" />
                  {/* Spacer */}
                  <div className="md:w-[calc(50%-2rem)] hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">Purpose</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-teal-700" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-5 shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.mission.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("about.mission.text")}</p>
              </div>
            </div>
            {/* Vision */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700" />
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-5 shadow-md">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.vision.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("about.vision.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 bg-teal-50/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">What Drives Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 transition-colors duration-300">
                  <v.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-heading text-base font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER'S MESSAGE ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">Words of Wisdom</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("about.founder.title")}</h2>
          </div>
          <div className="bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-8 opacity-20">
              <Quote className="w-20 h-20 text-white" />
            </div>
            <div className="absolute bottom-6 right-8 opacity-10 rotate-180">
              <Quote className="w-20 h-20 text-white" />
            </div>
            <p className="relative z-10 font-heading text-xl md:text-2xl text-white/90 italic leading-relaxed text-center">
              {t("about.founder.text")}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }} />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Join Our Community
              </h2>
              <p className="text-white/75 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Be part of a legacy of Islamic education. Apply today or support our mission through a donation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-10 rounded-full shadow-xl hover:scale-105 transition-all duration-200">
                  <Link to="/contact" className="flex items-center gap-2">
                    {t("hero.apply")} <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg"
                  className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-10 hover:scale-105 transition-all duration-200">
                  <Link to="/donation">{t("hero.donate")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default About;
