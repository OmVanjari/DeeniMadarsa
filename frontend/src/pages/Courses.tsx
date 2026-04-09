import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
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
    },
    {
      nameKey: "course.nazra.name",
      descKey: "course.nazra.desc",
      durationKey: "course.nazra.duration",
      icon: BookOpen,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      nameKey: "course.alim.name",
      descKey: "course.alim.desc",
      durationKey: "course.alim.duration",
      icon: GraduationCap,
      color: "from-amber-500 to-amber-700",
    },
  ];

  return (
    <Layout>
      <section className="hero-gradient py-24 text-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.35em] px-4 py-2 mb-6">
              {t("courses.title")}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-5 animate-fade-up">
              {t("courses.title")}
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl animate-fade-up fade-up-delay-1">
              {t("courses.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-up fade-up-delay-2">
              <Button asChild className="bg-amber-500 text-white hover:bg-amber-400 rounded-full px-8 py-3 shadow-lg shadow-amber-500/20">
                <Link to="/contact">{t("hero.apply") || t("contact.title")}</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-3 backdrop-blur-sm">
                <Link to="/about">{t("about.preview.readmore") || t("about.title")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
              {t("courses.subtitle")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("courses.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("courses.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courses.map((course, i) => (
              <div
                key={course.nameKey}
                className="group bg-white rounded-[2rem] overflow-hidden border border-teal-100 shadow-xl card-hover transition-transform duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <course.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{t(course.nameKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{t(course.descKey)}</p>
                  <div className="inline-flex items-center justify-between w-full rounded-full bg-slate-50 px-4 py-3 text-sm text-slate-700 font-semibold">
                    <span>{t(course.durationKey)}</span>
                    <ArrowRight className="w-4 h-4 text-teal-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
