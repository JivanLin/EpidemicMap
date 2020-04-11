//数据获取，省份及病例人数
var data = document.getElementById("province01").innerHTML
	.split("\n")//.split()字符串切割，返回数组，\n表示从换行开始切割
	.map(function(item){
		var it = item.split(" ");
		return ({name:it[1],value:it[2]});
	});//.map()数组遍历，返回值为一个新的数组，参数需要回调函数
	// console.log(data);
//省份名称
var dataname = document.getElementById("province02").innerHTML
	.split("\n").map(function(item){
		var start = item.indexOf("=")+1;
		var end = item.indexOf("(");
		var it = item.slice(start,end);
		return (it);
	});
	// console.log(dataname);
//省份拼音字母
var pingyin = document.getElementById("province02").innerHTML
	.split("\n").map(function(item){
		var start = item.indexOf("(")+1;
		var end = item.indexOf(")");
		var it = item.slice(start,end).toLowerCase();
		return (it);
	});
	// console.log(pingyin);
//数据可视化
var myChart_china = echarts.init(document.getElementById("china"));
var option_china = {
	title:{
		text:"中国各省份疫情数据统计",
		subtext:"数据来源于百度知道 2.20-3.19",
		sublink:"https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3",
		x:"center"
	},
	series:{
		name:"各个省份疫情数据",
		type:"map",
		map:"china",
		data:data,
		roam:true,
		label:{
			show:true,
		},
	},
	tooltip:{
		formatter:"{a}<br>{b}省<br>病例人数：{c}人"
	},
	visualMap:{
		splitList: [
			{min: 9999},{start: 1000, end:9999},{start: 100, end: 999},
			{start: 10, end: 99},{start: 1, end: 9}
		],
		color: ['#FF0000', '#FF4040', '#FF7F50','#FFA07A', '#FFA54F']
	}
};
myChart_china.setOption(option_china);

myChart_china.on("click",function(parames){
	var province = (dataname || []).findIndex((item) => item == parames.name);
	var name = pingyin[province];
	var script = document.createElement("script");
	script.src = "js/province/"+name+".js";
	document.body.appendChild(script);
	option_china.series.map = parames.name;
	option_china.title.text = parames.name+"省地图";
	var timer = window.setTimeout(function(){
		myChart_china.setOption(option_china);
	},200);
	document.getElementById("btn").style.display = "block";
});

// myChart_china.on("mousedown",function(parames){
// 	var province = (dataname || []).findIndex((item) => item == parames.name);
// 	var name = pingyin[province];
// 	var script = document.createElement("script");
// 	script.src = "js/province/"+name+".js";
// 	document.body.appendChild(script);
// });
// myChart_china.on("mouseup",function(parames){
// 	option_china.series.map = parames.name;
// 	option_china.title.text = parames.name+"省地图";
// 	myChart_china.setOption(option_china);
// 	document.getElementById("btn").style.display = "block";
// });
// console.log(option_china);


//btn按钮点击返回中国地图
function China(){
	document.body.lastElementChild.remove();
	option_china.series.map = "china";
	option_china.title.text = "中国各省份疫情数据统计",
	myChart_china.setOption(option_china,true);
	document.getElementById("btn").style.display = "none";
}