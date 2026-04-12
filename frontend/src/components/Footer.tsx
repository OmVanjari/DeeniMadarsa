import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t-4 border-teal-700 relative z-10">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-2xl text-teal-700">☪</span>
              <span className="font-heading text-xl font-bold text-gray-900">Al-Noor Madarsa</span>
            </div>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed max-w-xs">
              Providing quality Islamic and moral education since 1998.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <a href="tel:+919876543210" className="flex items-center gap-3 w-fit hover:text-teal-700 transition-colors group">
                <span className="p-2 bg-teal-50 rounded-lg text-teal-500 group-hover:bg-teal-100 transition-all">
                  <Phone className="w-4 h-4" />
                </span>
                {t("footer.phone")}
              </a>
              <a href="mailto:info@alnoormadarsa.com" className="flex items-center gap-3 w-fit hover:text-teal-700 transition-colors group">
                <span className="p-2 bg-teal-50 rounded-lg text-teal-500 group-hover:bg-teal-100 transition-all">
                  <Mail className="w-4 h-4" />
                </span>
                {t("footer.email")}
              </a>
              <div className="flex items-start gap-3">
                <span className="p-2 bg-teal-50 rounded-lg text-teal-500 mt-0.5 shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="leading-relaxed">{t("footer.address")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-bold mb-4 text-gray-900">{t("footer.quicklinks")}</h3>
            <nav className="flex flex-col gap-2.5 text-sm text-gray-500">
              {[
                { to: "/",         label: t("nav.home") },
                { to: "/about",    label: t("nav.about") },
                { to: "/courses",  label: t("nav.courses") },
                { to: "/faculty",  label: t("nav.faculty") },
                { to: "/donation", label: t("nav.donation") },
                { to: "/contact",  label: t("nav.contact") },
              ].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="w-fit flex items-center gap-2 hover:text-teal-700 hover:translate-x-1 transition-all duration-200">
                  <span className="w-1 h-1 rounded-full bg-teal-300" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-heading text-base font-bold mb-4 text-gray-900">{t("footer.followus")}</h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: "Facebook",  icon: <Facebook  className="w-4 h-4" /> },
                { name: "Twitter",   icon: <Twitter   className="w-4 h-4" /> },
                { name: "Instagram", icon: <Instagram className="w-4 h-4" /> },
                { name: "YouTube",   icon: <Youtube   className="w-4 h-4" /> },
              ].map((p) => (
                <button key={p.name} aria-label={p.name}
                  className="p-2.5 bg-teal-50 border border-teal-100 rounded-xl text-teal-600 hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  {p.icon}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-teal-700 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="hover:text-teal-700 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
