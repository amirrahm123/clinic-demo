import Link from "next/link";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { HeaderShell } from "./HeaderShell";
import { Phone } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { LogoMark } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { OpenNow } from "./OpenNow";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const navItems = site.nav.map((item) => ({
    label: t.header.nav[item.key],
    href: "external" in item && item.external ? item.href : localePath(locale, item.href),
    id: item.href.startsWith("/#") ? item.href.slice(2) : undefined,
  }));

  return (
    <HeaderShell>
      <div className="container-roc flex h-full items-center gap-4 xl:gap-8">
        <Link
          href={localePath(locale, "/")}
          aria-label={t.a11y.homeLink}
          className="text-navy flex min-h-11 flex-none items-center gap-3.5"
        >
          {/* data-logo-target: landing spot of the intro logo */}
          <LogoMark data-logo-target className="h-8 w-[58px]" />
          <span className="bg-line-strong hidden h-8 w-px sm:block" aria-hidden="true" />
          <span
            className="font-condensed hidden text-sm leading-[1.25] font-semibold tracking-[0.14em] uppercase sm:block"
            aria-hidden="true"
          >
            Praxisklinik
            <br />
            Isarblick
          </span>
        </Link>

        <nav aria-label={t.a11y.mainNav} className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-section={item.id}
                  className="nav-link text-ink flex min-h-11 items-center text-sm font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 xl:ml-0 xl:gap-5">
          <div className="hidden flex-col items-end md:flex">
            <a
              href={site.phone.href}
              className="text-navy hover:text-navy-hover flex min-h-11 items-center gap-2 text-sm font-semibold whitespace-nowrap tabular-nums transition-colors"
            >
              <Phone />
              {site.phone.display}
            </a>
            {/* "Open now · until 18:00" – only once site.openingHours is filled in */}
            <OpenNow hours={site.openingHours} text={t.openNow} className="-mt-2 hidden xl:inline-flex" />
          </div>

          <LanguageSwitch
            locale={locale}
            switchLabel={t.a11y.switchToOther}
            srLabel={t.a11y.language}
            compact
          />

          <button type="button" data-booking-open className="btn btn-primary hidden md:inline-flex">
            {t.header.book}
          </button>

          <MobileMenu
            items={navItems}
            text={{
              open: t.a11y.openMenu,
              close: t.a11y.closeMenu,
              menu: t.a11y.menu,
              nav: t.a11y.mobileNav,
              book: t.header.book,
              phone: site.phone,
            }}
            locale={locale}
            switchLabel={t.a11y.switchToOther}
            srLabel={t.a11y.language}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
