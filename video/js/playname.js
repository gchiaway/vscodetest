//获取当前播放视频的名称
PlayName();

function PlayName() {
	var playName = "";
	$.ajax({
		url: url + "coursePlayApiController/searchCoursechapterName",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		data: JSON.stringify({
			id: "10"
		}),
		success: function (jsonstr) {
			var data = JSON.parse(jsonstr);
			var list = eval(data.attributes.courseChapterItemEntity);
			playName += '<div class="course-title">' + list.chapterSort + ' - ' + list.parentId + ' ' + list.chapterName + '</div>';
			playName += '<div class="course-video">';
			playName += '<video src="img/demo.mp4" width="100%" height="100%" controls preload></video>';
			playName += '</div>';
			$("#courseInfo").html(playName);
		}
	});
}