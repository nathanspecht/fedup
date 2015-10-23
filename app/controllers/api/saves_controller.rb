class Api::SavesController < ApplicationController

  def destroy
    @save = Save.includes(:article).
            where({articles: {link: params[:article][:link]},
            saves: {user_id: current_user.id}})[0]
    if @save && @save.delete
      render json: { articleLink: params[:article][:link] }
    end
  end

end
