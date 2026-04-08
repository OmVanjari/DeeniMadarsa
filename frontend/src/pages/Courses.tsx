import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { BookOpen, GraduationCap } from "lucide-react";

const Courses = () => {
  const { t } = useLanguage();

  const courses = [
    { nameKey: "course.hifz.name", descKey: "course.hifz.desc", durationKey: "course.hifz.duration", icon: BookOpen },
    { nameKey: "course.nazra.name", descKey: "course.nazra.desc", durationKey: "course.nazra.duration", icon: BookOpen },
    { nameKey: "course.alim.name", descKey: "course.alim.desc", durationKey: "course.alim.duration", icon: GraduationCap },
  ];

  return (
    <Layout>
      <section className="hero-gradient py-20 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground fade-up">{t("courses.title")}</h1>
        <p className="text-primary-foreground/80 text-lg mt-2 fade-up fade-up-delay-1">{t("courses.subtitle")}</p>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {courses.map((c, i) => (
            <div key={c.nameKey} className={`bg-card rounded-lg p-8 shadow-md card-hover border border-border fade-up fade-up-delay-${i + 1}`}>
              <c.icon className="w-14 h-14 text-accent mb-5" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{t(c.nameKey)}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t(c.descKey)}</p>
              <span className="inline-block bg-accent/10 text-accent font-semibold text-sm px-3 py-1 rounded-full">{t(c.durationKey)}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
