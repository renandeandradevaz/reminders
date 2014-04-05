class Lembrete
  include Mongoid::Document
  field :conteudo, type: String
  field :excluido, type: Boolean
end