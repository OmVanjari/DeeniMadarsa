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
    { name: "سید جان حسن اجمالی",      titleKey: "faculty.manager.title",   qualKey: "faculty.manager.qual",    img: teacher1 },
    { name: "حافظ تبریز (جانک)",        titleKey: "faculty.principal.title",  qualKey: "faculty.principal.qual",  img: teacher2 },
    { name: "حافظ قاری جابر حسن",       titleKey: "faculty.teacher.title",    qualKey: "faculty.jabir.qual",      img: teacher3 },
    { name: "حافظ قاری عثمان خان",      titleKey: "faculty.teacher.title",    qualKey: "faculty.usman.qual",      img: teacher1 },
    { name: "حافظ عبداللہ خان",         titleKey: "faculty.teacher.title",    qualKey: "faculty.abdullah.qual",   img: teacher2 },
    { name: "ماسٹر محمد نظام الدین",    titleKey: "faculty.teacher.title",    qualKey: "faculty.nizamuddin.qual", img: teacher3 },
    { name: "ماسٹر جمشید خان",          titleKey: "faculty.teacher.title",    qualKey: "faculty.jamshed.qual",    img: teacher1 },
    { name: "ماسٹر پون احمد",           titleKey: "faculty.teacher.title",    qualKey: "faculty.pawan.qual",      img: teacher2 },
  ];

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.41 AM.jpeg" alt="Faculty hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-16 sm:py-20 md:py-24">
          <span className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            {t("faculty.ourteam")}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            {t("faculty.title")}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8">
            {t("faculty.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-8 hover:scale-105 transition-all duration-200">
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

      {/* ── FACULTY GRID ── */}
      <section className="py-12 sm:py-20 bg-white -mt-px">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">{t("faculty.experienced")}</span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t("faculty.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 max-w-6xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
                <div className="p-5 sm:p-6 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden border-4 border-teal-100 shadow-lg mb-4 group-hover:border-teal-400 transition-colors duration-300">
                    <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">{teacher.name}</h3>
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
