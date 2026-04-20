import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { CourseAPI } from "@/lib/api";
import { BookOpen, GraduationCap, ArrowRight, Clock, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const { t } = useLanguage();

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await CourseAPI.getAll();
        setCourses(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const courseStyles = [
    { icon: BookOpen, color: "from-teal-500 to-teal-700" },
    { icon: BookOpen, color: "from-emerald-500 to-emerald-700" },
    { icon: GraduationCap, color: "from-yellow-600 to-yellow-700" },
  ];

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative h-auto sm:h-[80vh] min-h-0 flex items-start sm:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg" alt="Courses" className="w-full h-full object-cover scale-110 transition-transform duration-[8s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-emerald-900/82 to-green-950/88" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-600/15 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-12 sm:py-14 md:py-16 lg:py-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">{t("courses.whatweoffer")}</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            {t("courses.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-1 w-12 bg-yellow-400 rounded-full" />
            <div className="h-1 w-4 bg-yellow-400/50 rounded-full" />
            <div className="h-1 w-2 bg-yellow-400/25 rounded-full" />
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {t("hero.courses.desc")}
          </p>
          <div className="flex flex-row flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-full px-8 shadow-2xl shadow-yellow-900/40 hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 rounded-full px-8 hover:scale-105 transition-all duration-200">
              <Link to="/about">{t("about.preview.readmore")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 block leading-none translate-y-px" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section className="py-4 sm:py-5 lg:py-6 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-4"><span className="w-2 h-2 rounded-full bg-teal-500" /><span className="text-teal-700 text-xs font-bold uppercase tracking-widest">{t("courses.whatweoffer")}</span></div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("courses.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-5xl mx-auto">
            {courses.map((course, i) => {
              const style = courseStyles[i % courseStyles.length];
              return (
              <div key={course._id || i}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

                {course.image && course.image.url && (
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img src={course.image.url} alt={course.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {(!course.image || !course.image.url) && (
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-2.5 sm:mb-3 shadow-md`}>
                      <style.icon className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                    </div>
                  )}
                  <h3 className="font-heading text-sm sm:text-base lg:text-[17px] font-bold text-foreground mb-1.5 sm:mb-2">{course.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-2.5 sm:mb-3 line-clamp-3">{course.description}</p>

                  <div className="mt-auto">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-2.5 sm:mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-500" />{course.duration?.value} {course.duration?.unit}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-500" />{course.totalStudents || 0}+</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />{course.level || "All Ages"}</span>
                    </div>

                    <Button asChild size="sm"
                      className="w-full h-8 sm:h-9 text-xs sm:text-sm bg-teal-700 hover:bg-teal-600 text-white rounded-xl group-hover:shadow-md transition-all duration-200">
                      <Link to="/contact" className="flex items-center justify-center gap-1 sm:gap-2">
                        {t("hero.apply")} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className={`h-1.5 bg-gradient-to-r ${style.color}`} />
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-0 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="w-full bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-5 sm:p-7 lg:p-10 xl:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }} />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left lg:max-w-2xl">
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                  {t("courses.readytojoin")}
                </h2>
                <p className="text-white/75 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {t("courses.enrolltext")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-end items-center lg:items-center flex-wrap shrink-0">
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/contact">{t("hero.apply")}</Link>
                </Button>
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/contact">{t("nav.contact")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Courses;
