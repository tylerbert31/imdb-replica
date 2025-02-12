import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col min-w-[320px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
