import { useLocation, usePageProps } from "@ziswapp/hooks";
import { useMemo } from "react";

type TypeOption<T> = {
  label: string;
  value: T;
};

export const useTypeSelectOption = () => {
  const { filter } = useLocation();
  const { types } = usePageProps();

  const typeId = useMemo(() => Number(filter?.type), [filter?.type]);

  const options: Array<TypeOption<Modules.Utilization.Models.UtilizationType>> = useMemo(
    () =>
      types?.map((type: Modules.Utilization.Models.UtilizationType) => ({
        label: type.name,
        value: type
      })) || [],
    [types]
  );

  const selected = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index = options.findIndex((option: any) => option.value.id === Number(typeId));

    return index !== -1 ? options[index] : null;
  }, [options, typeId]);

  return { selected, options };
};

export const useBeneficiarySelectOption = () => {
  const { beneficiaries } = usePageProps();

  const options: Array<TypeOption<Modules.Utilization.Models.BeneficiaryType>> = useMemo(
    () =>
      beneficiaries?.map(
        (type: Modules.Utilization.Models.BeneficiaryType) =>
          ({
            label: type.name,
            value: type
          }) || []
      ),
    [beneficiaries]
  );

  return { options };
};

export const useFundingSourceSelectOption = () => {
  const { sources } = usePageProps();

  const options: Array<TypeOption<Modules.Utilization.Models.FundingSource>> = useMemo(
    () =>
      sources?.map(
        (type: Modules.Utilization.Models.FundingSource) =>
          ({
            label: type.name,
            value: type
          }) || []
      ),
    [sources]
  );

  return { options };
};

export const useProgramSelectOption = () => {
  const { programs } = usePageProps();

  const options: Array<TypeOption<Ziswapp.Domain.Transaction.Model.Program>> = useMemo(
    () =>
      programs?.map(
        (program: Ziswapp.Domain.Transaction.Model.Program) =>
          ({
            label: program.name,
            value: program
          }) || []
      ),
    [programs]
  );

  return { options };
};

export const useStatusSelectOption = () => {
  const { filter } = useLocation();
  const statuses: Array<TypeOption<string>> = useMemo(
    () => [
      { value: "draft", label: "Draft" },
      { value: "new", label: "New" },
      { value: "cancel", label: "Cancel" }
    ],
    []
  );

  const status = useMemo(() => filter?.status, [filter?.status]);

  const selected = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index = statuses.findIndex((option: TypeOption<string>) => option.value === status);

    return index !== -1 ? statuses[index] : null;
  }, [statuses, status]);

  return { selected, options: statuses };
};
