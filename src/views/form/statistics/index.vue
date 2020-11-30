<template>
  <div>
    <p class="title">统计图表</p>
    <div class="top">
      <div>
        <router-link to="/form/statistics"><p>统计报表</p></router-link>
      </div>
      <div>
        <router-link to="/form/details"><p>详细列表</p></router-link>
      </div>
    </div>
    <div class="middle">
      <div class="first">
        <p>报&nbsp;警&nbsp;数</p>
        <p>当&nbsp;天 次 数：&nbsp;11</p>
        <p>本 月 总 次 数：&nbsp;130213</p>
      </div>
      <div class="second">
        <p>在&nbsp;线&nbsp;设&nbsp;备</p>
        <p>在 线： 12089 离 线： 11</p>
        <p>总 设 备： 12100</p>
      </div>
      <div class="last">
        <p>在&nbsp;线&nbsp;率</p>
        <p>今 日 在 线 率： 99%</p>
        <p>本 月 在 线 率： 96%</p>
      </div>
    </div>
    <div class="echarts">
      <p>报警图</p>
      <div>
        <v-chart class="mychart" :options="bar" />
      </div>
      <!-- <p class="online">在线设备</p>
      <div>
        <v-chart class="mychart" :options="options" />
      </div> -->
    </div>
    <p class="online">在线设备</p>
    <div>
      <v-chart class="mychart" :options="options" />
    </div>
    <p class="onlines">在线率</p>
    <div>
      <v-chart class="mychart" :options="option" />
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
export default {
  data() {
    return {
      bar: {
        title: {},
        tooltip: {
          trigger: "axis"
        },
        color: ["#3DB6FC"],

        xAxis: [
          {
            type: "category",
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ],
            name: "日期",
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                fontSize: "16"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "次数",
            min: 0,
            max: 180,
            interval: 30, //间隔
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              formatter: "{value} ",
              textStyle: {
                color: "#000",
                fontSize: 16
              }
            }
          }
        ],

        series: [
          {
            name: "次数",
            type: "bar",
            stack: "个人信息",
            data: [105, 110, 120, 10],
            barWidth: 15
          }
        ]
      },
      options: {
        title: {},
        tooltip: {
          trigger: "axis"
        },
        color: ["#0cad57"],

        xAxis: [
          {
            type: "category",
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ],
            name: "日期",
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                fontSize: "16"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "台数",
            min: 0,
            max: 18000,
            interval: 3000, //间隔
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              formatter: "{value} ",
              textStyle: {
                color: "#000",
                fontSize: 16
              }
            }
          }
        ],

        series: [
          {
            name: "台数",
            type: "bar",
            data: [11985, 11990, 11980, 12089],
            barWidth: 15,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  marginTop: 30,
                  textStyle: {
                    //数值样式
                    color: "#000",
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      },
      option: {
        title: {},
        tooltip: {
          trigger: "axis"
        },
        color: ["#ff8800"],

        xAxis: [
          {
            type: "category",
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ],
            name: "日期",
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                fontSize: "16"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "台数",
            min: 0,
            max: 100,
            interval: 20, //间隔
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
            nameTextStyle: {
              color: "#000",
              fontSize: 20
            },
            axisLabel: {
              formatter: "{value} ",
              textStyle: {
                color: "#000",
                fontSize: 16
              }
            }
          }
        ],
        series: [
          {
            name: "台数",
            type: "line",
            data: [
              ((11985 / 12100) * 100).toFixed(2),
              ((11990 / 12100) * 100).toFixed(2),
              ((11980 / 12100) * 100).toFixed(2),
              ((12089 / 12100) * 100).toFixed(2)
            ],
            barWidth: 15
          }
        ]
      }
    };
  },

  components: {
    "v-chart": ECharts
  }
};
</script>

<style scoped>
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  margin: 10px 30px;
  /* margin-bottom: 20px; */
  border-bottom: 1px solid #666666;
  display: flex;
}
.top div {
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
}
.top div:hover {
  border-bottom: 2px solid #729bdb;
}
.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #729bdb;
  /* font-weight: bold; */
}
.middle {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.middle div {
  width: 200px;
  /* height: 90px; */
  border-radius: 8px;
}
.middle p {
  margin: 0;
  padding: 0;
  color: #fff;
}
.first {
  background-color: #fc2a2a;
  margin-right: 30px;
}
.second {
  background-color: #0cac57;
  margin-right: 30px;
}
.last {
  background-color: #ff8800;
}
.first :first-child {
  font-size: 24px;
  margin: 8px 15px;
}
.first :not(:first-child) {
  margin: 8px 15px;
  font-size: 12px;
}
.second :first-child {
  font-size: 24px;
  margin: 8px 15px;
}
.second :not(:first-child) {
  margin: 8px 15px;
  font-size: 12px;
}
.last :first-child {
  font-size: 24px;
  margin: 8px 15px;
}
.last :not(:first-child) {
  margin: 8px 15px;
  font-size: 12px;
}
.echarts {
  margin: 50px 30px;
  width: 95%;
}
.echarts :first-child {
  font-size: 26px;
  color: #fc2a2a;
  text-align: center;
}
.online {
  font-size: 26px;
  color: #0cad57;
  text-align: center;
}
.onlines {
  font-size: 26px;
  color: #ff8800;
  text-align: center;
}
.mychart {
  width: 100%;
  margin-top: -20px;
}
</style>
