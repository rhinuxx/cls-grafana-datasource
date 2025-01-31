import React, { ChangeEvent, PureComponent } from 'react'
import { QueryEditorProps, SelectableValue } from '@grafana/data'
import * as _ from 'lodash'
import * as Constants from './common/constants'
import { DataSource } from './DataSource'
import { defaultQuery, MyDataSourceOptions, MyQuery, myQueryRuntime } from './common/types'
import { Input, Select } from '@grafana/ui'
import { InlineFieldRow, InlineField } from './component'

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>

export class QueryEditor extends PureComponent<Props> {
  partialOnChange = (val: Partial<MyQuery>) => {
    const { onChange, query } = this.props
    const oldQuery = _.pick(query, Object.keys(myQueryRuntime))
    onChange(({ ...oldQuery, ...val } as unknown) as MyQuery)
  }

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetDataset: any = event?.target.dataset
    const targetValue =
      targetDataset?.key === 'Query' ? event.target.value : (event.target.value || '').trim()
    this.partialOnChange({ [targetDataset.key]: targetValue })
  }

  onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetDataset: any = event?.target.dataset
    const val = isNaN(Number(event.target.value)) ? 0 : Number(event.target.value)
    this.partialOnChange({ [targetDataset.key]: val })
  }

  onFormatChange = (val: SelectableValue) => {
    const { onRunQuery } = this.props
    this.partialOnChange({ format: val.value })
    onRunQuery()
  }
  onEnableLabelsChange = (val: SelectableValue) => {
    const { onRunQuery } = this.props
    this.partialOnChange({ enablelabels: val.value })
    onRunQuery()
  }

  render() {
    const query = _.defaults(this.props.query, defaultQuery)
    return (
      <div>
        <InlineFieldRow>
          <InlineField label="Query" labelWidth={12}>
            <Input
              placeholder="log query"
              value={query.Query || ''}
              data-key="Query"
              onChange={this.onInputChange}
              onBlur={this.props.onRunQuery}
              css={false}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineField label="Format" labelWidth={12} tooltip="待展示图表类型">
            <Select
              onChange={this.onFormatChange}
              value={query.format}
              options={Constants.QueryEditorFormatOptions}
            />
          </InlineField>
        </InlineFieldRow>
        {query.format === 'Graph' && (
          <InlineFieldRow>
            <InlineField label="Metrics" labelWidth={12} tooltip="待统计指标">
              <Input
                placeholder="metrics"
                value={query.metrics || ''}
                data-key="metrics"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>
            <InlineField label="Bucket" labelWidth={12} tooltip="聚合列名称（选填）">
              <Input
                placeholder="bucket"
                value={query.bucket || ''}
                data-key="bucket"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>
            <InlineField
              label="Time"
              labelWidth={12}
              tooltip="若查询结果为连续时间数据，则需指定 time 字段。否则不填写"
            >
              <Input
                placeholder="timeSeries"
                value={query.timeSeriesKey || ''}
                data-key="timeSeriesKey"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>   
            <InlineField label="Labels" labelWidth={8} tooltip="是否开启labels显示，该选项用于兼容grafana8.2的alert功能">
            <Select
              onChange={this.onEnableLabelsChange}
              value={query.enablelabels}
              options={Constants.QueryEditorLabelsOptions}
              />
            </InlineField>
          </InlineFieldRow>
        )}
        {query.format === 'Log' && (
          <InlineFieldRow>
            <InlineField label="Limit" labelWidth={12} tooltip="用于指定返回日志检索结果条数">
              <Input
                value={query.Limit}
                data-key="Limit"
                onChange={this.onNumberChange}
                onKeyPress={(event) => /[\d]/.test(String.fromCharCode(event.keyCode))}
                onBlur={this.props.onRunQuery}
                css={false}
                type="number"
                step={1}
                min={1}
              />
            </InlineField>
          </InlineFieldRow>
        )}
        {query.format === 'AlertTable' && (
          <InlineFieldRow>
            <InlineField label="Metrics" labelWidth={12} tooltip="待预警的指标，只支持一个且为数值型">
              <Input
                placeholder="metrics"
                value={query.metrics || ''}
                data-key="metrics"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>
          </InlineFieldRow>
        )}
         {query.format === 'PrometheusFormat' && (
          <InlineFieldRow>
            <InlineField label="Metrics" labelWidth={12} tooltip="待预警的指标，只支持一个且为数值型">
              <Input
                placeholder="metrics"
                value={query.metrics || ''}
                data-key="metrics"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>
            <InlineField label="MyLabels" labelWidth={64} tooltip="labels格式 k1:v1,k2:v2,k3:v3 (选填）">
              <Input
                placeholder="MyLabels"
                value={query.myLabels || ''}
                data-key="MyLabels"
                onChange={this.onInputChange}
                onBlur={this.props.onRunQuery}
                css={false}
              />
            </InlineField>
          </InlineFieldRow>
        )}
      </div>
    )
  }
}
