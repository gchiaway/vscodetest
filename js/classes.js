var datas = {
    attributes: {
        typeVOList: [{
                typeName: "工学",
                directionVOList: [{
                        directionName: "机械类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e224aadb0015",
                                classifyName: "机械工程"
                            },
                            {
                                classifyId: "4028b88165e219e00165e224e3a30016",
                                classifyName: "机械电子工程"
                            }
                        ],
                        directionId: "4028b88165e219e00165e22287de000c"
                    },
                    {
                        directionName: "材料类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e22531240017",
                                classifyName: "材料科学与工程"
                            },
                            {
                                classifyId: "4028b88165e219e00165e22564980018",
                                classifyName: "高分子材料与工程"
                            }
                        ],
                        directionId: "4028b88165e219e00165e222c5be000d"
                    },
                    {
                        directionName: "计算机类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e22346ab000f",
                                classifyName: "软件工程"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2236b080010",
                                classifyName: "物联网工程"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2239bc90011",
                                classifyName: "数字媒体技术"
                            }
                        ],
                        directionId: "4028b88165e219e00165e2230379000e"
                    },
                    {
                        directionName: "土木类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e224187b0013",
                                classifyName: "土木工程"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2243b7e0014",
                                classifyName: "建筑环境与能源应用工程"
                            }
                        ],
                        directionId: "4028b88165e219e00165e223ec5a0012"
                    }
                ],
                typeId: "08"
            },
            {
                typeName: "艺术学",
                directionVOList: [{
                        directionName: "音乐与舞蹈学类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e2276b09001c",
                                classifyName: "音乐学"
                            },
                            {
                                classifyId: "4028b88165e219e00165e22790ba001d",
                                classifyName: "舞蹈学"
                            }
                        ],
                        directionId: "4028b88165e219e00165e226b8d30019"
                    },
                    {
                        directionName: "戏剧与影视学类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e227d158001e",
                                classifyName: "电影学"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2280c34001f",
                                classifyName: "动画"
                            }
                        ],
                        directionId: "4028b88165e219e00165e226e1cc001a"
                    },
                    {
                        directionName: "美术学类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e22868f20020",
                                classifyName: "美术学"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2289f350021",
                                classifyName: "摄影"
                            }
                        ],
                        directionId: "4028b88165e219e00165e2270f6a001b"
                    }
                ],
                typeId: "13"
            },
            {
                typeName: "理学",
                directionVOList: [{
                        directionName: "数学类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e21eeeb90007",
                                classifyName: "数学与应用数学"
                            },
                            {
                                classifyId: "4028b88165e219e00165e21f1e640008",
                                classifyName: "信息与计算科学"
                            }
                        ],
                        directionId: "4028b88165e219e00165e21e22870004"
                    },
                    {
                        directionName: "物理学类",
                        classifyVOList: [{
                                classifyId: "4028b88165e219e00165e21f4f520009",
                                classifyName: "应用物理学"
                            },
                            {
                                classifyId: "4028b88165e219e00165e2202624000a",
                                classifyName: "物理学"
                            }
                        ],
                        directionId: "4028b88165e219e00165e21e63ac0005"
                    },
                    {
                        directionName: "化学类",
                        classifyVOList: [],
                        directionId: "4028b88165e219e00165e21ea9b20006"
                    }
                ],
                typeId: "07"
            }
        ]
    }
};
var fid = GetRequest().Id

var data = datas.attributes.typeVOList;
var currentType;
$.ajax({
    url: url + 'CourseClassifyApiController/ListCourseByClassify',
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    headers: {
        "X-AUTH-TOKEN": token,
    },
    data: JSON.stringify({
        "professionalCode": "0",
        "currPage": "1",
        "pageSize": "8"
    }),
    dataType: 'json',
    success: function (data) {
        console.log('所有课程');
        console.log(data);
        var list = data.attributes.CourseList
        var furl = data.attributes.ImageUrl
        classesTemplate(list, furl)
        fenye(data.attributes.PageCount)

    },
    error: function (jqXHR, text, errorThrown) {
        console.log(errorThrown);

        console.log(jqXHR + " " + text + " " + errorThrown);
    }
});
addDefaultData();
bijiao(fid)
DirClick();
ClasClick();

