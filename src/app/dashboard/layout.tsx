import { Footer } from '@/components/Footer';
import { TopNav } from "@/components/TopNav";
// import { ResortsProvider } from "@/context/ResortsContext";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      {/* <ResortsProvider> */}
        <TopNav />
        {children}
      {/* </ResortsProvider> */}
      <Footer />
    </div>
  );
}
