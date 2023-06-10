// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';

// const Chart = ({}) => {
//   const data = ['0', '1', '3', '5', '8', '0', '5'];
//   return (
//     <LineChart
//       data={{
//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         datasets: [
//           {
//             data: data,
//           },
//         ],
//       }}
//       width={Dimensions.get('window').width}
//       height={270}
//       yAxisInterval={5} // optional, defaults to 1
//       chartConfig={{
//         backgroundGradientFrom: '#fff',
//         backgroundGradientTo: '#fff',
//         decimalPlaces: 2,
//         color: (opacity = 1) => `rgba(20, 47, 33 / 0.5)`,
//         labelColor: (opacity = 1) => `rgba(20, 20, 0, ${opacity})`,
//       }}
//       bezier
//     />
//   );
// };

// export default Chart;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   chart: {
//     flex: 1,
//   },
// });
