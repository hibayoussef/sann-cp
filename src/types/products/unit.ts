export interface ISubUnit {
  id?: number | null | string;
  unit_name_ar?: string | null;
  unit_name_en?: string | null;
  short_name_ar?: string | null;
  short_name_en?: string | null;
  allow_decimal?: number;
  multiplier?: number;
}

export interface IUnit {
  id?: number | null | string;
  related_to?: number | null;
  organization_id?: number | null;
  unit_name_ar: string | any;
  unit_name_en?: string | null;
  short_name_ar: string;
  short_name_en?: string | null;
  allow_decimal?: number;
  multiplier: number;
  sub_units?: ISubUnit[];
}

export interface UnitForm {
  id?: number | string;
  organization_id: number | null;
  unit_name_ar: string | null | any;
  unit_name_en?: string | null;
  short_name_ar: string;
  short_name_en?: string | null;
  allow_decimal?: number;
  multiplier: number;
  sub_units?: ISubUnit[];
}

export interface UnitUpdateForm {
  id?: number | null;
  data?: UnitForm;
}
