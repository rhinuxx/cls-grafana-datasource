import { DataQuery, DataSourceJsonData, DataSourceSettings } from '@grafana/data'

export interface MyQuery extends DataQuery {
  Query?: string
  Limit?: number
  Sort?: 'asc' | 'desc'
  // 解析使用字段
  format?: 'Graph' | 'Table' | 'Log' | 'AlertTable'| 'PrometheusFormat'
  timeSeriesKey?: string
  bucket?: string
  metrics?: string
  myLabels?: string
  enablelabels?: 'NO' | 'YES'
}

/** MyQuery的运行时版本，用于将query中的不合法字段进去移除，保证query是个MyQuery类型的数据 */
export const myQueryRuntime: Required<MyQuery> = {
  Query: '',
  Limit: 20,
  Sort: 'asc',
  format: 'Graph',
  timeSeriesKey: '',
  bucket: '',
  metrics: '',
  myLabels: '',
  enablelabels: 'NO',


  refId: '',
  hide: false,
  key: '',
  queryType: '',
  datasource: '',
}

export const defaultQuery: Partial<MyQuery> = {
  Query: '',
  Limit: 20,
  format: 'Graph',
}

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  provider?: 'AliYunSLS' | 'TencentCloudCLS'
  logproxy: string
  region: string
  logsetId?: string
  topicId: string
  /** 是否使用腾讯云API内网接入点 */
  intranet?: boolean
  /** 阿里云配置信息 */
  endpoint: string
  project: string
  logstore: string


}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  secretId: string
  secretKey: string
}

export type ClsDataSourceSettings = DataSourceSettings<MyDataSourceOptions, MySecureJsonData>
