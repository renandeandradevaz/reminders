$('document').ready(function(){

	exibirLembretesSalvos();
	adicionarEventoCriacaoNovosLembretes();
	adicionarEventoRemocaoLembretes();
});

function exibirLembretesSalvos(){

	$('#lembretes').empty();

	for (var i = 0; i < localStorage.length; i++){

		var lembreteString = localStorage.getItem(localStorage.key(i));
		lembrete = JSON.parse(lembreteString);

		if(!lembrete.excluido){

			$('#lembretes').append('<tr>');
			$('#lembretes').find('tr:last').append('<td>');
			$('#lembretes').find('td:last').append(lembrete.conteudo);
			$('#lembretes').find('tr:last').append('<td>');
			$('#lembretes').find('td:last').append('x');
			$('#lembretes').find('td:last').addClass('excluir-lembrete');
		}
	}

	adicionarEventoRemocaoLembretes();
}

function adicionarEventoCriacaoNovosLembretes(){

	$('#criar-novo-lembrete').submit(function(){

		var conteudoLembrete = $('#novo-lembrete').val();

		var lembrete = {conteudo: conteudoLembrete, excluido:false};

		localStorage.setItem(conteudoLembrete , JSON.stringify(lembrete));
    });
}

function adicionarEventoRemocaoLembretes(){

	$('.excluir-lembrete').on('click', function(){

		var conteudoLembrete = $(this).parent().find('td:first').text();

		var lembrete = {conteudo: conteudoLembrete, excluido:true};

		localStorage.setItem(conteudoLembrete , JSON.stringify(lembrete));

		exibirLembretesSalvos();
    });
}