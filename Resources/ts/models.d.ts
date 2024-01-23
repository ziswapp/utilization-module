namespace Modules.Utilization.Models {
  import Branch = Ziswapp.Domain.Foundation.Model.Branch;
  import User = Ziswapp.Domain.Foundation.Model.User;

  export interface UtilizationType {
    id: number;
    name: string;
    is_active: boolean;
    is_distribution: boolean;
    created_at: string | null;
    updated_at: string | null;
  }

  export interface FundingSource {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
  }

  export interface BeneficiaryType {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
  }

  export interface Utilization {
    id: string;

    branch_id: number;
    branch: Pick<Branch, "id" | "name">;

    user_id: number;
    user: Pick<User, "id" | "name">;

    utilization_type_id: number;
    type: Pick<UtilizationType, "id" | "name" | "is_distribution">;

    identification_number: string;
    description: string;
    status: "new" | "cancel" | "draft";
    use_at: string;
    amount: number;

    payment_type: "transfer" | "cash";
    bank_name: string | null;
    bank_account_number: string | null;
    bank_account_name: string | null;

    distribution_at: string | null;

    distribution_program_id: number | null;
    program: Record<"id" | "name", string> | null;

    distribution_program_description: string | null;
  }

  export interface UtilizationItem {
    id: string;
    utilization_id: string;

    funding_source_id: number;
    source: null | Pick<FundingSource, "id" | "name">;

    beneficiary_type_id: number;
    beneficiary: null | Pick<BeneficiaryType, "id" | "name">;

    description: string;
    amount: number;
  }

  export interface Beneficiary {
    id: string;
    id: string;

    branch_id: number;
    branch: Pick<Branch, "id" | "name">;

    user_id: number;
    user: Pick<User, "id" | "name">;

    beneficiary_type_id: number;
    type: Pick<BeneficiaryType, "id" | "name">;

    identification_number: string;
    name: string;
    nik: string | null;

    sex: string | null;
    age_range: string | null;

    email: string | null;
    phone: string | null;
    phone_country: string | null;

    address: string | null;

    province: Record<"id" | "code" | "name", string>;
    province_code: string | null;

    city: Record<"id" | "code" | "name", string>;
    city_code: string | null;

    district: Record<"id" | "code" | "name", string>;
    district_code: string | null;

    village: Record<"id" | "code" | "name", string>;
    village_code: string | null;
    postal_code: string | null;
  }
}
