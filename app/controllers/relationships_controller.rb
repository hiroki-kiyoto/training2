class RelationshipsController < ApplicationController
  def create
    user = User.find(params[:follow_id])
    post = Post.find(params[:post_id])
    following = current_user.follow(user)
    if following.save
      redirect_to post_path(post)
    else
      redirect_to post_path(post)
    end
  end

  def destroy
    user = User.find(params[:follow_id])
    post = Post.find(params[:post_id])
    following = current_user.unfollow(user)
    if following.destroy
      redirect_to post_path(post)
    else
      redirect_to post_path(post)
    end
  end
end
