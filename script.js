$(document).ready(function() {
    // Validação e formatação do campo de telefone
    $('#telefone').on('input', function() {
        var telefone = $(this).val().replace(/\D/g, '');
        telefone = telefone.replace(/^(\d{2})(\d)/g, "+55 ($1) $2");
        telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
        $(this).val(telefone);
    });

    // Busca de endereço com base no CEP
    $('#cep').on('blur', function() {
        var cep = $(this).val().replace(/\D/g, '');
        if (cep.length == 8) {
            $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json/`,
                dataType: 'json',
                success: function(response) {
                    if (!response.erro) {
                        $('#endereco').val(response.logradouro);
                        $('#bairro').val(response.bairro);
                        $('#cidade').val(response.localidade);
                        $('#estado').val(response.uf);
                    } else {
                        alert("CEP não encontrado.");
                    }
                },
                error: function() {
                    alert("Erro ao consultar o CEP.");
                }
            });
        }
    });

    // Feedback de validação de e-mail
    $('#email').on('blur', function() {
        var email = $(this).val();
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            $(this).focus();
        }
    });

    // Envio do formulário via AJAX
    $('#patient-form').on('submit', function(e) {
        e.preventDefault();

        var isValid = true;

        // Verificação de todos os campos obrigatórios
        $('#patient-form').find('input[required], select[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                $(this).focus();
                alert("Por favor, preencha todos os campos obrigatórios.");
                return false;
            }
        });

        if (isValid) {
            // Habilitar campos desabilitados antes do envio
            $('#endereco, #bairro, #cidade, #estado').prop('disabled', false);

            var formData = $(this).serialize();

            $.ajax({
                type: 'POST',
                url: 'recebe_dados.php',
                data: formData,
                success: function(response) {
                    alert("Dados recebidos com sucesso!");
                    // Resetar o formulário após o sucesso
                    $('#patient-form')[0].reset();
                    // Desabilitar os campos novamente
                    $('#endereco, #bairro, #cidade, #estado').prop('disabled', true);
                },
                error: function() {
                    alert("Erro ao enviar os dados. Por favor, tente novamente.");
                }
            });
        }
    });
});
