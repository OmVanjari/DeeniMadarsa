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
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).jpeg" alt="Courses hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center py-24">
          <span className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Islamic Education
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            {t("courses.title")}
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
            {t("courses.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold rounded-full px-8 shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-8 hover:scale-105 transition-all duration-200">
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
      <section className="py-20 bg-white -mt-px">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">What We Offer</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{t("courses.title")}</h2>
            <p className="text-muted-foreground">{t("courses.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courses.map((course) => (
              <div key={course.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
                <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />
                <div className="p-7">
                  <div className={`w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 shadow-md`}>
                    <course.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{t(course.nameKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t(course.descKey)}</p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-500" />{t(course.durationKey)}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-teal-500" />{course.students}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" />{course.level}</span>
                  </div>

                  <Button asChild size="sm"
                    className="w-full bg-teal-700 hover:bg-teal-600 text-white rounded-xl group-hover:shadow-md transition-all duration-200">
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      {t("hero.apply")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-white/75 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Enroll today and take the first step towards comprehensive Islamic education.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full px-10 shadow-xl hover:scale-105 transition-all duration-200">
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

export default Courses;
