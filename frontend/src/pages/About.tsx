import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    { key: "about.achievements.students", icon: Users },
    { key: "about.achievements.graduates", icon: GraduationCap },
    { key: "about.achievements.years", icon: Award },
    { key: "about.achievements.scholars", icon: BookOpen },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="hero-gradient py-20 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground fade-up">{t("about.title")}</h1>
      </section>

      {/* History */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{t("about.history.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.history.text")}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          <div className="bg-background rounded-lg p-8 shadow-md card-hover border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.mission.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("about.mission.text")}</p>
          </div>
          <div className="bg-background rounded-lg p-8 shadow-md card-hover border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.vision.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("about.vision.text")}</p>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{t("about.founder.title")}</h2>
          <blockquote className="text-lg italic text-muted-foreground border-l-4 border-accent pl-6 text-left">
            {t("about.founder.text")}
          </blockquote>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground text-center mb-12">{t("about.achievements.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((a) => (
              <div key={a.key} className="text-center card-hover">
                <a.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="font-heading text-lg font-bold text-primary-foreground">{t(a.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
