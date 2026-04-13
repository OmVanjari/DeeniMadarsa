import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", enquiryType: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!form.name || !form.email || !form.enquiryType || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    // WhatsApp phone number (with country code)
    const whatsappNumber = "919876543210";

    // Construct the WhatsApp message
    const whatsappMessage = `*New Inquiry from ${form.name}*\n\n📧 Email: ${form.email}\n📋 Inquiry Type: ${form.enquiryType}\n\n💬 Message:\n${form.message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp link and open it
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");

    // Show success toast
    toast.success("Opening WhatsApp. Please send the message!");
    setForm({ name: "", email: "", enquiryType: "", message: "" });
  };

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).jpeg" alt="Contact hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-16 sm:py-20 md:py-24">
          <span className="inline-block bg-yellow-600/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            {t("contact.getintouch")}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {t("contact.title")}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display:"block", marginBottom:"-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section className="py-8 sm:py-10 bg-white -mt-px">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-md border border-teal-100/60 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-600" />
              <div className="p-5 sm:p-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">{t("contact.sendmessage")}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder={t("contact.form.name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="rounded-xl border-teal-200 focus:ring-teal-500"
                  />
                  <Input
                    type="email"
                    placeholder={t("contact.form.email")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="rounded-xl border-teal-200 focus:ring-teal-500"
                  />
                  <Select value={form.enquiryType} onValueChange={(value) => setForm({ ...form, enquiryType: value })}>
                    <SelectTrigger className="rounded-xl border-teal-200 focus:ring-teal-500">
                      <SelectValue placeholder={t("contact.form.enquiry") || "Select Inquiry Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Course">Course Inquiry</SelectItem>
                      <SelectItem value="Donation">Donation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder={t("contact.form.message")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="rounded-xl border-teal-200 focus:ring-teal-500 resize-none"
                  />
                  <Button type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-200">
                    <Send className="w-4 h-4" /> {t("contact.form.submit")}
                  </Button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="bg-white rounded-2xl shadow-md border border-teal-100/60 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-700" />
                <div className="p-5 sm:p-8">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">{t("contact.info.title")}</h3>
                  <div className="space-y-4 sm:space-y-5">
                    {[
                      { icon: Phone, label: t("footer.phone"),   href: "tel:+919876543210" },
                      { icon: Mail,  label: t("footer.email"),   href: "mailto:info@darululoomajmatia.com" },
                      { icon: MapPin, label: t("footer.address"), href: null },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 sm:gap-4 group">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-600 transition-colors duration-300">
                          <item.icon className="w-4 h-4 text-teal-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-muted-foreground hover:text-teal-700 transition-colors pt-2 break-all">{item.label}</a>
                        ) : (
                          <p className="text-sm text-muted-foreground pt-2">{item.label}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 sm:p-6 text-center flex-1 flex flex-col items-center justify-center gap-2">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-teal-400" />
                <p className="font-heading text-base font-bold text-teal-800">{t("contact.location")}</p>
                <p className="text-xs text-teal-600">{t("contact.locationdesc")}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Contact;
