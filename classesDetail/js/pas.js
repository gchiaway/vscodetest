// var url = "http://4ts6kf.natappfree.cc/rest/api/v1/";
//课程简介
var brief = "";

//课程信息
//---------调用 -------------
CourseInfo();
ChapterInfo();
Comment();
//---------调用 -------------
var courseData;
//课程
function CourseInfo() {
	var courseHtml = "";
	var result = GetRequest();
	$.ajax({
		url: url + "courseApiController/course",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		headers: {
			"X-AUTH-TOKEN": token,
		},
		data: JSON.stringify({
			courseId: result.courseId
		}),
		success: function (jsonstr) {
			var data = JSON.parse(jsonstr);
			console.log(data)

			var list = eval(data.attributes.courseEntityVO);
			//课程简介
			brief = list.description;
			/* 课程名字  */
			courseHtml += '<div class="proj1 container">' +
				'<span id="course" class="col-md-offset-1"><a href = "#">' + list.typename + '/' + '</a></span>' +
				'<span><a href = "#">' + list.coursedirectionname + '/' + '</a></span>' +
				'<span><a href = "#">' + list.courseclassifyname + '/' + '</a></span>' +
				'<span><a href = "#">' + list.coursename + '</a></span>' +
				'<h2 class="col-md-offset-1">' + list.coursename + '</h2>' +
				'<div class="proj container"><img id="img1" src=" '
				//图片路径TODO
				+
				data.attributes.picture + list.image + ' "></img> ' +
				'<span id="up">' + list.nickname + '</span>' +
				'<span id="sub">' + list.signature + '</span>' +
				'<span id="a" class="col-sm-offset-3">难度</span>' +
				'<span id="a1">中级</span>' +
				'<span id="a2">.</span>' +
				'<span id="b">时长</span>' +
				'<span id="b1">1时40分</span>' +
				'<span id="b2">.</span>' +
				'<span id="c">学习人数</span>' +
				'<span id="c1">' + list.weight + '</span>' +
				'<span id="c2">.</span>' +
				'<span id="d">综合测评</span>' +
				'<span id="d1">9.3</span></div>';

			$("#courseInfo").html(courseHtml);
			startbtn();
		},
		error: function (jsonstr) {
			alert('1123');
		}

	});
}


function startbtn() {

	for (var i = 0; i < apic.length; i++) {
		apic[i].num = i;
		for (var j = 0; j < apic.length; j++) {
			$("#start-btn").hide();
		}
		apic[i].onmouseover = function () {
			sbtn[this.num].style.display = "block";
		}
		apic[i].onmouseout = function () {
			sbtn[this.num].style.display = "none";
		}
	}
}


//章节
function ChapterInfo() {
	var chapterHtml = "";
	var result = GetRequest();
	$.ajax({
		url: url + "coursechapteritemApiController/coursechapteritem",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			courseId: result.courseId
		}),
		headers: {
			"X-AUTH-TOKEN": token,
		},
		success: function (jsonstr) {

			var data = JSON.parse(jsonstr);
			console.log(data);
			

			var list = eval(data.attributes.courseChapterItemVO);
			//课程简介


			for (var i = 0; i < list.length; i++) {

				chapterHtml += '<div class="chapter">';
				chapterHtml += '<h3>';
				chapterHtml += '<strong>' + '第' + list[i].chapterSort + '章' + '-' + list[i].chapterName + '</strong>';
				chapterHtml += '</h3>';

				chapterHtml += '<ul class="chapter-sub">';
				for (var j = 0; j < list[i].chapterVOList.length; j++) {
					//跳转页面传值

					chapterHtml += '<a  href="../video/video.html?' + "chapterId=" + list[i].chapterVOList[j].id + "&" + "fileUrl=" + list[i].chapterVOList[j].fileUrl + '">';
					chapterHtml += '<li class="chapter-sub-li">';
					chapterHtml += '<i class="glyphicon glyphicon-play-circle"></i>';
					chapterHtml += list[i].chapterSort + '-' + list[i].chapterVOList[j].chapterSort + list[i].chapterVOList[j].chapterName;
					chapterHtml += '<p id="start-btn">' + '开始学习' + '</p>';
					// chapterHtml+='<i class="fa fa-circle-o"></i>';
					chapterHtml += '</li>';
					chapterHtml += '</a>';
				}
				chapterHtml += '</ul>';
				chapterHtml += '</div>';
			}

			$("#chapterInfo").html(chapterHtml);
			startbtn();
		},
		error: function (jsonstr) {
			alert(jsonstr.msg);
		}
	});
}


//评论
function Comment() {
	var chapterHtml = "";
	var result = GetRequest();
	$.ajax({
		url: url + "commentApiController/searchCourseComment",
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			courseId: result.courseId,
			currPage: "1",
			pageSize: "10"

		}),
		headers: {
			"X-AUTH-TOKEN": token,
		},
		success: function (jsonstr) {
			console.log(jsonstr)

			var data = JSON.parse(jsonstr);
			var list = eval(data.attributes.commentEntityList.list);

			for (var i = 0; i < list.length; i++) {
				chapterHtml += '<div class="comment clearfix sha">';
				chapterHtml += '<div class="comment-header"><img class="lecturer-uimg" src="' + data.attributes.pictureUrl + list.portrait + ' "></div>';
				chapterHtml += '<div class="comment-main">';
				chapterHtml += '<div class="user-name">' + list[i].nickname + '</div>';
				chapterHtml += '<div class="comment-content">' + list[i].content + '</div>';
				chapterHtml += '<div class="comment-footer"><span id="lesson">' + list[i].chapter + "-" + list[i].chapterSort + " " + list[i].chapterName + '</span><span>' + list[i].createDate + '</span></div>';
				//chapterHtml+='<a href="#">'+list[i].chapterInfo+'</a>';
				chapterHtml += '</div></div>';
			}


			$("#comenList").html(chapterHtml);
			startbtn();
		},
		error: function (jsonstr) {
			alert(jsonstr.msg);
		}
	});
}


function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//objData.obj.name = encodeURI(encodeURI(objData.obj.name))
//
//
// decodeURIComponent(obj.memo)