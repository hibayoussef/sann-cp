
import { _MapSettingsApi } from "@/services/settings/mapSettings.service";
import { MapSettingForm } from "@/types/settings/map_setting";
import { QueryKeys } from "@/utils/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// FETCH MAP SETTINGS
export const useFetchMapSettings = () => {
  return useQuery({
    queryKey: [QueryKeys.MAPSETTINGS],
    queryFn: _MapSettingsApi.getMapSettings,
  });
};

// FETCH ALLOWED BRANCHES
export const useFetchAllowedBranches = () => {
  return useQuery({
    queryKey: [QueryKeys.ALLOWED_BRANCHES],
    queryFn: _MapSettingsApi.getAllowedBranches,
  });
};

// ADD MAP SETTING
// export const useAddMapSetting = () => {
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: _MapSettingsApi.addMapSetting,
//     onSuccess: (data) => {
//       navigate(`/map-settings/${data.id}`);
//     },
//   });
// };
export const useAddMapSetting = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: _MapSettingsApi.addMapSetting,
    onSuccess: () => {
      navigate("/map-settings");
    },
  });
};
// UPDATE MAP SETTING
export const useUpdateMapSetting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MapSettingForm }) =>
      _MapSettingsApi.updateMapSetting(id, data),
    onSuccess: () => {
      navigate("/map-settings");
    },
  });
};

// DELETE MAP SETTING
export const useDeleteMapSetting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: _MapSettingsApi.deleteMapSetting,
    onSuccess: () => {
      navigate("/map-settings");
    },
  });
};
