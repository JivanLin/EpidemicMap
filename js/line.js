//显示日期天数
var dataX = document.getElementById("quanguo").innerHTML
	.split("\n")//.split()字符串切割，返回数组，\n表示从换行开始切割
	.map(function(item){
		var it = item.split(" ");
		return it[0];
	});//.map()数组遍历，返回值为一个新的数组，参数需要回调函数
	// console.log(dataX);
//累计确诊
var dataL = document.getElementById("quanguo").innerHTML
	.split("\n").map(function(item){
		var it = item.split(" ");
		return it[1];
	});
	// console.log(dataL);
//现有确诊
var dataQ = document.getElementById("quanguo").innerHTML
	.split("\n").map(function(item){
		var it = item.split(" ");
		return it[2];
	});
	// console.log(dataQ);
//现有疑似
var dataY = document.getElementById("quanguo").innerHTML
	.split("\n").map(function(item){
		var it = item.split(" ");
		return it[3];
	});
	// console.log(dataY);
//累计自愈
var dataZ = document.getElementById("quanguo").innerHTML
	.split("\n").map(function(item){
		var it = item.split(" ");
		return it[4];
	});
	// console.log(dataZ);


// 数据可视化,初始化echarts实例
var myChart_line = echarts.init(document.getElementById("line"));
//设置图标内容option里面json格式  名：值
var option_line = {
	title: {
		text: "全国 现有确诊/疑似/累计确诊/累计治愈 趋势",
		subtext:"数据来源百度知道",
		sublink:"https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3",
		x:"center",
	},
	tooltip:{//数据提示信息
		show: true,
		trigger:"axis",
		// extraCssText:"width:200px;height:60px",
	},
	xAxis:{//X轴坐标系，category：自定义显示内容，配合data值
		type:"category",
		data:dataX,
	},
	yAxis:{
		name:"单位：例",
		type:"value",
	},
	dataZoom:[
		{
			type:"inside",//图表随着鼠标滚轮放大缩小
			start:0,
			end:100
		},
		{
			type:"slider",
			start:0,
			end:100
		}
	],
	series: [
		{
			name:"现有确诊",
			type:"line",
			data:dataQ,
			itemStyle:{
				color:"#FF00FF",
			}
		},
		{
			name:"现有疑似",
			type:"line",
			data:dataY,
			itemStyle:{
				color:"#EE4000"
			}
		},
		{
			name:"累计确诊",
			type:"line",
			data:dataL,
			itemStyle:{
				color:"#FF0000"
			}
		},
		{
			name:"累计治愈",
			type:"line",
			data:dataZ,
			itemStyle:{
				color:"#0000FF"
			}
		}
	]
};
//把图表放入实例中
myChart_line.setOption(option_line);