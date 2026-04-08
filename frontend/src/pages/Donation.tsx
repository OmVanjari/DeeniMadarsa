import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Heart, CreditCard } from "lucide-react";

const Donation = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="hero-gradient py-20 text-center">
        <Heart className="w-16 h-16 text-primary-foreground/80 mx-auto mb-4 animate-float" />
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground fade-up">{t("donation.title")}</h1>
        <p className="text-primary-foreground/80 text-lg mt-2 max-w-xl mx-auto fade-up fade-up-delay-1">{t("donation.message")}</p>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* UPI */}
            <div className="bg-card rounded-lg p-8 shadow-md card-hover border border-border text-center">
              <CreditCard className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{t("donation.upi")}</h3>
              <p className="text-muted-foreground font-mono text-lg">madarsa@upi</p>
            </div>
            {/* Bank */}
            <div className="bg-card rounded-lg p-8 shadow-md card-hover border border-border">
              <CreditCard className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 text-center">{t("donation.bank")}</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>{t("donation.bank.name")}</p>
                <p>{t("donation.bank.account")}</p>
                <p>{t("donation.bank.ifsc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donation;
