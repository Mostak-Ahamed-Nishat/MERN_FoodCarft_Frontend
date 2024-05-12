import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line no-empty-pattern
function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1">{children}</div>
    </div>
  );
}

export default Layout;
