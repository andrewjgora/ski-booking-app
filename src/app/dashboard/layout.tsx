import { Footer } from '@/components/Footer';
import { TopNav } from "@/components/TopNav";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      {children}
      <Footer />
    </div>
  );
}
