class LembretesController < ApplicationController

  def sincronizar

    lembretes = JSON.parse params[:lembretes]

    lembretes.each do |key, value|

      if key != 'enderecoServer'

        lembrete = Lembrete.where(:conteudo => key).first

        if lembrete.nil?

          lembrete = Lembrete.new
          lembrete.conteudo = key
          lembrete.excluido = JSON.parse(value)['excluido']

        else

          if JSON.parse(value)['excluido']
            lembrete.excluido = JSON.parse(value)['excluido']
          end

        end

        lembrete.save

      end

    end

    render :json => Lembrete.where(:excluido => false).to_json, :callback => params['callback']

  end
end