import { useState, useEffect, useCallback, useRef } from "react";
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

const slides = [
  { id: 1, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg",    badge: "Est. 2004",      titleKey: "hero.welcome",      subtitleKey: "hero.subtitle" },
  { id: 2, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).jpeg", badge: "20+ سال",        titleKey: "courses.title",     subtitleKey: "courses.subtitle" },
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
  const [isAnimating, setIsAnimating] = useState(false);
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

  const news = [
    {
      tag: "📌 " + (t("nav.home") === "ہوم" ? "پن کیا گیا" : "Pinned"),
      date: "10 اپریل 2026",
      title: t("nav.home") === "ہوم"
        ? "2026-27 تعلیمی سال کے لیے داخلے کھلے ہیں"
        : "New Admissions Open for 2026–27 Academic Year",
      desc: t("nav.home") === "ہوم"
        ? "دارالعلوم جنیدیہ اجماتیہ میں حفظ القرآن، ناظرہ قرآن اور کلاس 1 تا 8 کے لیے داخلے شروع ہو گئے ہیں۔ نشستیں محدود ہیں۔"
        : "Darul Uloom Junediya Ajmatia is now accepting applications for Hifz, Nazra and Class 1–8. Limited seats — apply early.",
      color: "from-teal-500 to-emerald-600",
      wide: true,
    },
    {
      tag: "🎉 " + (t("nav.home") === "ہوم" ? "تقریب" : "Event"),
      date: "5 اپریل 2026",
      title: t("nav.home") === "ہوم" ? "سالانہ قرآن تلاوت مقابلہ" : "Annual Quran Recitation Competition",
      desc: t("nav.home") === "ہوم"
        ? "تمام طلباء اور کمیونٹی کے لیے سالانہ قرآن تلاوت مقابلے میں شرکت کریں۔"
        : "Join our yearly Quran recitation event open to all students and community members.",
      color: "from-emerald-500 to-emerald-700",
      wide: false,
    },
    {
      tag: "📢 " + (t("nav.home") === "ہوم" ? "اطلاع" : "Notice"),
      date: "28 مارچ 2026",
      title: t("nav.home") === "ہوم" ? "عید کی تعطیلات کا شیڈول" : "Eid Holiday Schedule",
      desc: t("nav.home") === "ہوم"
        ? "مدرسہ 18 تا 22 اپریل عید کی تعطیلات کی وجہ سے بند رہے گا۔ کلاسیں 23 اپریل سے شروع ہوں گی۔"
        : "Madarsa closed April 18–22 for Eid. Classes resume April 23.",
      color: "from-yellow-500 to-yellow-700",
      wide: false,
    },
  ];

  return (
    <Layout>
      {/* ── SLIDER HERO ── */}
      <section className="relative h-[75vh] sm:h-[85vh] min-h-[480px] overflow-hidden">
        {slides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt={`slide-${s.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        ))}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
          <span key={`badge-${current}`}
            className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 sm:mb-6 animate-fade-in">
            {slide.badge}
          </span>
          <h1 key={`title-${current}`}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl leading-tight animate-fade-up">
            {t(slide.titleKey)}
          </h1>
          <p key={`sub-${current}`}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mb-8 animate-fade-up px-2"
            style={{ animationDelay: "0.15s" }}>
            {t(slide.subtitleKey)}
          </p>
          <div className="flex flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full transition-all duration-200 hover:scale-105">
              <Link to="/donation">{t("hero.donate")}</Link>
            </Button>
          </div>
        </div>
        <button onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2.5 bg-yellow-500" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <StatCard key={i} icon={s.icon} end={s.end} suffix={s.suffix} labelKey={s.labelKey} color={s.color} active={statsVisible} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
            <div className="relative max-w-xs sm:max-w-sm mx-auto w-full">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-teal-900/20">
                <img src="/building.jpeg" alt="Darul Uloom Junediya Ajmatia" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-yellow-600 text-white rounded-xl px-4 py-2 shadow-lg">
                <div className="font-heading text-xl font-bold">2004</div>
                <div className="text-xs opacity-90">Est. 1 March</div>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3 block">
                {t("nav.home") === "ہوم" ? "ہمارے بارے میں" : "Who We Are"}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("about.preview.title")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {t("about.preview.text")}
              </p>
              <div className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-100 rounded-xl mb-6">
                <Quote className="w-7 h-7 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-sm text-teal-800 italic leading-relaxed">{t("about.founder.text")}</p>
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
      <section className="py-16 sm:py-20 bg-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
              {t("nav.home") === "ہوم" ? "ہم کیا پیش کرتے ہیں" : "What We Offer"}
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
              {t("nav.home") === "ہوم" ? "تازہ ترین اپڈیٹس" : "Latest Updates"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("nav.home") === "ہوم" ? "اعلانات اور خبریں" : "Announcements & News"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("nav.home") === "ہوم" ? "دارالعلوم جنیدیہ اجماتیہ کی تازہ ترین خبریں" : "Stay updated with the latest from Darul Uloom Junediya Ajmatia"}
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

      {/* ── FACULTY ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">
              {t("nav.home") === "ہوم" ? "ہماری ٹیم" : "Meet The Team"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">{t("faculty.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("faculty.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {teachers.map((tc) => (
              <div key={tc.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/60 text-center">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                <div className="p-6 sm:p-8">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-4 border-teal-100 shadow-lg mb-4 group-hover:border-teal-400 transition-colors duration-300">
                    <img src={tc.img} alt={t(tc.nameKey)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
                  <p className="text-teal-600 text-xs sm:text-sm font-medium mt-1">{t(tc.titleKey)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t(tc.qualKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATION CTA ── */}
      <section className="py-12 sm:py-16 bg-white">
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
