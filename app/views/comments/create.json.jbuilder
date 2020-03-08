json.id      @comment.id
json.text @comment.text
json.date    @comment.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @comment.user.name