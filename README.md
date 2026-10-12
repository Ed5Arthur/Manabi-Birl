# Treino da Bia

Treino de calistenia de segunda a sexta, feito pra abrir no celular e instalar como app.

## O que tem

- Treino de cada dia com checklist, que zera sozinho no dia seguinte
- Sequência de dias de treino (sábado e domingo não quebram)
- Carga editável nos exercícios com halter
- Duas fases: semanas 1 e 2, e semana 3 em diante
- Timer de descanso
- Opção de baixar como app e funcionamento sem internet

## Como publicar no GitHub Pages

1. No GitHub, crie um repositório público (por exemplo, `treino-bia`).
2. Toque em **Add file → Upload files** e envie todos os arquivos desta pasta, soltos, sem pasta em volta.
3. Vá em **Settings → Pages**. Em **Build and deployment**, escolha **Deploy from a branch**, a branch **main** e a pasta **/ (root)**, e salve.
4. Depois de 1 ou 2 minutos, o site fica em `https://SEU-USUARIO.github.io/treino-bia/`.

## Como atualizar

Envie o `index.html` novo por cima do antigo. Se mudar o `sw.js`, troque a versão do cache (`treino-bia-v1` vira `treino-bia-v2`) pra os celulares pegarem a atualização.

## Arquivos

- `index.html`: o app inteiro
- `manifest.json`: nome, cores e ícones do app instalado
- `sw.js`: faz o app funcionar sem internet
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`: ícones

Os dados (checklist, sequência e cargas) ficam salvos só no celular de quem usa. No iPhone, o app instalado e o Safari guardam os dados separados, então depois de instalar o ideal é usar sempre pelo ícone.
