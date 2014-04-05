class LembretesController < ApplicationController

  def sincronizar

    lembretes = JSON.parse params[:lembretes]

    lembretes.each do |key, value|

      if key != 'enderecoServer'

        lembrete = Lembrete.where(:conteudo => key).first

        if lembrete.nil?

          lembrete = Lembrete.new
          lembrete.conteudo = key
        end

        lembrete.excluido = JSON.parse(value)['excluido']
        lembrete.save

      end

    end

    Lembrete.where(:excluido => true).destroy_all

    render :json => Lembrete.all.to_json, :callback => params['callback']

  end
end