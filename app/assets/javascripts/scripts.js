$('document').ready(function () {

    verificaEnderecoServer();
    exibirLembretesSalvos();
    adicionarEventoCriacaoNovosLembretes();
    adicionarEventoRemocaoLembretes();
    adicionarEventoSincronizarLembretes();
    setInterval(sincronizar, 60000);
});

function exibirLembretesSalvos() {

    $('#lembretes').empty();

    for (var i = 0; i < localStorage.length; i++) {

        var lembreteString = localStorage.getItem(localStorage.key(i));

        if(localStorage.key(i) !== 'enderecoServer'){

            lembrete = JSON.parse(lembreteString);

            if (!lembrete.excluido) {

                $('#lembretes').append('<tr>');
                $('#lembretes').find('tr:last').append('<td>');
                $('#lembretes').find('td:last').append(lembrete.conteudo);
                $('#lembretes').find('tr:last').append('<td>');
                $('#lembretes').find('td:last').append('x');
                $('#lembretes').find('td:last').addClass('excluir-lembrete');
            }
        }
    }

    adicionarEventoRemocaoLembretes();
}

function adicionarEventoCriacaoNovosLembretes() {

    $('#criar-novo-lembrete').submit(function () {

        var conteudoLembrete = $('#novo-lembrete').val();

        var lembrete = {conteudo: conteudoLembrete, excluido: false};

        localStorage.setItem(conteudoLembrete, JSON.stringify(lembrete));
    });
}

function adicionarEventoRemocaoLembretes() {

    $('.excluir-lembrete').on('click', function () {

        var conteudoLembrete = $(this).parent().find('td:first').text();

        var lembrete = {conteudo: conteudoLembrete, excluido: true};

        localStorage.setItem(conteudoLembrete, JSON.stringify(lembrete));

        exibirLembretesSalvos();
    });
}

function adicionarEventoSincronizarLembretes() {

    $('#sincronizar').on('click', function () {

        sincronizar();
    });
}

function sincronizar(){

    var enderecoServer = localStorage.getItem('enderecoServer');

    if(enderecoServer != undefined){

        var localStorageCompleto = JSON.stringify(localStorage);

        $.ajax({
            url: enderecoServer + "/lembretes/sincronizar",
            data: {
                lembretes: localStorageCompleto
            },
            success: function( lembretes ) {

                var enderecoServer = localStorage.getItem('enderecoServer');

                localStorage.clear();

                localStorage.setItem('enderecoServer', enderecoServer);

                for (var i in lembretes) {

                    localStorage.setItem(lembretes[i].conteudo, JSON.stringify(lembretes[i]));
                }

                exibirLembretesSalvos();
            }
        });
    }
}

function verificaEnderecoServer(){

    var enderecoServer = localStorage.getItem('enderecoServer');

    if(enderecoServer != undefined){

        $('#endereco-server-div').hide();
        $('#conteudo').show();

    } else{

        $('#conteudo').hide();

        if($('#endereco-server').val() !== ''){

            localStorage.setItem('enderecoServer', $('#endereco-server').val());
            verificaEnderecoServer();
        }
    }
}