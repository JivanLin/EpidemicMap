//数据获取，湖北省各市区数量及经纬度
var data_geo = document.getElementById("geo").innerHTML
	.split("\n")//.split()字符串切割，返回数组，\n表示从换行开始切割
	.map(function(item){
		var it = item.split(" ");
		return {name:it[0],value:[it[2],it[3],it[1]]};
	});//.map()数组遍历，返回值为一个新的数组，参数需要回调函数
	console.log(data_geo);
//各市区病例数量
var data_num = document.getElementById("geo").innerHTML
	.split("\n").map(function(item){
		var it = item.split(" ");
		return {name:it[0],value:it[1]};
	});//.map()数组遍历，返回值为一个新的数组，参数需要回调函数
	console.log(data_num);
//数据可视化
var myChart = echarts.init(document.getElementById("hubei"));
var option = {
	title:{
		text:"湖北省疫情数据分布图",
		subtext:"数据来源百度知道 3.19",
		sublink:"https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3",
		x:"center"
	},
	geo:{
		map:"湖北"
	},
	series:[
		{
			name:"疫情数据分散点",
			type:"effectScatter",
			coordinateSystem:"geo",
			data:data_geo
		},
		{
			name:"疫情数据病例统计",
			type:"map",
			map:"湖北",
			data:data_num,
			label:{
				show:true
			}
		},
		{
			name:"疫情数据散点分布",
			type:"lines",
			coordinateSystem:"geo",
			lineStyle:{
				color:"#9400D3",
				curveness:0.5,//-1到1取值，0为直线，1弯曲度最大
				width:2
			},
			effect:{
				show:true
			},
			data:[
				{coords: [[114.30,30.60],[113.92,30.93]]},
				{coords: [[114.30,30.60],[114.87,30.45]]},
				{coords: [[114.30,30.60],[112.23,30.33]]},
				{coords: [[114.30,30.60],[114.88,30.40]]},
				{coords: [[114.30,30.60],[113.37,31.72]]},
				{coords: [[114.30,30.60],[112.20,32.08]]},
				{coords: [[114.30,30.60],[115.03,30.20]]},
				{coords: [[114.30,30.60],[111.28,30.70]]},
				{coords: [[114.30,30.60],[112.20,31.03]]},
				{coords: [[114.30,30.60],[114.32,29.85]]},
				{coords: [[114.30,30.60],[110.78,32.65]]},
				{coords: [[114.30,30.60],[113.45,30.37]]},
				{coords: [[114.30,30.60],[113.17,30.67]]},
				{coords: [[114.30,30.60],[109.47,30.30]]},
				{coords: [[114.30,30.60],[112.88,30.42]]},
				{coords: [[114.30,30.60],[110.67,31.75]]}
			]
		}
	],
	visualMap:[
	{
		min:0,
		max:5000,
		inRange:{
			color:["#ccccff","#0000ff"]
		},
		seriesIndex:0
	},
	{
		min:0,
		max:5000,
		inRange:{
			color:["#ffcccc","#ff0000"]
		},
		seriesIndex:1
	},
	],
	tooltip:{
		formatter:"{a}<br>{b}<br>经纬度及病例人数：{c}"
	}
};
myChart.setOption(option);