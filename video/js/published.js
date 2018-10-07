//发表评论
// 提交按钮的事件响应
$('#submit').click(function() {
	//获取评论框内的数据到数据库
	var comment = {};
	comment.content= $('#message-text').val();
	 formData.append('shopStr', JSON.stringify(comment));
})