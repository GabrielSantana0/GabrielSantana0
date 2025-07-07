# 📧 Configuração do Resend - Passo a Passo

## 🚀 Por que Resend?

- ✅ **Mais fácil** de configurar que Gmail
- ✅ **Mais confiável** para entrega de emails
- ✅ **Plano gratuito** generoso (3.000 emails/mês)
- ✅ **Dashboard profissional** para monitoramento
- ✅ **API moderna** e bem documentada

## 📋 Passo a Passo Completo

### 1. 🔐 Criar Conta no Resend

1. Acesse [resend.com/signup](https://resend.com/signup)
2. Clique em **"Sign up"**
3. Preencha seus dados:
   - **Email**: gabrielsantanadasilvagoncalves@gmail.com
   - **Nome**: Gabriel Santana
   - **Senha**: (escolha uma senha segura)
4. Confirme seu email
5. Faça login no dashboard

### 2. 🔑 Gerar API Key

1. No dashboard do Resend, vá em **"API Keys"**
2. Clique em **"Create API Key"**
3. Preencha:
   - **Name**: Portfolio Gabriel Santana
   - **Permission**: Full access (padrão)
4. Clique **"Add"**
5. **COPIE A CHAVE** (formato: `re_xxxxxxxxxx`)

⚠️ **IMPORTANTE**: A chave aparece apenas UMA VEZ!

### 3. ⚙️ Configurar no Projeto

1. Abra o arquivo `.env.local`
2. Substitua a linha:
   \`\`\`env
   RESEND_API_KEY=re_SUBSTITUA_PELA_SUA_CHAVE_AQUI
   \`\`\`
   Por:
   \`\`\`env
   RESEND_API_KEY=re_sua_chave_real_aqui
   \`\`\`

### 4. 📦 Instalar Dependência

Execute no terminal:
\`\`\`bash
npm install resend
\`\`\`

### 5. 🧪 Testar Configuração

Execute o teste:
\`\`\`bash
node scripts/test-resend.js
\`\`\`

Se tudo estiver correto, você verá:
\`\`\`
🎉 CONFIGURAÇÃO COMPLETA!
✅ Seu portfolio está pronto para receber mensagens!
📧 Verifique sua caixa de entrada do Gmail
\`\`\`

## 🔍 Solução de Problemas

### ❌ "API key is invalid"
- ✅ Verifique se copiou a chave completa
- ✅ Gere uma nova chave se necessário
- ✅ Reinicie o servidor: `npm run dev`

### ❌ "Rate limit exceeded"
- ✅ Aguarde alguns minutos
- ✅ O plano gratuito tem limites por hora

### ❌ Email não chega
- ✅ Verifique a pasta de spam
- ✅ Confirme o email de destino
- ✅ Monitore no dashboard do Resend

## 📊 Monitoramento

### Dashboard do Resend:
- **Emails enviados**: Histórico completo
- **Status de entrega**: Entregue/Rejeitado/Spam
- **Analytics**: Taxas de abertura e cliques
- **Logs detalhados**: Para debugging

Acesse: [resend.com/emails](https://resend.com/emails)

## 🎯 Vantagens do Resend

### ✅ **Facilidade:**
- Configuração em 5 minutos
- Sem necessidade de 2FA
- API simples e intuitiva

### ✅ **Confiabilidade:**
- Alta taxa de entrega
- Infraestrutura profissional
- Suporte a SPF/DKIM

### ✅ **Recursos:**
- Templates HTML
- Anexos de arquivos
- Webhooks para eventos
- Analytics detalhados

## 🚀 Próximos Passos

Após configurar:
1. ✅ Teste o formulário do portfolio
2. ✅ Configure domínio personalizado (opcional)
3. ✅ Monitore emails no dashboard
4. ✅ Configure webhooks (avançado)

---

**💡 Dica**: O Resend é usado por empresas como Vercel, Linear e Notion!
