import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Heart, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Donation = () => {
  const { t } = useLanguage();

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg" alt="Donation hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-3 sm:px-4 text-center py-12 sm:py-16 md:py-20 lg:py-24">
          <span className="inline-block bg-red-600/90 text-white text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 lg:mb-6">
            {t("donation.supportus")}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-tight">
            {t("donation.title")}
          </h1>
          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-4 sm:mb-6 lg:mb-8">
            {t("donation.message")}
          </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center items-start sm:items-center self-start sm:self-center">
                    <Button asChild size="lg"
                      className="w-auto bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base shadow-xl hover:scale-105 transition-all duration-200">
                      <a href="https://wa.me/919876543210?text=I want to donate to DeeniMadarsa" target="_blank" rel="noopener noreferrer">
                        {t("donation.donate")}
                      </a>
                    </Button>
                    <Button asChild size="lg"
                      className="w-auto bg-transparent border-2 border-white/60 text-white hover:bg-white/15 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:scale-105 transition-all duration-200">
                      <Link to="/contact">{t("nav.contact")}</Link>
                    </Button>
                  </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display:"block", marginBottom:"-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── DONATION CARDS ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 block">{t("donation.howtodonate")}</span>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{t("donation.subtitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

            {/* UPI */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-red-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-600" />
              <div className="p-4 sm:p-5 lg:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-5 shadow-md">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-foreground mb-2 sm:mb-3">{t("donation.upi")}</h3>
                <p className="font-mono text-xs sm:text-sm lg:text-base text-red-700 bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg lg:rounded-xl border border-red-100 inline-block break-all">
                  madarsa@upi
                </p>
                <p className="text-muted-foreground text-xs mt-2 sm:mt-3">{t("donation.scantext")}</p>
              </div>
            </div>

            {/* Bank */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-red-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-orange-500 to-red-600" />
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-5 shadow-md">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-foreground mb-3 sm:mb-4 lg:mb-5 text-center">{t("donation.bank")}</h3>
                <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
                  {[t("donation.bank.name"), t("donation.bank.account"), t("donation.bank.ifsc")].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg lg:rounded-xl px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span className="break-all">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Note */}
          <div className="mt-6 sm:mt-8 lg:mt-10 bg-red-50 border border-red-100 rounded-2xl p-4 sm:p-5 lg:p-6 text-center">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mx-auto mb-2" />
            <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
              {t("donation.jazakallah")}
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Donation;
