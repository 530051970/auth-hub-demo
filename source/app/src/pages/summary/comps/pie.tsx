

import { PieChart, Box } from "@cloudscape-design/components";
import React, { FC } from "react";

interface PieProps {
  data: {
    title: string,
    percentage: number,
    value: number,
  }[];
  title: string
}

// const Overview: React.FC<OverViewProps> = (props: OverViewProps) => {
const Pie: FC<PieProps> = (props: PieProps) => {
    const { title, data } = props;
    return (<PieChart
        data={data}
        visibleSegments={data}
        segmentDescription={(datum, sum) =>
          `${datum.value} units, ${(
            (datum.value / sum) *
            100
          ).toFixed(0)}%`
        }
        ariaDescription="Donut chart showing generic example data."
        ariaLabel="Donut chart"
        hideDescriptions
        hideFilter
        hideLegend
        hideTitles
        innerMetricDescription={title}
        innerMetricValue=""
        size="medium"
        variant="donut"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
          </Box>
        }
      />
    )
};
export default Pie;