//默认添加数据
function addDefaultData() {
    datas.attributes.typeVOList.forEach(values => {
        templateSubject(values);
        values.directionVOList.forEach(value => {
            templateDir(value);
            value.classifyVOList.forEach(v => {
                templateClassiy(v);
            });
        });
    });
}
$("#xueke ul span")
    .eq(1)
    .on("click", function () {
        $(this).addClass("choose");
        $("#fangxiang ul span")
            .eq(1)
            .addClass("choose");
        // $('#fenlei ul span').eq(1).addClass('choose')
        $("#xueke ul li").removeClass("choose");
        $("#fangxiang ul li").remove();
        $("#fenlei ul li").remove();
        datas.attributes.typeVOList.forEach(values => {
            values.directionVOList.forEach(value => {
                templateDir(value);
                value.classifyVOList.forEach(v => {
                    templateClassiy(v);
                });
            });
        });
        DirClick();
        ClasClick();
        $.ajax({
            url: url + 'CourseClassifyApiController/ListCourseByClassify',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-AUTH-TOKEN": token,
            },
            data: JSON.stringify({
                "professionalCode": "0",
                "currPage": "1",
                "pageSize": "8"
            }),
            dataType: 'json',
            success: function (data) {
                console.log('所有课程');
                console.log(data);
                var list = data.attributes.CourseList
                var furl = data.attributes.ImageUrl
                classesTemplate(list, furl)
                fenye(data.attributes.PageCount)

            }
        });
    });

$("#xueke ul li").on("click", function () {
    $("#fangxiang ul li").remove();
    $("#fenlei ul li").remove();
    $(this)
        .addClass("choose")
        .siblings()
        .removeClass("choose");
    var id = $(this).attr("id");
    data.forEach(values => {
        if (values.typeId == id) {
            currentType = values;
        }
    });

    currentType.directionVOList.forEach(value => {
        templateDir(value);
        value.classifyVOList.forEach(v => {
            templateClassiy(v);
        });
    });

    DirClick();
    ClasClick();

    $('#courseBox .row').empty()
    $('#fenye').empty()
    console.log({
        "professionalCode": '08',
        "currPage": "1",
        "pageSize": "8"
    });

    $.ajax({
        url: url + 'CourseClassifyApiController/ListCourseByClassify',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        headers: {
            "X-AUTH-TOKEN": token,
        },
        data: JSON.stringify({
            "professionalCode": '08',
            "currPage": "1",
            "pageSize": "8"
        }),
        dataType: 'json',
        success: function (data) {
            console.log('xueke');
            console.log(data);
            var list = data.attributes.CourseList
            var furl = data.attributes.ImageUrl
            classesTemplate(list, furl)
            fenye(data.attributes.PageCount)

        },
        error: function (jqXHR, text, errorThrown) {
            console.log(errorThrown);

            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });
});
$("#fangxiang ul span")
    .eq(1)
    .on("click", function () {
        if ($("#xueke ul span").eq(1).hasClass('choose')) {
            return;
        }
        $(this).addClass("choose");
        $("#fangxiang ul li").remove();
        $("#fenlei ul li").remove();

        console.log(currentType);

        if (currentType) {
            console.log(currentType);

            currentType.directionVOList.forEach(value => {
                templateDir(value);
                value.classifyVOList.forEach(v => {
                    templateClassiy(v);
                });
            });
        } else {
            datas.attributes.typeVOList.forEach(values => {
                values.directionVOList.forEach(value => {
                    templateDir(value);
                    value.classifyVOList.forEach(v => {
                        templateClassiy(v);
                    });
                });
            });
        }

        DirClick();
        ClasClick();
    });

function ClasClick() {
    $("#fenlei ul li").on("click", function () {
        var thatId = $(this).attr("id");

        $("#fenlei ul li").remove();
        var id = $(this).attr("id");

        var current;
        var currentDir;
        datas.attributes.typeVOList.forEach(values => {
            values.directionVOList.forEach(value => {
                value.classifyVOList.forEach(v => {
                    if (v.classifyId == id) {
                        current = values;
                        currentDir = value;
                    }
                });
            });
        });

        for (var i = 0; i < $("#xueke ul li").length; i++) {
            for (var j = 0; j < $("#fangxiang ul li").length; j++) {
                if (
                    $("#xueke ul li")
                    .eq(i)
                    .attr("id") == current.typeId
                ) {
                    $("#xueke ul li")
                        .eq(i)
                        .addClass("choose")
                        .siblings()
                        .removeClass("choose");
                    $("#xueke ul span")
                        .eq(1)
                        .removeClass("choose");
                }
                if (
                    $("#fangxiang ul li")
                    .eq(j)
                    .attr("id") == currentDir.directionId
                ) {
                    $("#fangxiang ul li")
                        .eq(j)
                        .addClass("choose")
                        .siblings()
                        .removeClass("choose");
                    $("#fangxiang ul span")
                        .eq(j)
                        .removeClass("choose");
                }
            }
        }
        currentDir.classifyVOList.forEach(v => {
            templateClassiy(v);
        });

        for (var i = 0; i < $("#fenlei ul li").length; i++) {
            if (
                $("#fenlei ul li")
                .eq(i)
                .attr("id") == thatId
            ) {
                $("#fenlei ul li")
                    .eq(i)
                    .addClass("choose");
            }
        }

        DirClick();
        ClasClick();

        $('#courseBox .row').empty()
        $('#fenye').empty()

        $.ajax({
            url: url + 'CourseClassifyApiController/ListCourseByClassify',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-AUTH-TOKEN": token,
            },
            data: JSON.stringify({
                "professionalCode": $(this).attr('id'),
                "currPage": "1",
                "pageSize": "8"
            }),
            dataType: 'json',
            success: function (data) {
                console.log('fenlei');
                console.log(data);
                var list = data.attributes.CourseList
                var furl = data.attributes.ImageUrl
                classesTemplate(list, furl)
                fenye(data.attributes.PageCount)

            },
            error: function (jqXHR, text, errorThrown) {
                console.log(errorThrown);

                console.log(jqXHR + " " + text + " " + errorThrown);
            }
        });
    });
}

