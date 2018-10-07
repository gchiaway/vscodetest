//评论信息 
SectionCommentInfo();
Chapters();

function SectionCommentInfo() {

	var commentHtml = "";
	$.ajax({
		url: url + "SectionCommentApiController/searchcomment",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		data: JSON.stringify({
			id: "10",
			currPage: "1",
			pageSize: "10"
		}),
		success: function (jsonstr) {
			var data = JSON.parse(jsonstr);
			console.log("评论信息 ");
			console.log(data);
			var list = eval(data.attributes.CommentList.list);
			for (var i = 0; i < list.length; i++) {

				commentHtml += '<div class="col-xs-12">';
				commentHtml += '<div class="panel panel-clown active">';

				commentHtml += '<div class="panel-heading active">' +
					'<img src="img/game_wangzhery_4.png" />' +
					'</div>';

				commentHtml += '<div class="panel-body">';
				//获取名字
				commentHtml += '<h5>' + list[i].nickname + '</h5>';
				//获取发布时间
				commentHtml += '<span class="time">' + list[i].createDate + '</span>';
				commentHtml += '<div class="row">';
				commentHtml += '<span class="text">' + list[i].content + '</span>';
				commentHtml += '<div class="text-foot">';
				commentHtml += '<a href="#">2-2 我是java第二节</a>';
				commentHtml += '</div>';
				commentHtml += '</div>';
				commentHtml += '</div>';
				commentHtml += '</div>';
				commentHtml += '</div>';
				$("#row").html(commentHtml);
			}
		},
		error: function (jsonstr) {
			alert(jsonstr.msg);
		}
	});
}


//获取章节内容
function Chapters() {
	var chapters = "";

	$.ajax({
		url: url + "coursechapteritemApiController/coursechapteritem",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		data: JSON.stringify({
			id: "1"
		}),
		success: function (jsonstr) {

			var data = JSON.parse(jsonstr);
			console.log("章节内容");
			console.log(data);

			var list = eval(data.attributes.courseChapterItemVO);

			for (var i = 0; i < list.length; i++) {
				chapters += '<div class="chapter" style="padding: 0px ;border: none;">';
				chapters += '<a href="javascript:void(0);" class="js-open">';
				chapters += '<h3>';
				chapters += '<strong>' + '第' + list[i].chapterSort + '章' + '-' + list[i].chapterName + '</strong>';
				chapters += '<span class="drop-down">▼</span>';
				chapters += '</h3>';
				chapters += '</a>';
				chapters += '<ul class="chapter-sub" style="padding-left:10px;">';

				for (var j = 0; j < list[i].chapterVOList.length; j++) {

					chapters += '<a href="../course/video.html">';
					chapters += '<li class="ellipsis video-li"><i class="icon-video">▶</i>' + list[i].chapterSort + '-' + list[i].chapterVOList[j].chapterSort + list[i].chapterVOList[j].chapterName + '</li>';
					chapters += '</a>';
				}
				chapters += '</ul>';
				chapters += '</div>';
				$("#video-course-fix").html(chapters);
			}
		},
		error: function (jsonstr) {
			alert(jsonstr.msg);
		}
	});
}


///评论的发布	
$('#submit').click(function () {
	var formdata = {
		'userId': '4028318163a6865d0163a68bef49000a',
		'chapterId': '1',
		'content': $('#message-text').val(),
	}

	$.ajax({
		url: url + 'SectionCommentApiController/addcomment',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		data: JSON.stringify(formdata),
		success: function (data) {
			if (data.success) {
				alert("发布成功");
			} else {
				window.location.href = "http://m4sdve.natappfree.cc/rest/api/v1/SectionCommentApiController/addcomment";
			}
			console.log(data);
		},
		error: function (jqXHR, text, errorThrown, data) {
			console.log(jqXHR + " " + text + " " + errorThrown);
		}
	})
});