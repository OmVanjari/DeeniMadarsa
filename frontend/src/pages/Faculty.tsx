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
    { nameKey: "faculty.member.manager", titleKey: "faculty.manager.title",   qualKey: "faculty.manager.qual",    img: teacher1 },
    { nameKey: "faculty.member.tabrez",  titleKey: "faculty.principal.title",  qualKey: "faculty.principal.qual",  img: teacher2 },
    { nameKey: "faculty.member.jabir",   titleKey: "faculty.teacher.title",    qualKey: "faculty.jabir.qual",      img: teacher3 },
    { nameKey: "faculty.member.usman",   titleKey: "faculty.teacher.title",    qualKey: "faculty.usman.qual",      img: teacher1 },
    { nameKey: "faculty.member.abdullah",titleKey: "faculty.teacher.title",    qualKey: "faculty.abdullah.qual",   img: teacher2 },
    { nameKey: "faculty.member.nizam",   titleKey: "faculty.teacher.title",    qualKey: "faculty.nizamuddin.qual", img: teacher3 },
    { nameKey: "faculty.member.jamshed", titleKey: "faculty.teacher.title",    qualKey: "faculty.jamshed.qual",    img: teacher1 },
    { nameKey: "faculty.member.pawan",   titleKey: "faculty.teacher.title",    qualKey: "faculty.pawan.qual",      img: teacher2 },
  ];

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.41 AM.jpeg" alt="Faculty hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-3 sm:px-4 text-center py-12 sm:py-16 md:py-20 lg:py-24">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-tight">
            {t("faculty.title")}
          </h1>
          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-4 sm:mb-6 lg:mb-8">
            {t("faculty.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center">
            <Button asChild size="lg"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:scale-105 transition-all duration-200">
              <Link to="/courses">{t("nav.courses")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── FACULTY GRID ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">{t("faculty.experienced")}</span>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{t("faculty.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.nameKey}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-teal-100/60 hover:-translate-y-1 transition-all duration-300">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                <div className="p-4 sm:p-5 lg:p-6 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-full overflow-hidden border-4 border-teal-100 shadow-lg mb-3 sm:mb-4 group-hover:border-teal-400 transition-colors duration-300">
                    <img src={teacher.img} alt={t(teacher.nameKey)} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">{t(teacher.nameKey)}</h3>
                  <p className="text-teal-600 text-xs font-medium mt-1">{t(teacher.titleKey)}</p>
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