function DirClick() {
    $("#fangxiang ul li").on("click", function () {
        var id = $(this).attr("id");
        $("#fangxiang ul li").remove();
        $("#fenlei ul li").remove();
        var current;
        var currentDir;
        datas.attributes.typeVOList.forEach(values => {
            values.directionVOList.forEach(value => {
                if (value.directionId == id) {
                    currentType = values;
                    current = values;
                    currentDir = value;
                }
            });
        });
        current.directionVOList.forEach(v => {
            templateDir(v);
        });
        currentDir.classifyVOList.forEach(vl => {
            templateClassiy(vl);
        });
        console.log(current);

        for (var i = 0; i < $("#xueke ul li").length; i++) {
            if (
                $("#xueke ul li")
                .eq(i)
                .attr("id") == current.typeId
            ) {
                $("#xueke ul li")
                    .eq(i)
                    .addClass("choose")
                    .siblings()
                    .removeClass("choose");
                $("#xueke ul span")
                    .eq(1)
                    .removeClass("choose");
            }
        }

        $("#fangxiang ul span")
            .eq(1)
            .removeClass("choose");


        for (var i = 0; i < $("#fangxiang ul li").length; i++) {
            if (
                $("#fangxiang ul li")
                .eq(i)
                .attr("id") == id
            ) {
                $("#fangxiang ul li")
                    .eq(i)
                    .addClass("choose");
            }
        }
        DirClick();
        ClasClick();
        $('#courseBox .row').empty()
        $('#fenye').empty()

        $.ajax({
            url: url + 'CourseClassifyApiController/ListCourseByClassify',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-AUTH-TOKEN": token,
            },
            data: JSON.stringify({
                "professionalCode": $(this).attr('id'),
                "currPage": "1",
                "pageSize": "8"
            }),
            dataType: 'json',
            success: function (data) {
                console.log('fangxiang');
                console.log(data);
                var list = data.attributes.CourseList
                var furl = data.attributes.ImageUrl
                classesTemplate(list, furl)
                fenye(data.attributes.PageCount)

            },
            error: function (jqXHR, text, errorThrown) {
                console.log(errorThrown);

                console.log(jqXHR + " " + text + " " + errorThrown);
            }
        });
    });
}

//添加分类
function templateClassiy(data) {
    var classiy = "";
    classiy += "<li id=" + data.classifyId + ">" + data.classifyName + "</li>";
    $("#fenlei ul").append(classiy);
}
//添加学科
function templateSubject(data) {
    var Subject = "";
    Subject += "<li id=" + data.typeId + ">" + data.typeName + "</li>";
    $("#xueke ul").append(Subject);
}
//添加方向
function templateDir(data) {
    var Dir = "";
    Dir += "<li id=" + data.directionId + ">" + data.directionName + "</li>";
    $("#fangxiang ul").append(Dir);
}

//排序事件
$(".sort span").on("click", function () {
    $(this)
        .addClass("sapnHorver")
        .siblings()
        .removeClass("sapnHorver");
});
$("#cancel").click(function () {
    $(".mobileS").animate({
        right: "-83%"
    });
    $(".mobileS").removeClass("show");
});

$("#moreIcon").click(function () {

    $(".classesBox").animate({
        right: "0",
    });
    $(".classesBox").css({
        display: "block"
    });

});
$('#cancel').click(function () {
    $(".classesBox").animate({
        right: "-90%",
    });
    $(".classesBox").css({
        display: "none"
    });
})


