import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function MapSettings() {
  // const { data } = useFetchMapSettings();
  // const mapSettings: any = data || [];

  const { t } = useTranslation("items");

  return (
    <>
      <PageMeta
        title="Map Settings Management | Dashboard"
        description="Manage your product map settings in the system."
      />
      <div className="space-y-4 px-1 py-1">
        <PageBreadcrumb
          baseTitle={t("dashboard")}
          pageTitle="map settings"
          icon={<Tag className="w-5 h-5" />}
        />

        <div className="space-y-4 pt-1">
          {/* <DataTable
            columns={mapSettingsColumns({
              update: hasPermission("update", "map-settings"),
              delete: hasPermission("delete", "map-settings"),
            })}
            data={mapSettings}
            createPath="/map-settings/create"
            permissions={{
              create: hasPermission("create", "map-settings"),
              update: hasPermission("update", "map-settings"),
              delete: hasPermission("delete", "map-settings"),
            }}
          /> */}
        </div>
      </div>
    </>
  );
}
