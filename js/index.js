;
$(function () {
    var imgUrl

    //获得专业名
    $.ajax({
        url: url + 'indexApiController/getSubjectInIndex',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            console.log('专业名');
            console.log(data);
            var list = data.attributes.subjectAndcourseAndDirectionList
            imgUrl = data.attributes.imageBaseUrl
            list.forEach(element => {
                $('.leftC ul').append('<li><a>' + element.subjectEntity.typeName + '</a> </li>')
                addSecond(element.courseAndDirectionVOList, element.subjectEntity.typeName, imgUrl)
            });
            $('.sc').on('click', function () {
                console.log($(this).attr('id'));
            })
            var flag = 0;
            $('#carouselBox .leftC li').on('mouseenter', function () {
                $(this).addClass('hover').siblings().removeClass('hover');
                var i = $(this).index()
                $('.category').eq(i - 1).addClass('show').siblings().removeClass('show')
            })
            $('.category').on('mouseenter', function () {
                $(this).addClass('show')
            })
            $('.category').on('mouseleave', function () {
                $(this).removeClass('show')
            })
            $('#carouselBox .leftC').on('mouseleave', function () {
                if (!flag) {
                    $('.category').removeClass('show')
                    $('#carouselBox .leftC li').removeClass('hover')

                }
            })

        },
        error: function (jqXHR, text, errorThrown, data) {
            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });

    //	轮播图
    $.ajax({
        url: url + 'indexApiController/getCarouselFigure',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            console.log('轮播图');
            console.log(data);
            var list = data.attributes.courseEntityList
            var url = data.attributes.imageBaseUrl
            list.forEach(element => {
                $('.carousel-inner').append(' <div class="item" id=' + element.id + '><img src = "' + url + element.image + '" ></div>')
            });

            $('.item').on('click', function () {
                window.location.href = "./classesDetail/pas.html?courseId=" + $(this).attr('id')
            })
        },
        error: function (jqXHR, text, errorThrown, data) {
            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });

    //	 课程
    $.ajax({
        url: url + 'indexApiController/getAllCourse',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var list = data.attributes.courseEntityList
            var url = data.attributes.imageBaseUrl
            addCourse(list, url)
        },
        error: function (jqXHR, text, errorThrown, data) {
            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });


})


function addSecond(list, name, imgUrl) {
    var text = "";
    text += "<div class=\"category\">";
    text += "<h3>" + name + "</h3>";
    text += "<ul class=\"Second\">";
    list.forEach(element => {
        text += "<li><a href=\"./classes.html?Id=" + element.courseDirEntity.id + "\">" + element.courseDirEntity.name + "</a></li>";
    });
    text += "</ul>";
    text += "<div class=\"scBox\">";
    for (let i = 0; i < list.length; i++) {
        if (i >= 2) {
            break;
        }
        text += "<div class=\"sc\" id=" + list[i].courseUnderDirList[0].id + ">";
        // text += "<img src=\"" + imgUrl + list[i].courseUnderDirList.image + ">";
        text += "<img src=\"./img/t1.jpg\">";
        text += " <div>";
        text += " <p>" + list[i].courseUnderDirList[0].name + "</p>";
        text += "  <p>" + list[i].courseUnderDirList[0].description + "</p>";
        text += " </div>";
        text += "</div>";

    }
    text += "   </div>";
    text += "</div>";
    $('#carousel-example-generic').before(text)

    $('.sc').on('click', function () {
        window.location.href = "./classesDetail/pas.html?courseId=" + $(this).attr('id')
    })

}

function addCourse(list, url) {

    var text = "";
    list.forEach(element => {
        text += "<div class=\"col-md-3 box\">";
        text += "<a href=\"./classesDetail/pas.html?courseId=" + element.id + "\">";
        // text += "<img src=\"" + url + element.image + ">";
        text += "<img src=\"./img/t1.jpg\">";
        text += "<div>";
        text += "<h4>" + element.name + "</h3>";
        text += "<p>" + element.description + "</p>";
        text += " </div>";
        text += " </a>";
        text += " </div>";
    });
    $('#course').append(text)
}