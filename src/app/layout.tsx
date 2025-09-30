import { Metadata } from "next";
import Script from "next/script";
import { Fredoka, Nunito, Quicksand } from "next/font/google";
import "./globals.scss";
import Footer from "@/components/Footer";
import { SectionRefsProvider } from "@/contexts/SectionRefsContext";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GIFTED - Et si l'Enfance recréait le Monde ?",
  description:
    "Plateforme éducative innovante qui révolutionne l'apprentissage des enfants",
  openGraph: {
    title: "GIFTED - Et si l'Enfance recréait le Monde ?",
    description:
      "Plateforme éducative innovante qui révolutionne l'apprentissage des enfants",
    url: "https://gifted-project.net",
    siteName: "GIFTED",
    images: [
      {
        url: "https://gifted-project.net/images/social-preview.png",
        width: 384,
        height: 74,
        alt: "Logo de GIFTED",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIFTED - Et si l'Enfance recréait le Monde ?",
    description:
      "Plateforme éducative innovante qui révolutionne l'apprentissage des enfants",
    images: ["https://gifted-project.net/images/social-preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GVS3H37T9Q"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVS3H37T9Q');
          `}
      </Script>
      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s5fbvw1w55");
          `}
      </Script>
      <body
        className={`${fredoka.variable} ${nunito.variable} ${quicksand.variable}`}
      >
        <SectionRefsProvider>
          {children}
          <Footer />
        </SectionRefsProvider>
      </body>
    </html>
  );
}
