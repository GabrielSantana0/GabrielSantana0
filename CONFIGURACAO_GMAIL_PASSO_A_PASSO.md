# 🔐 Configuração Gmail - Passo a Passo Completo

## 📋 Pré-requisitos
- Conta Gmail ativa
- Acesso ao computador/celular para verificação

## 🚀 Passo 1: Ativar Autenticação de 2 Fatores

### No Computador:
1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Clique em **"Segurança"** no menu lateral esquerdo
3. Na seção **"Como fazer login no Google"**, clique em **"Verificação em duas etapas"**
4. Clique em **"Começar"**
5. Digite sua senha do Gmail
6. Escolha o método de verificação (recomendado: **SMS** ou **Google Authenticator**)
7. Siga as instruções para configurar
8. Clique em **"Ativar"**

### ✅ Confirmação:
Você verá "Verificação em duas etapas: ATIVADA" na página de segurança.

## 🔑 Passo 2: Gerar Senha de App

### Importante:
⚠️ **A opção "Senhas de app" só aparece APÓS ativar a verificação em duas etapas!**

### Passos:
1. Ainda na página **"Segurança"** do Google
2. Na seção **"Como fazer login no Google"**, procure por **"Senhas de app"**
3. Clique em **"Senhas de app"**
4. Digite sua senha do Gmail novamente
5. Na tela "Senhas de app":
   - **Selecionar app**: Escolha **"Outro (nome personalizado)"**
   - **Nome**: Digite **"Portfolio Website"**
6. Clique em **"Gerar"**
7. **COPIE A SENHA** de 16 caracteres que aparece (ex: `abcd efgh ijkl mnop`)

### ⚠️ IMPORTANTE:
- A senha aparece apenas UMA VEZ
- Anote em local seguro
- Use ESTA senha no projeto, não a senha normal do Gmail

## 📝 Passo 3: Configurar no Projeto

Abra o arquivo `.env.local` e adicione:

\`\`\`env
EMAIL_USER=gabrielsantanadasilvagoncalves@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
\`\`\`

**Substitua `abcd efgh ijkl mnop` pela senha gerada no passo anterior!**

## 🧪 Passo 4: Testar

Execute no terminal:
\`\`\`bash
npm install nodemailer @types/nodemailer dotenv
node scripts/test-email.js
\`\`\`

## 🔍 Solução de Problemas

### "Senhas de app" não aparece:
- ✅ Confirme que a verificação em 2 etapas está ATIVADA
- ✅ Faça logout e login novamente no Google
- ✅ Aguarde alguns minutos e tente novamente

### Erro "Invalid login":
- ✅ Use a senha de app, não a senha normal
- ✅ Verifique se copiou a senha completa (16 caracteres)
- ✅ Confirme se o email está correto

### Erro "Less secure app":
- ✅ NÃO ative "acesso de apps menos seguros"
- ✅ Use apenas senhas de app (mais seguro)

## 📱 Alternativa: Pelo Celular

1. Abra o app **Google** ou **Gmail**
2. Toque na sua foto de perfil
3. **Gerenciar sua Conta do Google**
4. **Segurança**
5. **Verificação em duas etapas**
6. **Senhas de app**
7. Siga os mesmos passos
\`\`\`

Agora vou atualizar o arquivo .env.local com instruções claras:
