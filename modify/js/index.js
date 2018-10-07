$('.contLeft ul li').on('click', function () {
    var index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    console.log($('.modi'));

    $('.modi').eq(index).removeClass('none').siblings().addClass('none')
});

$.ajax({
    url: 'http://m4sdve.natappfree.cc/rest/api/v1/SectionCommentApiController/addcomment',
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
        "X-AUTH-TOKEN": token,
    },
    traditional: true,
    data: formdata,
    cache: false, // 不缓存
    processData: false, // jQuery不要去处理发送的数据
    contentType: false,
    success: function (data) {
        console.log(data);
    },
    error: function (jqXHR, text, errorThrown, data) {
        console.log(jqXHR + " " + text + " " + errorThrown);
    }
})
$('#modify').click(function () {
    if ($(this).html() == '完成') {
        var formdata = new FormData()
        formdata.append('nickname', $('#nickname').val())
        formdata.append('sex', $('#sex').val())
        formdata.append('signature', $('#signature').val())
        formdata.append('email', $('#email').val())
        formdata.append('phone', $('#phone').val())
        console.log(formdata.get('phone'));

        // $.ajax({
        //     url: 'http://m4sdve.natappfree.cc/rest/api/v1/SectionCommentApiController/addcomment',
        //     type: 'POST',
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     headers: {
        //         "X-AUTH-TOKEN": 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4YThhYjBiMjQ2ZGM4MTEyMDE0NmRjODE4MTk1MDA1MiIsInN1YiI6ImFkbWluIiwiaWF0IjoxNTM3NTI5Mjk4fQ.dJLUQnK9FVbtxp5LZqI7rxgVlw1OAOkwKkoDN1agXL0',
        //     },
        //     traditional: true,
        //     data: formdata,
        //     cache: false, // 不缓存
        //     processData: false, // jQuery不要去处理发送的数据
        //     contentType: false,
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (jqXHR, text, errorThrown, data) {
        //         console.log(jqXHR + " " + text + " " + errorThrown);
        //     }
        // })
        $(this).html('修改')

    } else {
        $('.box input').removeAttr('disabled')
        $(this).html('完成')
    }

})