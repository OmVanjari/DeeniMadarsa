import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import teacher1 from "@/assets/teacher1.jpg";
import teacher2 from "@/assets/teacher2.jpg";
import teacher3 from "@/assets/teacher3.jpg";

const Index = () => {
  const { t } = useLanguage();

  const courses = [
    { nameKey: "course.hifz.name", descKey: "course.hifz.desc", durationKey: "course.hifz.duration", icon: BookOpen },
    { nameKey: "course.nazra.name", descKey: "course.nazra.desc", durationKey: "course.nazra.duration", icon: BookOpen },
    { nameKey: "course.alim.name", descKey: "course.alim.desc", durationKey: "course.alim.duration", icon: GraduationCap },
  ];

  const teachers = [
    { nameKey: "faculty.teacher1.name", titleKey: "faculty.teacher1.title", qualKey: "faculty.teacher1.qual", img: teacher1 },
    { nameKey: "faculty.teacher2.name", titleKey: "faculty.teacher2.title", qualKey: "faculty.teacher2.qual", img: teacher2 },
    { nameKey: "faculty.teacher3.name", titleKey: "faculty.teacher3.title", qualKey: "faculty.teacher3.qual", img: teacher3 },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 fade-up">
            {t("hero.welcome")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 fade-up fade-up-delay-1">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-up fade-up-delay-2">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 shadow-lg transition-transform duration-200 hover:scale-105">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 transition-transform duration-200 hover:scale-105">
              <Link to="/donation">{t("hero.donate")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 fade-up">
            {t("about.preview.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 fade-up fade-up-delay-1">
            {t("about.preview.text")}
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105 fade-up fade-up-delay-2">
            <Link to="/about">{t("about.preview.readmore")}</Link>
          </Button>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 fade-up">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-lg fade-up fade-up-delay-1">{t("courses.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courses.map((c, i) => (
              <div
                key={c.nameKey}
                className={`bg-background rounded-lg p-8 shadow-md card-hover border border-border fade-up fade-up-delay-${i + 1}`}
              >
                <c.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{t(c.nameKey)}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t(c.descKey)}</p>
                <span className="text-xs font-semibold text-accent">{t(c.durationKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 fade-up">{t("faculty.title")}</h2>
            <p className="text-muted-foreground text-lg fade-up fade-up-delay-1">{t("faculty.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachers.map((tc, i) => (
              <div key={tc.nameKey} className={`text-center card-hover fade-up fade-up-delay-${i + 1}`}>
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-accent mb-4 shadow-lg">
                  <img src={tc.img} alt={t(tc.nameKey)} className="w-full h-full object-cover" loading="lazy" width={160} height={160} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
                <p className="text-accent text-sm font-medium">{t(tc.titleKey)}</p>
                <p className="text-muted-foreground text-xs mt-1">{t(tc.qualKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Heart className="w-16 h-16 text-primary-foreground/80 mx-auto mb-6 animate-float" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 fade-up">
            {t("donation.subtitle")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 fade-up fade-up-delay-1">
            {t("donation.text")}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 shadow-xl transition-transform duration-200 hover:scale-105 fade-up fade-up-delay-2">
            <Link to="/donation">{t("donation.button")}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
