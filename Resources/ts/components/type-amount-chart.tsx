import { Box } from "@chakra-ui/react";
import { useChartColors } from "@ziswapp/hooks/use-chart-colors";
import { useMemo } from "react";

import "@ziswapp/utils/chartjs";
import { Bar } from "react-chartjs-2";

interface TypeAmountChartProps {
  data: Array<{
    type: string;
    aggregate: number;
  }>;
}

export const TypeAmountChart = (props: TypeAmountChartProps) => {
  const colors = useChartColors();

  const labels = useMemo(() => props.data.map((item) => item.type), [props.data]);
  const data = useMemo(() => props.data.map((item) => item.aggregate), [props.data]);

  return (
    <Box w="full">
      <Bar
        height="350"
        data={{
          labels: labels,
          datasets: [
            {
              label: "Penggunaan per Jenis",
              data: data,
              backgroundColor: colors
            }
          ]
        }}
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </Box>
  );
};
