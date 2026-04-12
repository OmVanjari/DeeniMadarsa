import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none select-none">
          <span className="font-heading text-white/5" style={{ fontSize: "clamp(180px, 30vw, 420px)", lineHeight: 1 }}>☪</span>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-24">
          <span className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Our Team
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            {t("faculty.title")}
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
            {t("faculty.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-8 hover:scale-105 transition-all duration-200">
              <Link to="/about">{t("about.preview.readmore")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── FACULTY CARDS ── */}
      <section className="py-20 bg-white -mt-px">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">Experienced & Dedicated</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("faculty.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                <div className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-teal-100 shadow-lg mb-5 group-hover:border-teal-400 transition-colors duration-300">
                    <img src={teacher.img} alt={t(teacher.nameKey)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{t(teacher.nameKey)}</h3>
                  <p className="text-teal-600 text-sm font-medium mt-1">{t(teacher.titleKey)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t(teacher.qualKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;
