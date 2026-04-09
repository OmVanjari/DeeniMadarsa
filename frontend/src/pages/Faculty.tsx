import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import teacher1 from "@/assets/teacher1.jpg";
import teacher2 from "@/assets/teacher2.jpg";
import teacher3 from "@/assets/teacher3.jpg";

const Faculty = () => {
  const { t } = useLanguage();

  const teachers = [
    {
      nameKey: "faculty.teacher1.name",
      titleKey: "faculty.teacher1.title",
      qualKey: "faculty.teacher1.qual",
      img: teacher1,
    },
    {
      nameKey: "faculty.teacher2.name",
      titleKey: "faculty.teacher2.title",
      qualKey: "faculty.teacher2.qual",
      img: teacher2,
    },
    {
      nameKey: "faculty.teacher3.name",
      titleKey: "faculty.teacher3.title",
      qualKey: "faculty.teacher3.qual",
      img: teacher3,
    },
  ];

  return (
    <Layout>
<<<<<<< HEAD
      <section className="hero-gradient py-24 text-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.35em] px-4 py-2 mb-6">
              {t("faculty.title")}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-5 animate-fade-up">
              {t("faculty.title")}
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl animate-fade-up fade-up-delay-1">
              {t("faculty.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-up fade-up-delay-2">
              <Button asChild className="bg-amber-500 text-white hover:bg-amber-400 rounded-full px-8 py-3 shadow-lg shadow-amber-500/20">
                <Link to="/contact">{t("contact.title")}</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-3 backdrop-blur-sm">
                <Link to="/about">{t("about.preview.readmore") || t("about.title")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">
              {t("faculty.subtitle")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("faculty.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("faculty.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher, i) => (
              <div key={teacher.nameKey} className="group bg-white rounded-[2rem] overflow-hidden border border-teal-100 shadow-xl card-hover transition-transform duration-300">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-700 opacity-10" />
                  <div className="relative p-8 text-center">
                    <div className="mx-auto mb-6 w-36 h-36 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl">
                      <img
                        src={teacher.img}
                        alt={t(teacher.nameKey)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={144}
                        height={144}
                      />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t(teacher.nameKey)}</h3>
                    <p className="text-teal-700 text-sm font-semibold mb-2">{t(teacher.titleKey)}</p>
                    <p className="text-muted-foreground text-sm">{t(teacher.qualKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
=======
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground drop-shadow-sm fade-up">{t("faculty.title")}</h1>
          <p className="text-muted-foreground text-xl mt-4 max-w-2xl mx-auto fade-up fade-up-delay-1">{t("faculty.subtitle")}</p>
        </div>
      </section>

      <section className="pb-24 pt-8 bg-background relative z-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          {teachers.map((tc, i) => (
            <div key={tc.nameKey} className={`group relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-border/50 hover:border-accent/50 transition-all duration-500 hover:-translate-y-3 z-10 fade-up fade-up-delay-${i + 1}`}>
              
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"></div>
              
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-[6px] border-background shadow-2xl mb-8 group-hover:scale-105 transition-transform duration-500 ease-out">
                <img src={tc.img} alt={t(tc.nameKey)} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out" loading="lazy" />
              </div>
              
              <h3 className="font-heading text-2xl font-extrabold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">{t(tc.nameKey)}</h3>
              
              <div className="mt-3 mb-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                {t(tc.titleKey)}
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto group-hover:text-foreground/80 transition-colors duration-300">{t(tc.qualKey)}</p>
            </div>
          ))}
>>>>>>> 428d857 (FOOTER)
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;
