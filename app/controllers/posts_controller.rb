class PostsController < ApplicationController
    before_action :authenticate_user!, except: [:index]
    before_action :set_post, only: %i(show destroy edit update)
    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        if @post.save
          redirect_to root_path, notice: '投稿しました'
        else
          render :new
        end
      end
    
    def edit
    end

    def update
    end

    def index
        @posts = Post.all.order('created_at DESC')
    end

    def show
        @user = User.find(current_user.id)
        @comment = Comment.new()
        @comments = @post.comments.includes(:user)
        @like = Like.new
    end

    def destroy
        redirect_to root_path, notice: '削除しました' if @post.destroy
    end
    
private
    def post_params
        params.require(:post).permit(:title, :body, :video).merge(user_id: current_user.id)
    end
    def set_post
        @post = Post.find(params[:id])
    end
end
