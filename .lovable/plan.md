## Diagnóstico

A URL publicada (`opportunity-focus-hub.lovable.app`) está servindo um HTML antigo/quebrado — sem `<title>`, sem metadados e, principalmente, sem o `<script>` que carrega o bundle do React. Por isso o `<div id="root">` fica vazio (tela branca) e a tela de login nem aparece.

No preview, o app funciona normalmente — então o código está correto. O problema é apenas que **as mudanças de frontend feitas depois da última publicação (autenticação, integração com Supabase, PWA, etc.) ainda não foram publicadas**. Na Lovable, alterações de frontend só vão para o ar quando você clica em **Update** no diálogo Publish.

## Plano

1. Abrir o diálogo de Publish e clicar em **Update** para subir a versão atual (com login e dashboard).
2. Após o deploy (~1 minuto), acessar novamente `https://opportunity-focus-hub.lovable.app` — a tela `/auth` com e-mail/senha e botão Google deve aparecer.
3. Se ainda aparecer branco, fazer hard refresh (Ctrl/Cmd+Shift+R) para invalidar cache do PWA/service worker antigo.

## Observações técnicas

- Não há mudança de código necessária — preview confirma que o app monta corretamente.
- O `manifest.json` já está configurado; após republicar, o PWA também passa a refletir a versão nova.
- Caso após republicar a tela continue branca, próximo passo é abrir o DevTools no celular/desktop e capturar erros do console na URL publicada para investigar.

Quer que eu já dispare a publicação agora?