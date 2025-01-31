import * as _ from 'lodash'

export const QueryEditorFormatOptions = [
  { value: 'Graph', label: 'Graph, Pie, Gauge Panel' }, // 必定返回时间列，如果未输入时间列，则补一列时间0
  { value: 'Table', label: 'Table Panel' }, // 将原始日志或分析结果转化为Table
  { value: 'Log', label: 'Log Panel' }, // 只处理原始日志内容
  { value: 'AlertTable', label: 'AlertTable Panel' }, // 将原始日志或分析结果转化为带数值类型的Table，兼容grafana8.2 Alert格式
//  { value: 'PrometheusFormat', label: 'PrometheusFormat Panel'},
]
export const QueryEditorLabelsOptions = [
  { value: 'NO', label: 'Disable' }, // 默认不开启标签
  { value: 'YES', label: 'Enable' }, // 支持grafana8.2告警需要开启标签
]
export const DataSourceProviderFormatOptions = [
  { value: 'AliYunSLS', label: '阿里云-SLS' }, // 
  { value: 'TencentCloudCLS', label: '腾讯云-CLS' }, // 将原始日志或分析结果转化为Table
]