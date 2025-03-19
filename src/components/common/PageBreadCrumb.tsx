import { ChevronRight } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router";

interface BreadcrumbProps {
  baseTitle?: string;
  pageTitle: string;
  baseLink?: string;
  icon?: JSX.Element;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  baseTitle,
  baseLink,
  pageTitle,
  icon,
}) => {
  return (
    <div className="flex py-5 flex-wrap items-center justify-between gap-3 mb-3">
      <nav>
        <ol className="flex items-center gap-1.5">
          <li className="flex items-center">
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              to={baseLink ? baseLink : "/"}
            >
              {icon && icon}
              <span className="leading-none">{baseTitle ? baseTitle : "Home"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </li>
          
          <li className="flex items-center gap-1 text-sm text-gray-800 dark:text-white/90">
            <span className="leading-none">{pageTitle}</span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
