import { useQuery } from "@tanstack/react-query";
import { _MeApi } from "../services/me.service";
import { useMeStore } from "../store/useMeStore";
import { QueryKeys } from "../utils/queryKeys";

// FETCH Me
export const useFetchMe = () => {
  const setMe = useMeStore((state) => state.setMe);
  return useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: async () => {
      const data = await _MeApi.getMe();
      setMe(data);
      return data;
    },
  });
};
