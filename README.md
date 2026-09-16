# PretoÁ — Landing Page

Site institucional da PretoÁ, feito em Next.js. Mostra a marca, o designer, o evento Manifashion, quem já vestiu as peças e os canais de contato — usando as fotos reais do book e o mesmo fundo jeans do portfólio original.

## Rodando localmente

Precisa ter o Node.js instalado (versão 18 ou mais nova).

```bash
npm install
cp .env.local.example .env.local
```

Abra o `.env.local` e troque `ADMIN_PASSWORD` pela senha que você quer usar para entrar na área de edição, e troque `ADMIN_SESSION_SECRET` por qualquer string aleatória grande (só precisa ser difícil de adivinhar).

Depois:

```bash
npm run dev
```

O site abre em `http://localhost:3000`.

## A fonte dos títulos

Os títulos ("A MARCA", "O DESIGNER" etc.) usam a fonte **Cabin Sketch**, do Google Fonts — free e com o alfabeto completo (maiúsculas, minúsculas, números, acentos, tudo).

A fonte que aparece no PDF original do portfólio (chamada internamente de "Anarchy") acabou não dando pra usar: ela é uma fonte shareware de outro criador (não é grátis de verdade), e a versão que veio embutida no PDF só tem o desenho de 16 letras maiúsculas liberado — o resto das letras está literalmente em branco dentro do arquivo. Foi por isso que "MICKAEL" apareceu sem o K e o L. Como não é uma fonte gratuita para uso comercial, a Cabin Sketch é a alternativa mais parecida no estilo (também é uma fonte "riscada"/sketch) que funciona 100% completa, sem nenhuma letra faltando em nenhum texto, nem nos que você digitar depois pelo painel `/admin`.

Se um dia vocês quiserem comprar a licença comercial da fonte original (Anarchy, do SnatchSoft, vendida no dafont.com) pra ficar pixel-perfeito com o PDF, é só: baixar o arquivo `.ttf` completo, colocar em `public/fonts/anarchy.ttf`, e no arquivo `app/layout.tsx` trocar o `Cabin_Sketch` por uma declaração de fonte local apontando pra esse arquivo. Mas isso é totalmente opcional — o site já funciona bem sem isso.

## Colocando no ar

```bash
npm run build
npm start
```

Isso sobe o site em modo produção. Se for hospedar em algum provedor (Vercel, Railway, VPS etc.), lembre de configurar as mesmas variáveis de ambiente (`ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`) lá também.

Um detalhe importante: as fotos e os textos ficam salvos em arquivos dentro do próprio servidor (`data/content.json` e `public/uploads`, além das fotos originais em `public/images`). Isso funciona liso em qualquer hospedagem que rode o Node continuamente (VPS, Railway, Render, um servidor próprio). Em hospedagens serverless como a Vercel no plano padrão, o sistema de arquivos é temporário e as alterações podem se perder depois de um tempo — nesse caso vale usar um serviço de storage (tipo Vercel Blob) ou rodar num servidor tradicional.

## Editando o conteúdo e as fotos

Acesse `/admin` (por exemplo `seusite.com/admin`), entre com a senha definida no `.env.local` e edite os textos e troque as fotos direto por lá, tanto pelo computador quanto pelo celular. Só quem tiver a senha consegue alterar — os visitantes do site só veem a página normal.

## Colocando os links de contato

Em `/admin`, na seção "O Contato", dá pra colocar:
- o link do Instagram
- o link do WhatsApp (formato `https://wa.me/55DDDNUMERO`, sem espaço ou traço)
- o e-mail

Esses mesmos dados também aparecem no botão "Falar no WhatsApp" do menu e no link da seção do Impacto.

## Estrutura

- `app/page.tsx` — página principal, monta todas as seções
- `app/admin/page.tsx` — painel de edição
- `components/` — cada seção do site (Capa, A Marca, O Designer, O Marco, Quem Veste, O Impacto, O Contato)
- `data/content.json` — onde ficam os textos (editável pelo painel ou na mão)
- `public/images/` — fotos originais do book, usadas como padrão
- `public/uploads/` — fotos novas enviadas pelo painel de edição
