import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="hero-gradient py-20 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground fade-up">{t("contact.title")}</h1>
        <p className="text-primary-foreground/80 text-lg mt-2 fade-up fade-up-delay-1">{t("contact.subtitle")}</p>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder={t("contact.form.name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-card border-border"
            />
            <Input
              type="email"
              placeholder={t("contact.form.email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-card border-border"
            />
            <Textarea
              placeholder={t("contact.form.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="bg-card border-border"
            />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full transition-transform duration-200 hover:scale-[1.02]">
              {t("contact.form.submit")}
            </Button>
          </form>

          {/* Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">{t("contact.info.title")}</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent" />{t("footer.phone")}</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent" />{t("footer.email")}</p>
              <p className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />{t("footer.address")}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
