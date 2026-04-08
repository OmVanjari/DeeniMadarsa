import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-4 text-accent">{t("footer.contact")}</h3>
          <div className="space-y-3 text-sm text-primary-foreground/80">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{t("footer.phone")}</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" />{t("footer.email")}</p>
            <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 shrink-0" />{t("footer.address")}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-4 text-accent">{t("footer.quicklinks")}</h3>
          <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <Link to="/" className="hover:text-accent transition-colors">{t("nav.home")}</Link>
            <Link to="/about" className="hover:text-accent transition-colors">{t("nav.about")}</Link>
            <Link to="/courses" className="hover:text-accent transition-colors">{t("nav.courses")}</Link>
            <Link to="/faculty" className="hover:text-accent transition-colors">{t("nav.faculty")}</Link>
            <Link to="/donation" className="hover:text-accent transition-colors">{t("nav.donation")}</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">{t("nav.contact")}</Link>
          </nav>
        </div>

        {/* Follow */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-4 text-accent">{t("footer.followus")}</h3>
          <p className="text-sm text-primary-foreground/80">Facebook | Twitter | Instagram | YouTube</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
