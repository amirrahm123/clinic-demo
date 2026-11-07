import type { CSSProperties } from "react";
import { getDepartmentList } from "@/content/departments";
import { getDict, type Locale } from "@/content/i18n";
import { ArcUnderline } from "./Arc";
import { ArrowRight } from "./icons";
import { Photo } from "./Photo";
import { SectionHeader } from "./SectionHeader";

export function Departments({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section id="fach" aria-labelledby="fach-title" className="section section-white">
      <div className="container-roc">
        <SectionHeader
          id="fach-title"
          title={t.departments.title}
          aside={
            // Three facts instead of a paragraph, each with a department-colour dot
            <ul className="text-ink space-y-2.5 text-base">
              {t.departments.facts.map((fact, i) => (
                <li key={fact} className="flex items-start gap-3">
                  <span
                    className="mt-[0.6em] size-2 flex-none rounded-full"
                    style={{ background: ["var(--color-dept-ortho)", "var(--color-dept-derma)", "var(--color-dept-gyne)"][i] }}
                    aria-hidden="true"
                  />
                  {fact}
                </li>
              ))}
            </ul>
          }
        />

        {/* Mobile: compact list rows · sm: 2 columns · lg: 3 columns of white cards
            (4:3 image inset at the top, name + dot, description, arrow). One link per card. */}
        <ul
          data-reveal="grid"
          className="border-line mt-10 border-t sm:grid sm:grid-cols-2 sm:gap-5 sm:border-0 lg:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {getDepartmentList(locale).map((dept, i) => (
            <li
              key={dept.id}
              style={{ "--i": i } as CSSProperties}
              className="border-line border-b sm:border-0"
            >
              <a
                href={dept.href}
                style={{ "--dept": dept.color } as CSSProperties}
                className="dept-card group flex items-center gap-4 py-1.5 sm:block sm:h-full sm:p-5"
              >
                <span className="bg-sand relative block size-[68px] flex-none overflow-hidden rounded-xl sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-xl">
                  <Photo
                    src={dept.image}
                    alt=""
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 68px"
                    position={dept.imagePosition}
                    className="ease-roc object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="from-navy-deep/70 font-condensed absolute inset-x-0 bottom-0 hidden bg-gradient-to-t to-transparent px-4 pt-10 pb-3 text-sm font-semibold tracking-[0.16em] text-white uppercase sm:block">
                    {dept.short}
                  </span>
                </span>

                <span className="block min-w-0 flex-1 sm:mt-4">
                  <span className="font-display text-navy flex items-center gap-2.5 text-xl leading-tight tracking-tight sm:text-xl">
                    {dept.name}
                    <span className="size-2 flex-none rounded-full bg-(--dept)" />
                    <ArrowRight
                      className="ease-roc ml-auto hidden flex-none transition-transform duration-200 group-hover:translate-x-1 sm:block"
                    />
                  </span>
                  <ArcUnderline className="mt-1 hidden sm:block" />
                  <span className="text-muted block text-sm sm:hidden">{dept.mobileLine}</span>
                  <span className="text-muted mt-1.5 hidden text-sm leading-normal sm:block">
                    {dept.description}
                  </span>
                </span>

                <ArrowRight className="text-subtle flex-none sm:hidden" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
