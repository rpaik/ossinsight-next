import type {
  EChartsVisualizationConfig,
  WidgetVisualizerContext,
} from '@ossinsight/widgets-types';

type Params = {
  repo_id: string;
};

type DataPoint = {
  idx: number;
  current_period_closed_day_issues: number;
  current_period_closed_issues: number;
  current_period_day: string;
  current_period_opened_day_issues: number;
  current_period_opened_issues: number;
  last_period_closed_day_issues: number;
  last_period_closed_issues: number;
  last_period_day: string;
  last_period_opened_day_issues: number;
  last_period_opened_issues: number;
};

type Input = [DataPoint[], DataPoint[] | undefined];

export default function (
  data: Input,
  ctx: WidgetVisualizerContext<Params>
): EChartsVisualizationConfig {
  const [main, vs] = data;

  return {
    dataset: {
      source: [...main.sort((a, b) => a.idx - b.idx)],
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        encode: {
          x: 'current_period_day',
          y: 'current_period_opened_day_issues',
        },
        smooth: true,
        color: ctx.theme.colors.green['400'],
        name: 'Opened',
      },
      {
        type: 'line',
        showSymbol: false,
        encode: {
          x: 'current_period_day',
          y: 'current_period_closed_day_issues',
        },
        smooth: true,
        color: ctx.theme.colors.indigo['400'],
        name: 'Merged',
      },
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
  };
}

export const type = 'echarts';

export function onSizeChange(
  instance: any,
  result: any,
  width: number,
  height: number
) {
  instance.resize({ width, height });
}
