# Configuração SMTP - Formulários de Contato

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
SMTP_FROM=seu-email@gmail.com
CONTACT_EMAIL=contato@menarimsementes.com.br
CAREERS_EMAIL=rh@menarimsementes.com.br
```

## Configuração por Provedor

### Gmail

1. Ative a verificação em duas etapas na sua conta Google
2. Gere uma senha de app:
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "App" e "Mail"
   - Copie a senha gerada
3. Use as seguintes configurações:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=sua-senha-de-app-gerada
   ```

### Outlook/Office 365

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@outlook.com
SMTP_PASS=sua-senha
```

### SendGrid

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=seu-api-key-sendgrid
```

### Mailgun

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@seu-dominio.mailgun.org
SMTP_PASS=sua-senha-mailgun
```

## Variáveis Específicas

- `CONTACT_EMAIL`: Email que receberá as mensagens do formulário de contato
- `CAREERS_EMAIL`: Email que receberá as candidaturas do formulário "Trabalhe Conosco"
- `SMTP_FROM`: Email remetente (opcional, usa `SMTP_USER` se não definido)

## Endpoints da API

- `POST /api/contact` - Formulário de contato
- `POST /api/trabalhe-conosco` - Formulário de trabalhe conosco (suporta anexo de PDF)

