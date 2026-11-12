
import { Footer } from "@/components/marketing/landing/footer";
import { Navbar } from "@/components/marketing/landing/Navbar";
import { styles } from "@/constants/styles";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.pageRoot}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
