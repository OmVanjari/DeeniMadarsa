import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import teacher1 from "@/assets/teacher1.jpg";
import teacher2 from "@/assets/teacher2.jpg";
import teacher3 from "@/assets/teacher3.jpg";

const Faculty = () => {
  const { t } = useLanguage();

  const teachers = [
    { nameKey: "faculty.teacher1.name", titleKey: "faculty.teacher1.title", qualKey: "faculty.teacher1.qual", img: teacher1 },
    { nameKey: "faculty.teacher2.name", titleKey: "faculty.teacher2.title", qualKey: "faculty.teacher2.qual", img: teacher2 },
    { nameKey: "faculty.teacher3.name", titleKey: "faculty.teacher3.title", qualKey: "faculty.teacher3.qual", img: teacher3 },
  ];

  return (
    <Layout>
      <section className="hero-gradient py-20 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground fade-up">{t("faculty.title")}</h1>
        <p className="text-primary-foreground/80 text-lg mt-2 fade-up fade-up-delay-1">{t("faculty.subtitle")}</p>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
          {teachers.map((tc, i) => (
            <div key={tc.nameKey} className={`bg-card rounded-lg p-8 text-center shadow-md card-hover border border-border fade-up fade-up-delay-${i + 1}`}>
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-accent mb-5 shadow-lg">
                <img src={tc.img} alt={t(tc.nameKey)} className="w-full h-full object-cover" loading="lazy" width={144} height={144} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
              <p className="text-accent text-sm font-medium mt-1">{t(tc.titleKey)}</p>
              <p className="text-muted-foreground text-xs mt-2">{t(tc.qualKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;
