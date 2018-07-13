//目录
var catalog={
	"read":[
		{"title":"计算机是如何启动的？","href":"html/read/how-computer-bootup.html"}
		],
	"algorithm":[
		{"title":"存储大量文件，让每个文件夹下的文件或文件夹数量不大于1024","href":"html/algorithm/store-files-in-file-sytem-less-than-1024-each.html"},
		{"title":"打乱数组排列顺序","href":"html/algorithm/disrupt-array-order.html"},
		{"title":"二个数组分别分成小数组,使A中小数组大小与B中小数组大小的乘积小于一个值","href":"html/algorithm/divide-two-arrays-by-condition.html"},
		{"title":"SQL:查询条件有两个in,分组拼接查询,分页","href":"html/algorithm/query-from-database-by-group.html"},
		{"title":"SQL:查询条件有两个in,分组拼接查询,分页-2","href":"html/algorithm/query-from-database-by-group2.html"},
		{"title":"二叉树","href":"html/algorithm/build-binary-tree.html"}
	],
	"tools":[
		{"title":"url md5 签名","href":"html/tools/argument-signatures-by-md5.html"},
		{"title":"分隔符转换","href":"html/tools/js-delimiter-transfer.html"},
		{"title":"判断一个数是否是质数","href":"html/tools/js-is-prime.html"}
	]
}
var colors = ["btn-primary","btn-success","btn-info","btn-warning","btn-danger"];

var lihtml = '<li><a href="#{href}">#{title}</a></li>';
var button = '<div class="btn-group">'+
  				'<button type="button" class="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
    					'#{key} <span class="caret"></span>'+
  				'</button>'+
  				'<ul class="dropdown-menu">'+
  					'#{lis}'+
  				'</ul>'+
			'</div>';
var alink = '<p><a class="link" href="#{href}" role="button">#{title}</a></p>';
$(function(){
	//catalog
	/**
	var keys = Object.keys(catalog);
	var buttonsHtml = "";
	for(var i = 0; i < keys.length; i ++){
		var key =keys[i];
		var links = catalog[key];
		var lisHtml = "";
		$.each(links,function(i,link){
			var title = link.title;
			var href = link.href;
			lisHtml += lihtml.replace("#{href}",href).replace("#{title}",title);
		});
		var color = colors[i%5]
		buttonsHtml += button.replace("#{btn-color}",color).replace("#{key}",key).replace("#{lis}",lisHtml)+'<br /><br />';
	}
	$("#catalog").empty().append('<div class="catalog">' + buttonsHtml + '</div>');
	*/
	var keys = Object.keys(catalog);
	var allLinks = [];
	for(var i = 0; i < keys.length; i ++){
		var key =keys[i];
		var links = catalog[key];
		allLinks = allLinks.concat(links);
	}
	var alinksHtml = ""; 
	var indxArr = notRepeatedRandomInt(0,allLinks.length-1,100);
	for(var i = 0; i < indxArr.length; i ++){
		var link = allLinks[indxArr[i]];
		alinksHtml += alink.replace("#{href}",link.href).replace("#{title}",link.title)
	}
	$("#aLinks").empty().append(alinksHtml);
});
