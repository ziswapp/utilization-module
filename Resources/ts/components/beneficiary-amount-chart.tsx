import { Box } from "@chakra-ui/react";
import { useChartColors } from "@ziswapp/hooks/use-chart-colors";
import { useMemo } from "react";

import "@ziswapp/utils/chartjs";
import { Pie } from "react-chartjs-2";

interface BeneficiaryAmountChartProps {
  data: Array<{
    beneficiary: string;
    aggregate: number;
  }>;
}

export const BeneficiaryAmountChart = (props: BeneficiaryAmountChartProps) => {
  const colors = useChartColors();

  const labels = useMemo(() => props.data.map((item) => item.beneficiary), [props.data]);
  const data = useMemo(() => props.data.map((item) => item.aggregate), [props.data]);

  return (
    <Box w="full">
      <Pie
        height="350"
        data={{
          labels: labels,
          datasets: [
            {
              label: "Penggunaan per Asnaf",
              data: data,
              backgroundColor: colors
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </Box>
  );
};