function classesTemplate(list, url) {
    var text = "";
    list.forEach(element => {
        text += ' <div class="col-md-3 box">';
        text += ' <a href=./classesDetail/pas.html?courseId="' + element.courseId + '">';
        text += ' <img src="./img/t1.jpg">';
        // text += "<img src=\"" + imgUrl + list[i].CourseList.image + ">";
        text += '<div>';
        text += ' <h4>' + element.name + '</h3>';
        text += ' <p>' + element.description + '</p>';
        text += ' </div>';
        text += '</a>';
        text += '</div>';
    });
    $('#courseBox .row').append(text)
}

function fenye(PageCount) {
    var str = '';
    str += '<nav aria-label="...">';
    str += '<ul class="pagination">';
    str += ' <li class="disabled">';
    str += ' <span>';
    str += '<span aria-hidden="true">&laquo;</span>';
    str += ' </span>';
    str += ' </li>';
    for (var i = 0; i < PageCount; i++) {
        if (i == 0) {
            str += '  <li class="active">';
            str += '<span>1</span>';
            str += ' </li>';
        } else {
            str += '  <li>';
            str += '<span>' + Number(i + 1) + '</span>';
            str += ' </li>';
        }
    }
    str += '<li class="disabled">';
    str += '<span>';
    str += ' <span aria-hidden="true">&raquo;</span>';
    str += '</span>';
    str += '</li>';
    str += '</ul>';
    str += ' </nav>';

    $('#fenye').append(str)

    $('#fenye ul li>span').click(function () {
        $('#xueke>ul>li').hasClass('choose')

        $(this).parent('li').addClass('active').siblings().removeClass('active')
        var page = $(this).html()
        if (!$(this).parent('li').hasClass('disabled')) {
            $.ajax({
                url: url + 'CourseClassifyApiController/ListCourseByClassify',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                headers: {
                    "X-AUTH-TOKEN": token,
                },
                data: JSON.stringify({
                    "professionalCode": "0",
                    "currPage": page,
                    "pageSize": "8"
                }),
                dataType: 'json',
                success: function (data) {
                    console.log('fenye');
                    console.log(data);
                    var list = data.attributes.CourseList
                    var url = data.attributes.ImageUrl
                    classesTemplate(list)

                },
                error: function (jqXHR, text, errorThrown) {
                    console.log(errorThrown);

                    console.log(jqXHR + " " + text + " " + errorThrown);
                }
            });
        }
    })
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

function bijiao(id) {
    $("#fangxiang ul li").remove();
    $("#fenlei ul li").remove();
    var current;
    var currentDir;
    datas.attributes.typeVOList.forEach(values => {
        console.log(values);

        values.directionVOList.forEach(value => {
            if (value.directionId == id) {
                currentType = values;
                current = values;
                currentDir = value;
            }
        });
    });
    current.directionVOList.forEach(v => {
        templateDir(v);
    });
    currentDir.classifyVOList.forEach(vl => {
        templateClassiy(vl);
    });
    console.log(current);

    for (var i = 0; i < $("#xueke ul li").length; i++) {
        if (
            $("#xueke ul li")
            .eq(i)
            .attr("id") == current.typeId
        ) {
            $("#xueke ul li")
                .eq(i)
                .addClass("choose")
                .siblings()
                .removeClass("choose");
            $("#xueke ul span")
                .eq(1)
                .removeClass("choose");
        }
    }

    $("#fangxiang ul span")
        .eq(1)
        .removeClass("choose");


    for (var i = 0; i < $("#fangxiang ul li").length; i++) {
        if (
            $("#fangxiang ul li")
            .eq(i)
            .attr("id") == id
        ) {
            $("#fangxiang ul li")
                .eq(i)
                .addClass("choose");
        }
    }
    DirClick();
    ClasClick();
    $('#courseBox .row').empty()
    $('#fenye').empty()

    $.ajax({
        url: url + 'CourseClassifyApiController/ListCourseByClassify',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        headers: {
            "X-AUTH-TOKEN": token,
        },
        data: JSON.stringify({
            "professionalCode": id,
            "currPage": "1",
            "pageSize": "8"
        }),
        dataType: 'json',
        success: function (data) {
            console.log('fangxiang');
            console.log(data);
            var list = data.attributes.CourseList
            var furl = data.attributes.ImageUrl
            classesTemplate(list, furl)
            fenye(data.attributes.PageCount)

        },
        error: function (jqXHR, text, errorThrown) {
            console.log(errorThrown);

            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });
}