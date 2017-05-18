//目录
var catalog={
	"funny things":[
		{"title":"aaa","href":"#"},
		{"title":"bbb","href":"#"}
		],
	"algorithm":[
		{"title":"存储大量文件，让每个文件夹下的文件或文件夹数量不大于1024","href":"html/algorithm/store-files-in-file-sytem-less-than-1024-each.html"}
	]
}
var colors = ["btn-primary","btn-success","btn-info","btn-warning","btn-danger"];

var lihtml = '<li><a href="#{href}">#{title}</a></li>';
var button = '<div class="btn-group">'+
  				'<button type="button" class="btn #{btn-color} btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
    					'#{key} <span class="caret"></span>'+
  				'</button>'+
  				'<ul class="dropdown-menu">'+
  					'#{lis}'+
  				'</ul>'+
			'</div>'
$(function(){
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
	$("#catalog").empty().append(buttonsHtml);
});