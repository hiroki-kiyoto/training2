// $(function () {
// 	$(document).on('click', '#comment_button', function () {
// 		var comment = $("#comment_text").val();
// 		var commentPos = $('#nicoscreen').offset();
// 		var nico_comment = $('<div id="item" style="font-size: 36px; color: white; font-weight: bold; text-shadow: black 1px 1px 1px; width: 100px; white-space: nowrap; position: absolute;">' + comment + '</li>').appendTo('#nicoscreen');
// 		var offset = nico_comment.offset({ top: setPosition('#item'), left: commentPos.left + $('#nicoscreen').width() });
// 		var animation = offset.animate({ left: commentPos.left }, {
// 			duration: 3000,
// 			easing: 'linear',
// 			queue: false,
// 			complete: function () {
// 				animation.hide();
// 			}
// 		});
// 		// リスト表示
// 		//$('<li id="list_item" class="list-group-item list-group-item-light" color:black">' + comment + '</li>').prependTo('#list');
// 	});
// });

// function setPosition(id) {
// 	var top = $('#nicoscreen').offset();
// 	var itemHeight = $(id).height();
// 	var bottom = top.top + $('#nicoscreen').height() - itemHeight;
// 	var length = bottom - top.top;
// 	return bottom - length * Math.random();
// }

$(document).on('turbolinks:load', function(){
	function buildHTML(message) {
		var html = `<li id="list_item" class="list-group-item list-group-item-light">
		<div class="row">
			<div class="col-md-10">
			${message.text}
			</div>
			<div class="col-md-2">
			投稿者：${message.user_name}
			</div>
		</div>
		<div class="row">
			<div class="col2">
			投稿時間：
			</div>
			<div class="col">
			${message.date}
			</div>
		</div>
		</li>`
		return html;
	}
	$('#new_comment').on('submit', function(e){
		e.preventDefault(); 
		var message = new FormData(this);  
		var url = $(this).attr('action')
		  
		$.ajax({  
			url: url,
			type: 'POST',
			data: message,
			dataType: 'json',
			processData: false,
			contentType: false
		})
		.done(function(data){
			var html = buildHTML(data);
			// html.prependTo('#list');
			$('#list').append(html);
			$('#comment_text').val('');
		})
		.fail(function(data){
			alert('エラーが発生したためメッセージは送信できませんでした。');
		})
		.always(function(data){
			$('#comment_button').prop('disabled', false);　
			$('#new_comment')[0].reset();
		})
	})
	$('#comment_button').on('click', function(e){
		var comment = $("#comment_text").val();
		var commentPos = $('#nicoscreen').offset();
		var nico_comment = $('<div id="item" style="font-size: 36px; color: white; font-weight: bold; text-shadow: black 1px 1px 1px; width: 100px; white-space: nowrap; position: absolute;">' + comment + '</li>').appendTo('#nicoscreen');
		var offset = nico_comment.offset({ top: setPosition('#item'), left: commentPos.left + $('#nicoscreen').width() });
		var animation = offset.animate({ left: commentPos.left }, {
			duration: 3000,
			easing: 'linear',
			queue: false,
			complete: function () {
				animation.hide();
			}
		});
	});
});

function setPosition(id) {
	var top = $('#nicoscreen').offset();
	var itemHeight = $(id).height();
	var bottom = top.top + $('#nicoscreen').height() - itemHeight;
	var length = bottom - top.top;
	return bottom - length * Math.random();
}