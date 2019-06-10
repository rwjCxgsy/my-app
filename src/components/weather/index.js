import React, {Component} from 'react'
import jsonp from 'jsonp'
import styles from './index.module.less'
import {message} from 'antd'

import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default class Weather extends Component {

    state = {
        weather: {},
        local: {}
    }

    render () {
        const {local, weather} = this.state
        const {sk = {}, today = {}} = weather
        return(
            <div className={styles.weather}>
                <address>{local.country}，{local.province}，{local.city}</address>
                <div>更新于:{sk.time}</div>
                <div>{today.weather}</div>
                <div className={styles['weather-main']}>
                    <div className={styles.left}>
                        <img src="//ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt={sk.temp}/>
                        <strong>{sk.temp}</strong>
                        <span>°C</span>
                    </div>
                    <div className={styles.right}>
                        <div>风力: {sk.wind_strength}</div>
                        <div>湿度: {sk.humidity}</div>
                        <div>风向: {sk.wind_direction}</div>
                    </div>
                </div>
                <div id="weather"></div>
            </div>
        )
    }

    getData (url, option = {}) {
        return new Promise((resolve, reject) => {
          // const data = {
          //   "resultcode":"200",
          //   "reason":"successed!",
          //   "result":{"sk":{"temp":"18","wind_direction":"东北风","wind_strength":"5级","humidity":"76%","time":"14:13"},"today":{"temperature":"14℃~22℃","weather":"晴转多云","weather_id":{"fa":"00","fb":"01"},"wind":"持续无风向微风","week":"星期三","city":"成都","date_y":"2019年04月10日","dressing_index":"较舒适","dressing_advice":"建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。","uv_index":"中等","comfort_index":"","wash_index":"较适宜","travel_index":"较适宜","exercise_index":"较适宜","drying_index":""},"future":{"day_20190410":{"temperature":"14℃~22℃","weather":"晴转多云","weather_id":{"fa":"00","fb":"01"},"wind":"持续无风向微风","week":"星期三","date":"20190410"},"day_20190411":{"temperature":"15℃~23℃","weather":"阴转小雨","weather_id":{"fa":"02","fb":"07"},"wind":"持续无风向微风","week":"星期四","date":"20190411"},"day_20190412":{"temperature":"16℃~23℃","weather":"小雨转多云","weather_id":{"fa":"07","fb":"01"},"wind":"持续无风向微风","week":"星期五","date":"20190412"},"day_20190413":{"temperature":"14℃~22℃","weather":"多云转阵雨","weather_id":{"fa":"01","fb":"03"},"wind":"持续无风向微风","week":"星期六","date":"20190413"},"day_20190414":{"temperature":"12℃~22℃","weather":"多云转小雨","weather_id":{"fa":"01","fb":"07"},"wind":"持续无风向微风","week":"星期日","date":"20190414"},"day_20190415":{"temperature":"15℃~23℃","weather":"阴转小雨","weather_id":{"fa":"02","fb":"07"},"wind":"持续无风向微风","week":"星期一","date":"20190415"},"day_20190416":{"temperature":"16℃~23℃","weather":"小雨转多云","weather_id":{"fa":"07","fb":"01"},"wind":"持续无风向微风","week":"星期二","date":"20190416"}}},
          //   "error_code":0
          // }
          // resolve(data)
          jsonp(url, option, (err, data) => {
            if (err) {
              reject(err)
            }
            resolve(data)
          })
        })
      }

      componentWillMount () {
          this.init()
      }

      async init () {
        const local = await this.getLocaltion()
        // const {city} = local
        if (!local) {
          console.log('定位失败')
          return false
        }
        this.initData(local)
      }

      componentDidUpdate () {
          console.log(this.state)
          const {weather = {}} = this.state
          const {future} = weather
          if (!future) {
              message.error('天气数据出错')
              return false
          }
          var data = Object.keys(future).map(v => {

                const [min, max] = future[v].temperature.match(/(\d+)+/g)
                return {
                    min: min - 0,
                    max: max - 0,
                    time: v.replace(/day_/, '')
                }
          })
          console.log(data)
          var ds = new DataSet();
          var dv = ds.createView().source(data);
          // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
          dv.transform({
            type: 'fold',
            fields: ['max', 'min'], // 展开字段集
            key: 'range', // key字段
            value: 'temperature' // value字段
          });
          var chart = new G2.Chart({
            container: 'weather',
            forceFit: true,
            height: 400
          });
          chart.source(dv, {
            time: {
              range: [0, 1]
            }
          });
          chart.tooltip({
            crosshairs: {
              type: 'line'
            }
          });
          chart.axis('temperature', {
            label: {
              formatter: function formatter(val) {
                return val + '°C';
              }
            }
          });
          chart.line().position('time*temperature').color('range').shape('smooth');
          chart.point().position('time*temperature').color('range').size(4).shape('circle').style({
            stroke: '#fff',
            lineWidth: 1
          });
          chart.render();
      }

      getLocaltion () {
            return new Promise((resolve, reject) => {
                window.amapLoad  = function () {
                    const AMap = window.AMap
                    console.log(AMap)
                    AMap.plugin('AMap.Geolocation', (...arg) => {
                        new AMap.Geolocation().getCityInfo((...arg) => {
                            console.log(arg)
                            if (arg[0] === 'complete') {
                                console.log(arg[1])
                                resolve(arg[1])
                            } else {
                                message.error('位置获取失败')
                                resolve()
                            }
                        })
                    })
                }
                const url = 'https://webapi.amap.com/maps?v=1.4.14&key=a8d3fbbe209d4bcf6018e6530eea3d27&callback=amapLoad&plugin=AMap.Geolocation';
                const jsapi = document.createElement('script');
                jsapi.charset = 'utf-8';
                jsapi.src = url;
                document.head.appendChild(jsapi);
            })
      }
    
      async initData (local) {
        const cityname = encodeURIComponent(local.city)
        try {
          const d = await this.getData(`http://v.juhe.cn/weather/index?cityname=${cityname}&key=6b1333527278ef25ef6b36e3755efe84`)
          if (d.result) {
            this.setState({
                local,
                weather: d.result
            })
          }
        } catch (error) {
          message.error('天气收取失败')
          console.log(error)
        }
    }
}