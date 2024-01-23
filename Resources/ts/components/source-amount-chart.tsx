import { Box } from "@chakra-ui/react";
import { useChartColors } from "@ziswapp/hooks/use-chart-colors";
import { useMemo } from "react";

import "@ziswapp/utils/chartjs";
import { Pie } from "react-chartjs-2";

interface SourceAmountChartProps {
  data: Array<{
    source: string;
    aggregate: number;
  }>;
}

export const SourceAmountChart = (props: SourceAmountChartProps) => {
  const colors = useChartColors();

  const labels = useMemo(() => props.data.map((item) => item.source), [props.data]);
  const data = useMemo(() => props.data.map((item) => item.aggregate), [props.data]);

  return (
    <Box w="full">
      <Pie
        height="350"
        data={{
          labels: labels,
          datasets: [
            {
              label: "Penggunaan per Sumber Dana",
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
