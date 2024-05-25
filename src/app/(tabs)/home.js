import { View, Text, Dimensions} from 'react-native'
import React from 'react'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const home = () => {
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.5, 0.6, 0.8]
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  return (
    <View>
      <ProgressChart
        data={data}
        width={400}
        height={300}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  )
}

export default home