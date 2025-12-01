import { Inter, Urbanist, Poppins, Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const urbanist = Urbanist({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Portafolio 3D | Roberto Vasquez",
  description: "Portafolio interactivo con Next.js",
};

import { LanguageProvider } from "@/context/LanguageContext";
import MouseTrail from "@/components/ui/MouseTrail";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${urbanist.variable} ${poppins.variable} ${spaceMono.variable} ${playfair.variable} antialiased`}
      >
        <LanguageProvider>
          <MouseTrail />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
