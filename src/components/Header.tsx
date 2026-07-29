import { getSite } from "@/lib/content";
import HeaderScrollShell from "./HeaderScrollShell";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

export default async function Header() {
  const site = await getSite();

  return (
    <HeaderScrollShell>
      <Logo />
      <Navigation links={site.navigation} headerCta={site.headerCta} themeToggle={<ThemeToggle />} />
    </HeaderScrollShell>
  );
}
