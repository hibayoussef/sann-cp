import { DataTable } from "@/components/ui/table-data/table-data";
import {  UserCog2 } from "lucide-react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { usePermissions } from "@/hooks/usePermissions";
import { mapSettingsColumns } from "@/columns/settings/mapSettings";
import { useFetchMapSettings } from "@/hooks/settings/useMapSettings";


export default function MapSettings() {
  const { data } = useFetchMapSettings();
  const mapSettings: any = data || [];


  const { hasPermission } = usePermissions();

  return (
    <>
      <PageMeta
        title="Map Settings Management | Dashboard"
        description="Manage your product map settings in the system."
      />
      <div className="space-y-4 px-1 py-6">
        <PageBreadcrumb
          baseTitle="Accountant"
          pageTitle="Map Settings"
          icon={<UserCog2 className="w-5 h-5" />}
        />
        <div className="space-y-4 pt-1">
          <DataTable
            tableName="Map Settings"
            columns={mapSettingsColumns({
              update: hasPermission("update", "map_settings"),
              delete: hasPermission("delete", "map_settings"),
            })}
            data={mapSettings}
            createPath="/map-settings/create"
            hasDetails={true}
            detailsLink="/"
            permissions={{
              create: hasPermission("create", "map_settings"),
              update: hasPermission("update", "map_settings"),
              delete: hasPermission("delete", "map_settings"),
            }}
            // meta={{ title: "Map Settings" }}
          />
        </div>
      </div>
    </>
  );
}
