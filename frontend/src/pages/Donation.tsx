import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Heart, CreditCard, Smartphone } from "lucide-react";

const Donation = () => {
  const { t } = useLanguage();

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM.jpeg" alt="Donation hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-16 sm:py-20 md:py-24">
          <span className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            Support Us
          </span>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4 sm:mb-5">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 animate-float" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {t("donation.title")}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
            {t("donation.message")}
          </p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display:"block", marginBottom:"-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── DONATION CARDS ── */}
      <section className="py-12 sm:py-20 bg-white -mt-px">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2 block">How to Donate</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">{t("donation.subtitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

            {/* UPI */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
              <div className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-md">
                  <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3">{t("donation.upi")}</h3>
                <p className="font-mono text-base sm:text-lg text-teal-700 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 inline-block break-all">
                  madarsa@upi
                </p>
                <p className="text-muted-foreground text-xs mt-3">Scan or copy UPI ID to donate instantly</p>
              </div>
            </div>

            {/* Bank */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-700" />
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-md">
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4 text-center">{t("donation.bank")}</h3>
                <div className="space-y-3">
                  {[t("donation.bank.name"), t("donation.bank.account"), t("donation.bank.ifsc")].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span className="break-all">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Note */}
          <div className="mt-8 sm:mt-10 bg-teal-50 border border-teal-100 rounded-2xl p-5 sm:p-6 text-center">
            <Heart className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <p className="text-teal-800 text-sm leading-relaxed">
              <span className="font-semibold">JazakAllah Khair</span> — Your generous contribution helps us provide quality Islamic and modern education to students who need it most. Every donation makes a difference.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Donation;
