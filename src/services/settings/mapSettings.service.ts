import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import { IMapSetting, MapSettingForm } from "@/types/settings/map_setting";


export const _MapSettingsApi = {
  // GET MAP SETTINGS
  getMapSettings: async () => {
    const response = await _axios.get<AxiosResponse<IMapSetting[]>>(
      "/settings/map-settings"
    );
    return response?.data?.data;
  },

  // GET ALLOWED BRANCHES
  getAllowedBranches: async () => {
    const response = await _axios.get<AxiosResponse<any[]>>(
      "/settings/allowed-map-settings-branches-to-create"
    );
    return response?.data?.data;
  },

  // ADD MAP SETTING
  addMapSetting: async (data: MapSettingForm) => {
    const response = await _axios.post("/settings/map-settings", data);
    return response.data;
  },

  // UPDATE MAP SETTING
  updateMapSetting: async (id: number, data: Partial<MapSettingForm>) => {
    const response = await _axios.put(`/settings/map-settings/${id}`, data);
    return response.data;
  },

  // DELETE MAP SETTING
  deleteMapSetting: async (id: number) => {
    const response = await _axios.delete(`/settings/map-settings/${id}`);
    return response.data;
  },
};
