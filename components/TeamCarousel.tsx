import { departmentIds, getDepartments, type DepartmentId } from "@/content/departments";
import { getDoctorList } from "@/content/doctors";
import { getDict, type Locale } from "@/content/i18n";
import { TeamSection } from "./TeamSection";

/** Team section shell (server) – heading, filter and carousel live in TeamSection (client). */
export function TeamCarousel({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const doctors = getDoctorList(locale);
  const filterIds: DepartmentId[] = departmentIds.filter((id) =>
    doctors.some((d) => d.dept === id),
  );
  return (
    <section id="team" aria-labelledby="team-title" className="section overflow-hidden">
      <div className="container-roc">
        <TeamSection
          doctors={doctors}
          departments={getDepartments(locale)}
          filterIds={filterIds}
          text={t.team}
          portraitOf={t.team.portraitOf}
        />
      </div>
    </section>
  );
}
