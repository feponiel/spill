import { Theme } from "@/providers/Theme";
import type { Metadata } from "next";
import StyledComponentsRegistry from '@/lib/styled-components/registry'
import { Roboto } from 'next/font/google'
import { ReactQueryProvider } from "@/lib/react-query/react-query-provider";
import { cookies } from "next/headers";
import { AuthUserLoader } from "@/components/AuthUserLoader";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    default: "Spill",
    template: "%s | Spill"
  },
  
  description: "A simple feed application where you can share what's new with people.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  const initialTheme = (themeCookie?.value as 'dark' | 'light') || 'dark' // if there are no cookies, it will set dark as default

  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <Theme initialTheme={ initialTheme }>
              <AuthUserLoader />
              {children}
            </Theme>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
