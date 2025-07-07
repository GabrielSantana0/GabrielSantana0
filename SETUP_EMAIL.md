# Configuração de Email para o Portfólio

## Opções de Serviço de Email

### 1. Resend (Recomendado) ⭐

**Vantagens:**
- Fácil de configurar
- API moderna e confiável
- Boa entregabilidade
- Plano gratuito generoso

**Setup:**
1. Cadastre-se em [resend.com](https://resend.com)
2. Obtenha sua API key
3. Instale: `npm install resend`
4. Descomente o código do Resend na API route
5. Adicione `RESEND_API_KEY` no `.env.local`

### 2. Nodemailer com Gmail

**Vantagens:**
- Gratuito
- Usa sua conta Gmail existente

**Setup:**
1. Ative a autenticação de 2 fatores no Gmail
2. Gere uma senha de app em: Conta Google > Segurança > Senhas de app
3. Instale: `npm install nodemailer @types/nodemailer`
4. Descomente o código do Nodemailer na API route
5. Adicione `EMAIL_USER` e `EMAIL_PASS` no `.env.local`

### 3. SMTP Personalizado

**Para usar seu próprio servidor SMTP:**
1. Configure as variáveis SMTP no `.env.local`
2. Adapte o código do Nodemailer com suas configurações

## Instalação

1. Copie `.env.example` para `.env.local`
2. Preencha as variáveis de ambiente
3. Instale as dependências necessárias
4. Descomente o código do serviço escolhido
5. Comente a simulação de desenvolvimento

## Teste

Para testar o envio de email:
1. Preencha o formulário no portfólio
2. Verifique o console para logs
3. Confirme o recebimento do email
