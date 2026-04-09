import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, Heart, ChevronLeft, ChevronRight,
  Users, Award, Clock, Star, ArrowRight, Quote
} from "lucide-react";
import Layout from "@/components/Layout";
import teacher1 from "@/assets/teacher1.jpg";
import teacher2 from "@/assets/teacher2.jpg";
import teacher3 from "@/assets/teacher3.jpg";

// Slider slides using gradient backgrounds (no broken image deps)
const slides = [
  {
    id: 1,
    bg: "from-teal-900 via-teal-800 to-emerald-900",
    badge: "Est. 1998",
    titleKey: "hero.welcome",
    subtitleKey: "hero.subtitle",
    pattern: "☪",
  },
  {
    id: 2,
    bg: "from-emerald-900 via-teal-800 to-cyan-900",
    badge: "25+ Years",
    titleKey: "courses.title",
    subtitleKey: "courses.subtitle",
    pattern: "📖",
  },
  {
    id: 3,
    bg: "from-cyan-900 via-teal-900 to-emerald-800",
    badge: "500+ Students",
    titleKey: "donation.subtitle",
    subtitleKey: "donation.message",
    pattern: "🌙",
  },
];

const stats = [
  { icon: Users, value: "500+", labelKey: "about.achievements.students" },
  { icon: Award, value: "200+", labelKey: "about.achievements.graduates" },
  { icon: Clock, value: "25+", labelKey: "about.achievements.years" },
  { icon: Star, value: "50+", labelKey: "about.achievements.scholars" },
];

const Index = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const courses = [
    { nameKey: "course.hifz.name", descKey: "course.hifz.desc", durationKey: "course.hifz.duration", icon: BookOpen, color: "from-teal-500 to-teal-700" },
    { nameKey: "course.nazra.name", descKey: "course.nazra.desc", durationKey: "course.nazra.duration", icon: BookOpen, color: "from-emerald-500 to-emerald-700" },
    { nameKey: "course.alim.name", descKey: "course.alim.desc", durationKey: "course.alim.duration", icon: GraduationCap, color: "from-amber-500 to-amber-700" },
  ];

  const teachers = [
    { nameKey: "faculty.teacher1.name", titleKey: "faculty.teacher1.title", qualKey: "faculty.teacher1.qual", img: teacher1 },
    { nameKey: "faculty.teacher2.name", titleKey: "faculty.teacher2.title", qualKey: "faculty.teacher2.qual", img: teacher2 },
    { nameKey: "faculty.teacher3.name", titleKey: "faculty.teacher3.title", qualKey: "faculty.teacher3.qual", img: teacher3 },
  ];

  const slide = slides[current];

  return (
    <Layout>
      {/* ── IMAGE SLIDER HERO ── */}
      <section className="relative h-[90vh] min-h-[560px] overflow-hidden">
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 bg-gradient-to-br ${s.bg} transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
                backgroundSize: "30px 30px"
              }}
            />
          </div>
        ))}

        {/* Floating Arabic ornament */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-white/5 font-heading" style={{ fontSize: "clamp(200px, 40vw, 500px)", lineHeight: 1 }}>
            {slide.pattern}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span
            key={`badge-${current}`}
            className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 animate-fade-in"
          >
            {slide.badge}
          </span>
          <h1
            key={`title-${current}`}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 max-w-4xl leading-tight animate-fade-up"
          >
            {t(slide.titleKey)}
          </h1>
          <p
            key={`sub-${current}`}
            className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {t(slide.subtitleKey)}
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold text-base px-8 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-amber-500/40">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline"
              className="border-white/50 text-white hover:bg-white/10 font-semibold text-base px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105">
              <Link to="/donation">{t("hero.donate")}</Link>
            </Button>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2.5 bg-amber-400" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
              fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors duration-300">
                  <s.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="font-heading text-3xl font-bold text-teal-700">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-20 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Visual side */}
            <div className="relative">
              <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-800 flex items-center justify-center shadow-2xl shadow-teal-900/30">
                <span className="font-heading text-white/20 select-none" style={{ fontSize: "10rem", lineHeight: 1 }}>☪</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-white text-5xl font-bold text-center px-8 leading-tight drop-shadow-lg">
                    Al-Noor<br />Madarsa
                  </span>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl px-5 py-3 shadow-lg">
                <div className="font-heading text-2xl font-bold">1998</div>
                <div className="text-xs opacity-90">Est.</div>
              </div>
            </div>
            {/* Text side */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3 block">Who We Are</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("about.preview.title")}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t("about.preview.text")}
              </p>
              <div className="flex items-center gap-3 p-4 bg-teal-50 border border-teal-100 rounded-xl mb-6">
                <Quote className="w-8 h-8 text-teal-400 shrink-0" />
                <p className="text-sm text-teal-800 italic">{t("about.founder.text")}</p>
              </div>
              <Button asChild className="bg-teal-700 hover:bg-teal-600 text-white rounded-full px-7 group">
                <Link to="/about" className="flex items-center gap-2">
                  {t("about.preview.readmore")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="py-20 bg-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">What We Offer</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{t("courses.title")}</h2>
            <p className="text-muted-foreground">{t("courses.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courses.map((c, i) => (
              <div key={c.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/60">
                <div className={`h-2 bg-gradient-to-r ${c.color}`} />
                <div className="p-7">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-5 shadow-md`}>
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{t(c.nameKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t(c.descKey)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      {t(c.durationKey)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 rounded-full px-8">
              <Link to="/courses">{t("courses.title")} →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">Meet The Team</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{t("faculty.title")}</h2>
            <p className="text-muted-foreground">{t("faculty.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachers.map((tc) => (
              <div key={tc.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/60 text-center">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                <div className="p-8">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-teal-100 shadow-lg mb-5 group-hover:border-teal-400 transition-colors duration-300">
                    <img src={tc.img} alt={t(tc.nameKey)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
                  <p className="text-teal-600 text-sm font-medium mt-1">{t(tc.titleKey)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t(tc.qualKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATION CTA ── */}
      <section className="py-24 bg-white border-t border-teal-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-teal-600 animate-float" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
            {t("donation.subtitle")}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            {t("donation.text")}
          </p>
          <Button asChild size="lg"
            className="bg-teal-700 hover:bg-teal-600 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
            <Link to="/donation">{t("donation.button")}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
