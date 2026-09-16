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

Os títulos ("A MARCA", "O DESIGNER" etc.) usam a fonte **Anarchy**, de SnatchSoft — e ela é sim gratuita. O que rolou foi o seguinte: o arquivo que veio embutido dentro do PDF do portfólio está incompleto (faltam letras, coisa de exportação do Canva), mas a fonte original **completa** é grátis e está disponível direto na fonte oficial:

1. Baixe em `https://www.dafont.com/anarchy.font` (clique em "Download")
2. Extraia o zip baixado e pegue o arquivo `Anarchy.ttf` de dentro
3. Coloque em `public/fonts/anarchy.ttf` (substituindo se já existir algo ali)

Assim que colocar o arquivo, salva, reinicia o `npm run dev`, e os títulos passam a usar a fonte de verdade, completa — incluindo "MICKAEL RAMOS" e qualquer nome novo que vocês editarem depois.

Enquanto esse arquivo não estiver na pasta, o site usa uma fonte bem parecida (Cabin Sketch) no lugar, então nada quebra — é só uma diferença visual sutil até vocês colocarem o arquivo certo.

Um detalhe: fontes desse tipo (grunge/trash antigas do dafont) geralmente não incluem números nem letras acentuadas (á, ã, ç etc.) — só o alfabeto básico A-Z e a-z. Isso não afeta nada do que já está no site hoje, mas se um dia editarem um texto com acento ou número numa área que usa essa fonte, essa letra específica vai cair automaticamente na fonte alternativa (Cabin Sketch), sem quebrar nada.

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
- `public/fonts/` — onde entra o arquivo da fonte Anarchy
