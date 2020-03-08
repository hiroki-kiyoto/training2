class CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        @post = Post.find(comment_params[:post_id])
        @comments = @post.comments.includes(:user) 
        if @comment.save
            respond_to do |format|
                format.json
                format.html { redirect_to post_comments_path(@post)}
            end
        end
    end
    
    private
    def comment_params
        params.require(:comment).permit(:text, :post_id).merge(user_id: current_user.id)
    end
end
