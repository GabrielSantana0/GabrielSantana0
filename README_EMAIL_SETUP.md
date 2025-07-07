# 📧 Configuração de Email - Portfolio Gabriel Santana

## 🚀 Setup Rápido (5 minutos)

### 1. Instalar Dependências
\`\`\`bash
npm install nodemailer @types/nodemailer dotenv
\`\`\`

### 2. Configurar Gmail
1. **Ativar 2FA**: [myaccount.google.com](https://myaccount.google.com) > Segurança > Verificação em duas etapas
2. **Gerar Senha de App**: Segurança > Senhas de app > Outro > "Portfolio Website"
3. **Copiar a senha** de 16 caracteres

### 3. Configurar Variáveis
Edite o arquivo `.env.local`:
\`\`\`env
EMAIL_USER=gabrielsantanadasilvagoncalves@gmail.com
EMAIL_PASS=sua_senha_de_app_aqui
\`\`\`

### 4. Testar
\`\`\`bash
npm run test:email
\`\`\`

## ✅ Verificação de Funcionamento

Se tudo estiver correto, você verá:
\`\`\`
🚀 TESTE DE CONFIGURAÇÃO DE EMAIL
==================================================

📋 1. Verificando configuração...
✅ Variáveis de ambiente configuradas
📧 Email: gabrielsantanadasilvagoncalves@gmail.com
🔑 Senha: **************** (16 caracteres)

🔄 2. Testando conexão com Gmail...
✅ Conexão estabelecida com sucesso!

📤 3. Enviando email de teste...
✅ Email de teste enviado com sucesso!
📧 Message ID: <id@gmail.com>
📬 Enviado para: gabrielsantanadasilvagoncalves@gmail.com

🎉 CONFIGURAÇÃO COMPLETA!
==================================================
✅ Seu portfolio está pronto para receber mensagens!
\`\`\`

## 🔧 Solução de Problemas

### ❌ "Senhas de app" não aparece
- Confirme que a verificação em 2 etapas está ATIVADA
- Faça logout/login no Google
- Aguarde alguns minutos

### ❌ "Invalid login"
- Use a senha de app (16 caracteres), não a senha normal
- Verifique se copiou a senha completa
- Gere uma nova senha de app

### ❌ Erro de conexão
- Verifique sua internet
- Tente novamente em alguns minutos
- Confirme as credenciais

## 📱 Como Funciona

1. **Usuário preenche** o formulário no portfolio
2. **API processa** e valida os dados
3. **Email é enviado** para gabrielsantanadasilvagoncalves@gmail.com
4. **Você recebe** uma notificação formatada
5. **Responde diretamente** clicando no email do remetente

## 🎨 Exemplo de Email Recebido

\`\`\`
De: gabrielsantanadasilvagoncalves@gmail.com
Para: gabrielsantanadasilvagoncalves@gmail.com
Assunto: 🚀 Novo contato do portfólio: [Assunto da mensagem]

💼 Nova Mensagem do Portfólio
Gabriel Santana - Desenvolvedor Full Stack

📋 Informações do Contato
👤 Nome: João Silva
📧 Email: joao@empresa.com (clicável)
📝 Assunto: Proposta de Projeto

💬 Mensagem:
Olá Gabriel, vi seu portfólio e gostaria de conversar sobre um projeto...

🎯 Ação Recomendada
Responda diretamente para: joao@empresa.com
\`\`\`

## 🔒 Segurança

- ✅ Usa senha de app (mais seguro que senha normal)
- ✅ Rate limiting (máximo 5 emails por 15 minutos)
- ✅ Validação e sanitização de dados
- ✅ Não expõe credenciais no frontend

## 🚀 Próximos Passos

Após configurar:
1. ✅ Teste o formulário no seu portfolio
2. ✅ Configure notificações no Gmail
3. ✅ Personalize respostas automáticas
4. ✅ Monitore mensagens recebidas

---

**💡 Dica**: Mantenha o arquivo `.env.local` seguro e nunca o compartilhe!
