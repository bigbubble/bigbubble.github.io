//目录
function notRepeatedRandomInt(start, end, count){
    var randomArr = [];

    start = parseInt(start);
    end = parseInt(end);
    count = parseInt(count);

    if(isNaN(start) || isNaN(end) || start > end || isNaN(count) || count <= 0){
        return randomArr
    }

    for(var i = start; i <= end; i ++){
        randomArr.push(i);
    }
    var length = end - start + 1;
    for(var i = 0; i < length; i ++){
        var randomInt = Math.floor(Math.random() * length);
        if(randomInt != i){
            var temp = randomArr[i];
            randomArr[i] = randomArr[randomInt];
            randomArr[randomInt] = temp;
        }
    }
    if(length <= count){
        return randomArr;
    }else{
        return randomArr.slice(0, count);
    }
}
//colors
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
	var alinksHtml = ""; 
	var indxArr = notRepeatedRandomInt(0,allLinks.length-1,100);
	for(var i = 0; i < indxArr.length; i ++){
		var link = allLinks[indxArr[i]];
		alinksHtml += alink.replace("#{href}",link.href).replace("#{title}",link.title)
	}
	$("#aLinks").empty().append(alinksHtml);
});
