import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, Heart, ChevronLeft, ChevronRight,
  Users, Award, Clock, Star, ArrowRight
} from "lucide-react";
import Layout from "@/components/Layout";

const slides = [
  { id: 1, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg",    badge: "Est. 2004",      titleKey: "hero.welcome",      subtitleKey: "hero.subtitle" },
  { id: 2, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg",    badge: "20+ سال",        titleKey: "courses.title",     subtitleKey: "courses.subtitle" },
  { id: 3, img: "/WhatsApp Image 2026-04-13 at 10.32.41 AM.jpeg",    badge: "500+ طلباء",     titleKey: "donation.subtitle", subtitleKey: "donation.message" },
];

const stats = [
  { icon: Users,  end: 500, suffix: "+", labelKey: "about.achievements.students",  color: "from-teal-500 to-teal-700" },
  { icon: Award,  end: 200, suffix: "+", labelKey: "about.achievements.graduates", color: "from-emerald-500 to-emerald-700" },
  { icon: Clock,  end: 20,  suffix: "+", labelKey: "about.achievements.years",     color: "from-yellow-600 to-yellow-700" },
  { icon: Star,   end: 14,  suffix: "",  labelKey: "about.achievements.scholars",  color: "from-cyan-500 to-cyan-700" },
];

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

const StatCard = ({ icon: Icon, end, suffix, labelKey, color, active, delay }: {
  icon: React.ElementType; end: number; suffix: string;
  labelKey: string; color: string; active: boolean; delay: number;
}) => {
  const { t } = useLanguage();
  const count = useCountUp(end, 1800, active);
  return (
    <div className="group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}>
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>
      <div className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 tabular-nums">{count}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 leading-snug">{t(labelKey)}</div>
    </div>
  );
};

const Index = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [aboutCurrent, setAboutCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const aboutSlides = [
    {
      id: 1,
      img: "/schoollogo.png",
      alt: "Darul Uloom Jameenia Ajmaliya Logo",
      imgClass: "w-[78%] h-[78%] object-contain",
      bgClass: "bg-gradient-to-br from-teal-50 to-teal-100",
    },
    {
      id: 2,
      img: "/building.jpeg",
      alt: "Darul Uloom Jameenia Ajmaliya Building",
      imgClass: "w-full h-full object-cover",
      bgClass: "bg-teal-100",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const nextAbout = useCallback(() => {
    setAboutCurrent((prevIdx) => (prevIdx + 1) % aboutSlides.length);
  }, [aboutSlides.length]);
  const prevAbout = useCallback(() => {
    setAboutCurrent((prevIdx) => (prevIdx - 1 + aboutSlides.length) % aboutSlides.length);
  }, [aboutSlides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const timer = setInterval(nextAbout, 4500);
    return () => clearInterval(timer);
  }, [nextAbout]);

  const courses = [
    { nameKey: "course.hifz.name", descKey: "course.hifz.desc", durationKey: "course.hifz.duration", icon: BookOpen, color: "from-teal-500 to-teal-700" },
    { nameKey: "course.nazra.name", descKey: "course.nazra.desc", durationKey: "course.nazra.duration", icon: BookOpen, color: "from-emerald-500 to-emerald-700" },
    { nameKey: "course.alim.name", descKey: "course.alim.desc", durationKey: "course.alim.duration", icon: GraduationCap, color: "from-amber-500 to-amber-700" },
  ];

  const teachers = [
    {
      nameKey: "faculty.member.manager",
      titleKey: "faculty.manager.title",
      qualKey: "faculty.manager.qual",
      img: "/manager.jpeg",
      ring: "border-teal-300",
      stripe: "from-teal-500 to-emerald-600",
      glow: "from-teal-100 to-emerald-100",
      imgPos: "object-[50%_22%]",
    },
    {
      nameKey: "faculty.member.tabrez",
      titleKey: "faculty.principal.title",
      qualKey: "faculty.principal.qual",
      img: "/principal.jpeg",
      ring: "border-amber-300",
      stripe: "from-amber-500 to-yellow-600",
      glow: "from-amber-100 to-yellow-100",
      imgPos: "object-[50%_20%]",
    },
    {
      nameKey: "faculty.member.jabir",
      titleKey: "faculty.viceprincipal.title",
      qualKey: "faculty.jabir.qual",
      img: "/vice principal.jpeg",
      ring: "border-cyan-300",
      stripe: "from-cyan-500 to-sky-600",
      glow: "from-cyan-100 to-sky-100",
      imgPos: "object-[50%_18%]",
    },
  ];

  const slide = slides[current];
  const founderMessage = t("about.founder.text");
  const founderParts = founderMessage.split("—");
  const founderQuote = founderParts[0]?.trim() ?? founderMessage;
  const founderName = founderParts.slice(1).join("—").trim();

  const news = [
    {
      tag: "📌 " + t("home.news.pinned"),
      date: "10 اپریل 2026",
      title: t("home.news.admission.title"),
      desc: t("home.news.admission.desc"),
      color: "from-teal-500 to-emerald-600",
      wide: true,
    },
    {
      tag: "🎉 " + t("home.news.event"),
      date: "5 اپریل 2026",
      title: t("home.news.quran.title"),
      desc: t("home.news.quran.desc"),
      color: "from-emerald-500 to-emerald-700",
      wide: false,
    },
    {
      tag: "📢 " + t("home.news.notice"),
      date: "28 مارچ 2026",
      title: t("home.news.eid.title"),
      desc: t("home.news.eid.desc"),
      color: "from-yellow-500 to-yellow-700",
      wide: false,
    },
  ];

  return (
    <Layout>
      {/* ── SLIDER HERO ── */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[450px] sm:min-h-[480px] overflow-x-hidden overflow-y-hidden">
        {slides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt={`slide-${s.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        ))}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-3 sm:px-6 md:px-8 w-full overflow-hidden">
          <span key={`badge-${current}`}
            className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 lg:mb-6 animate-fade-in">
            {slide.badge}
          </span>
          <h1 key={`title-${current}`}
            className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 max-w-4xl leading-tight animate-fade-up">
            {t(slide.titleKey)}
          </h1>
          <p key={`sub-${current}`}
            className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mb-4 sm:mb-6 lg:mb-8 animate-fade-up px-2"
            style={{ animationDelay: "0.15s" }}>
            {t(slide.subtitleKey)}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center items-start sm:items-center self-start sm:self-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-xs sm:text-sm px-5 sm:px-8 py-2 sm:py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 w-auto">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 font-semibold text-xs sm:text-sm px-5 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 w-auto">
              <Link to="/donation">{t("hero.donate")}</Link>
            </Button>
          </div>
        </div>
        <button onClick={prev}
          className="absolute left-1 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
        </button>
        <button onClick={next}
          className="absolute right-1 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
        </button>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-yellow-500" : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-8 sm:py-10 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-14 items-center">
            <div className="relative max-w-xs sm:max-w-sm mx-auto w-full">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl shadow-teal-900/20">
                {aboutSlides.map((item, index) => (
                  <div key={item.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === aboutCurrent ? "opacity-100" : "opacity-0"}`}>
                    <div className={`w-full h-full flex items-center justify-center ${item.bgClass}`}>
                      <img src={item.img} alt={item.alt} className={item.imgClass} />
                    </div>
                  </div>
                ))}

                <button
                  onClick={prevAbout}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-teal-900/25 hover:bg-teal-900/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextAbout}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-teal-900/25 hover:bg-teal-900/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {aboutSlides.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setAboutCurrent(index)}
                      className={`h-2 rounded-full transition-all ${index === aboutCurrent ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/90"}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-yellow-600 text-white rounded-xl px-4 py-2 shadow-lg">
                <div className="font-heading text-xl font-bold">2004</div>
                <div className="text-xs opacity-90">Est. 1 March</div>
              </div>
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-3 block">
                {t("about.whoweare")}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("about.preview.title")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {t("about.preview.text")}
              </p>
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
      <section className="py-8 sm:py-10 bg-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
              {t("courses.whatweoffer")}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("courses.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {courses.map((c) => (
              <Link to="/courses" key={c.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/60">
                <div className={`h-1.5 bg-gradient-to-r ${c.color}`} />
                <div className="p-5 sm:p-7">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 shadow-md`}>
                    <c.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">{t(c.nameKey)}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{t(c.descKey)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      {t(c.durationKey)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Button asChild className="bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-50 rounded-full px-8">
              <Link to="/courses">{t("courses.title")} →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
              {t("home.news.latest")}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("home.news.heading")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("home.news.subheading")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* Pinned wide card */}
            <div className="md:col-span-2 group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-1 transition-all duration-300">
              <div className={`h-1.5 bg-gradient-to-r ${news[0].color}`} />
              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-teal-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{news[0].tag}</span>
                  <span className="text-xs text-muted-foreground">{news[0].date}</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3">{news[0].title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{news[0].desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:gap-3 transition-all duration-200">
                  {t("hero.apply")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Side cards */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {news.slice(1).map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-1 transition-all duration-300">
                  <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">{item.tag}</span>
                      <span className="text-[10px] text-muted-foreground">{item.date}</span>
                    </div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTY SPOTLIGHT ── */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-background to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">
              {t("home.leadership.badge")}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{t("home.leadership.heading")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("home.leadership.subheading")}</p>
          </div>

          {/* Founder message moved from About page */}
          <div className="max-w-5xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-teal-100/70 shadow-lg overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-yellow-600" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 opacity-80" />
                    <div className="relative w-[13rem] sm:w-[14.5rem] lg:w-[16rem] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-amber-200 shadow-xl">
                      <img src="/founder.jpeg" alt="Founder" className="w-full h-full object-cover object-[50%_18%] transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">{t("about.founder.title")}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic">{founderQuote}</p>
                  {founderName && (
                    <p className="text-foreground text-base sm:text-lg font-bold mt-2">{founderName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {teachers.map((tc) => (
              <div key={tc.nameKey}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-teal-100/70 text-center w-full max-w-[21rem] md:max-w-none mx-auto">
                <div className={`h-1.5 bg-gradient-to-r ${tc.stripe}`} />
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className={`w-[12.5rem] sm:w-[13.5rem] lg:w-[14.5rem] aspect-[4/5] mx-auto p-1 rounded-2xl bg-gradient-to-br ${tc.glow} mb-3`}>
                    <div className={`w-full h-full rounded-xl overflow-hidden border-2 ${tc.ring} shadow-lg`}>
                      <img src={tc.img} alt={t(tc.nameKey)} className={`w-full h-full object-cover ${tc.imgPos} transition-transform duration-500 group-hover:scale-110`} loading="lazy" />
                    </div>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
                  <p className="text-teal-600 text-sm sm:text-base font-semibold mt-1">{t(tc.titleKey)}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t(tc.qualKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faculty" className="text-teal-700 font-semibold hover:text-teal-600 transition-colors">
              {t("home.leadership.viewFaculty")} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DONATION CTA ── */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-8 sm:p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }} />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 animate-float" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t("donation.subtitle")}
              </h2>
              <p className="text-white/75 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                {t("donation.text")}
              </p>
              <Button asChild size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold text-sm sm:text-base px-8 sm:px-10 rounded-full shadow-xl transition-all duration-200 hover:scale-105">
                <Link to="/donation">{t("donation.button")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
