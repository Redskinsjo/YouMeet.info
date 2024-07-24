import { BetaCompany } from "@youmeet/gql/generated";
import CompanyProfileComponent from "@youmeet/app/compte/companyComponents/CompanyProfileComponent";

export default function CompanyChild({
  company,
}: {
  company: BetaCompany | null | undefined;
}) {
  return (
    <div className="w-full flex-center min-h-screen bg-grey100 dark:darkBg">
      <CompanyProfileComponent company={company} />
    </div>
  );
}
