import { useQuery } from "@tanstack/react-query";
import { _CommonApi } from "../services/common.service";
import type {
  CountriesResponse,
  CurrencyResponse,
  IndustryData,
  PlansResponse,
  TimeZoneResponse,
} from "../types/common";
import { QueryKeys } from "../utils/queryKeys";

export const useFetchIndustry = () => {
  return useQuery({
    queryKey: [QueryKeys.INDUSTRY],
    queryFn: async (): Promise<IndustryData> => {
      const data = await _CommonApi.fetchIndustries();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchCountries = () => {
  return useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async (): Promise<CountriesResponse> => {
      const data = await _CommonApi.fetchCountries();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchTimeZone = () => {
  return useQuery({
    queryKey: [QueryKeys.TIMEZONE],
    queryFn: async (): Promise<TimeZoneResponse> => {
      const data = await _CommonApi.fetchTimeZone();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchCurrencies = () => {
  return useQuery({
    queryKey: [QueryKeys.CURRENCIES],
    queryFn: async (): Promise<CurrencyResponse> => {
      const data = await _CommonApi.fetchCurrencies();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchCurrencyById = (currency_id: number | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.CURRENCY, currency_id],
    queryFn: async (): Promise<any> => {
      const data: any = await _CommonApi.fetchCurrencyById(currency_id);
      return data?.data;
    },
    enabled: !!currency_id,
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchPlans = () => {
  return useQuery({
    queryKey: [QueryKeys.PLANS],
    queryFn: async (): Promise<PlansResponse> => {
      const data = await _CommonApi.fetchPlans();
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useFetchPlansByCurrency = (currency_id: number | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.PLANS, currency_id],
    queryFn: async (): Promise<PlansResponse> => {
      if (!currency_id) return Promise.reject("Currency ID is required");
      const data = await _CommonApi.fetchPlansByCurrency(currency_id);
      return data;
    },
    enabled: !!currency_id,
    staleTime: 1000 * 60 * 10,
  });
};
