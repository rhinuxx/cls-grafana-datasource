import React, { ChangeEvent, PureComponent } from 'react'
import { LegacyForms, Legend, Icon, Tooltip, Switch, Select } from '@grafana/ui'
import { DataSourcePluginOptionsEditorProps, SelectableValue } from '@grafana/data'
import { MyDataSourceOptions, MySecureJsonData } from './common/types'
import { getRequestClient } from './common/utils'
import { InlineFieldRow,InlineField } from './component'
const { FormField, SecretFormField } = LegacyForms
import * as Constants from './common/constants'

type Props = DataSourcePluginOptionsEditorProps<MyDataSourceOptions, MySecureJsonData>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}


export class ConfigEditor extends PureComponent<Props, State> {
  patchJsonData = (kv: Record<string, any>) => {
    const { onOptionsChange, options } = this.props
    if (kv) {
      const jsonData = {
        ...options.jsonData,
        ...kv,
      }
      onOptionsChange({ ...options, jsonData })
    }
  }


  onProviderChange = (val: SelectableValue) => {
    const { onOptionsChange, options } = this.props
    const targetValue = (val.value)
      const jsonData = {
        ...options.jsonData,
        'provider': targetValue,
        RequestClient: getRequestClient(),
      }
      onOptionsChange({ ...options, jsonData })
    
    }

  
  onJsonDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props
    const targetDataset = event?.target?.dataset
    const targetValue = (event?.target?.value || '').trim()
    if (targetDataset.key) {
      const jsonData = {
        ...options.jsonData,
        [targetDataset.key]: targetValue,
        RequestClient: getRequestClient(),
      }
      onOptionsChange({ ...options, jsonData })
    }
  }



  // Secure field (only sent to the backend)
  onSecureJsonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props
    const targetDataset = event?.target?.dataset
    const targetValue = (event?.target?.value || '').trim()
    if (targetDataset.key) {
      onOptionsChange({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          [targetDataset.key]: targetValue,
        },
      })
    }
  }

  onResetSecureJson = (key: string) => {
    const { onOptionsChange, options } = this.props
    if (key) {
      onOptionsChange({
        ...options,
        secureJsonFields: {
          ...options.secureJsonFields,
          [key]: false,
        },
        secureJsonData: {
          ...options.secureJsonData,
          [key]: '',
        },
      })
    }
  }

  render() {
    const { options } = this.props
    const { jsonData, secureJsonFields } = options
    const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData

    return (
      <>
      <div className="gf-form-group">
          <Legend>日志代理服务器地址</Legend>
          <div className="gf-form">
            <FormField
              tooltip={
                <span>
                  日志代理服务为sinosre接口地址，也可以为腾讯云的日志服务地址（如果是腾讯云日志服务地址则只能查询腾讯云的日志）
                  sinosre代理: localhost:8088/searchlog
                  腾讯云内网 cls.internal.tencentcloudapi.com
                </span>
              }
          
              label="LogProxy"
              labelWidth={6}
              inputWidth={20}
              placeholder=""
              data-key="logproxy"
              value={jsonData.logproxy || ''}
              onChange={this.onJsonDataChange}
            />
          </div>
          </div>
         <div className="gf-form-group">
          <Legend>日志服务提供商</Legend>
       
          <InlineField label="日志提供商" labelWidth={15} tooltip="选择日志提供商">
          <div style={{ padding: 0 }}>
            <Select
              onChange={this.onProviderChange}
              value={jsonData.provider}
              options={Constants.DataSourceProviderFormatOptions}
            />
            </div>
          </InlineField>
          </div>

          <div className="gf-form-group">
          <Legend>
            Security Credentials
        
          </Legend>   
   
          <div className="gf-form">
            <SecretFormField
              isConfigured={secureJsonFields?.secretId as boolean}
              value={secureJsonData.secretId || ''}
              label="SecretId"
              labelWidth={6}
              inputWidth={20}
              data-key="secretId"
              onReset={() => this.onResetSecureJson('secretId')}
              onChange={this.onSecureJsonChange}
            />
          </div>
          <div className="gf-form">
            <SecretFormField
              isConfigured={secureJsonFields?.secretKey as boolean}
              value={secureJsonData.secretKey || ''}
              label="SecretKey"
              labelWidth={6}
              inputWidth={20}
              data-key="secretKey"
              onReset={() => this.onResetSecureJson('secretKey')}
              onChange={this.onSecureJsonChange}
            />
          </div>
        </div>

        {jsonData.provider === 'AliYunSLS' && (
          <div className="gf-form-group">
          <Legend>阿里云-日志服务配置</Legend>
          <div className="gf-form">
            <FormField
              tooltip={
                <span>
                  日志服务提供各种内网、公网等网络，不同网络的接入方式请参见使用Logtail收集各网络日志数据。
                  您可以在Project的概览页面，查看该Project所在地域的服务入口如香港cn-hongkong.log.aliyuncs.com
                </span>
              }
          
              label="Endpoint"
              labelWidth={6}
              inputWidth={20}
              placeholder=""
              data-key="endpoint"
              value={jsonData.endpoint || ''}
              onChange={this.onJsonDataChange}
            />
          </div>
          <div className="gf-form">
            <FormField
              tooltip={
                <span>
                  项目（Project）是日志服务的资源管理单元，是进行多用户隔离与访问控制的主要边界
                </span>
              }
              label="Project"
              labelWidth={6}
              inputWidth={20}
              placeholder=""
              data-key="project"
              value={jsonData.project || ''}
              onChange={this.onJsonDataChange}
            />
          </div>
          <div className="gf-form">
            <FormField
              tooltip={
                <span>
                  日志库（Logstore）是日志服务中日志数据的采集、存储和查询单元
                </span>
              }
              label="Logstore"
              labelWidth={6}
              inputWidth={20}
              placeholder=""
              data-key="logstore"
              value={jsonData.logstore || ''}
              onChange={this.onJsonDataChange}
            />
          </div>
        </div>
        )}


        {jsonData.provider === 'TencentCloudCLS' && (
           <div className="gf-form-group">
           <Legend>腾讯云-日志服务配置</Legend>
             <div className="gf-form">
             <FormField
                tooltip={
                   <span>
                    日志服务区域简称，例如北京区域填写ap-beijing，完整区域列表格式参考
             </span>
             }
          label="Region"
          labelWidth={6}
           inputWidth={20}
          placeholder=""
          data-key="region"
          value={jsonData.region || ''}
          onChange={this.onJsonDataChange}
         />
       </div>
      <div className="gf-form">
        <FormField
           tooltip={
             <span>

                日志主题ID
              
             </span>
          }
           label="TopicId"
           labelWidth={6}
           inputWidth={20}
           placeholder=""
          data-key="topicId"
          value={jsonData.topicId || ''}
          onChange={this.onJsonDataChange}
        />
        </div>
        </div>
        )} 
      </>
    )
  }
}
