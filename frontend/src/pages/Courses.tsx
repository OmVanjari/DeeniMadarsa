import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { BookOpen, GraduationCap, ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const { t } = useLanguage();

  const courses = [
    {
      nameKey: "course.hifz.name",
      descKey: "course.hifz.desc",
      durationKey: "course.hifz.duration",
      icon: BookOpen,
      color: "from-teal-500 to-teal-700",
      students: "120+",
      level: "All Ages",
    },
    {
      nameKey: "course.nazra.name",
      descKey: "course.nazra.desc",
      durationKey: "course.nazra.duration",
      icon: BookOpen,
      color: "from-emerald-500 to-emerald-700",
      students: "200+",
      level: "Beginners",
    },
    {
      nameKey: "course.alim.name",
      descKey: "course.alim.desc",
      durationKey: "course.alim.duration",
      icon: GraduationCap,
      color: "from-yellow-600 to-yellow-700",
      students: "80+",
      level: "Advanced",
    },
  ];

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.41 AM.jpeg" alt="Courses hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>

        <div className="relative z-10 container mx-auto px-3 sm:px-4 text-center py-12 sm:py-16 md:py-20 lg:py-24">
          <span className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 lg:mb-6">
            {t("courses.whatweoffer")}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-tight">
            {t("courses.title")}
          </h1>
          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-4 sm:mb-6 lg:mb-8">
            {t("courses.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center items-start sm:items-center self-start sm:self-center">
            <Button asChild size="lg"
              className="w-auto bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="w-auto bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:scale-105 transition-all duration-200">
              <Link to="/about">{t("about.preview.readmore")}</Link>
            </Button>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">{t("courses.whatweoffer")}</span>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t("courses.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {courses.map((course) => (
              <div key={course.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
                <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 shadow-md`}>
                    <course.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-foreground mb-2 sm:mb-3">{t(course.nameKey)}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-5">{t(course.descKey)}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-3 sm:mb-4 lg:mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-500" />{t(course.durationKey)}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-500" />{course.students}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />{course.level}</span>
                  </div>

                  <Button asChild size="sm"
                    className="w-full h-8 sm:h-9 text-xs sm:text-sm bg-teal-700 hover:bg-teal-600 text-white rounded-xl group-hover:shadow-md transition-all duration-200">
                    <Link to="/contact" className="flex items-center justify-center gap-1 sm:gap-2">
                      {t("hero.apply")} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-yellow-600 to-amber-600 text-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">
              Ready to Join?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8 max-w-md mx-auto">
              Start your Islamic education journey with us today
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center items-center self-center flex-wrap">
              <Button asChild size="lg"
                className="w-auto bg-white text-amber-600 hover:bg-gray-100 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg">
                <Link to="/contact">{t("hero.apply")}</Link>
              </Button>
              <Button asChild size="lg"
                className="w-auto bg-transparent border-2 border-white/60 text-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:scale-105 transition-all duration-200">
                <Link to="/contact">{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Courses;
