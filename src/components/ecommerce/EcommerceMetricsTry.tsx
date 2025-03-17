import {
  ArrowDownIcon,
  ArrowUpIcon
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetricsTry() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Numbers of Users
            </span>
            <h4 className="mt-2 font-bold text-[#64748B] text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-[#14B8A6] p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-[#ECF1F0] dark:text-gray-400">
              Average revenue from Users
            </span>
            <h4 className="mt-2 font-bold text-[#ECF1F0] text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-[#919293] p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-[#ECF1F0] dark:text-gray-400">
              Recently added Users
            </span>
            <h4 className="mt-2 font-bold text-[#ECF1F0] text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
