Claro! Aqui está o **README.md** completo para você copiar e colar no GitHub:

````markdown
# ⏳ Temporizador Pomodoro

Um elegante e funcional **temporizador Pomodoro** construído com **HTML**, **CSS (Tailwind)**, **JavaScript** e com alertas sonoros usando **Tone.js**.

## 🧠 Sobre o Projeto

Este projeto foi criado com o objetivo de melhorar a produtividade através da técnica Pomodoro, oferecendo uma experiência intuitiva, responsiva e personalizável.

Com foco em design limpo e usabilidade, permite alternar facilmente entre os modos de **foco** e **pausa**, configurar tempos personalizados e acompanhar o progresso com uma barra circular animada.

---

---

## ⚙️ Funcionalidades

- ✅ Alternar entre **Modo Foco** e **Modo Pausa**
- ✅ Contagem regressiva com **display digital**
- ✅ Barra de progresso circular com animação
- ✅ Som de notificação ao fim de cada ciclo (usando Tone.js)
- ✅ Botões de **iniciar**, **pausar**, **continuar** e **resetar**
- ✅ Configurações para definir o tempo de foco e pausa (de 1 a 90 minutos)
- ✅ Interface moderna e responsiva com **Tailwind CSS**
- ✅ Título da aba do navegador atualiza com o tempo restante

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **Tailwind CSS**
- **JavaScript Puro (Vanilla JS)**
- **Tone.js** – para sons de notificação
- **Google Fonts (Inter)**

---

## ▶️ Como Usar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. **Abra o arquivo `index.html` em um navegador** moderno (recomenda-se Chrome ou Firefox).

3. **Configure os tempos** de foco e pausa conforme desejado.

4. Clique em **Iniciar** para começar a contagem regressiva.

---

## 🔊 Permissão de Áudio

Ao clicar em "Iniciar", o navegador solicitará permissão para ativar o som. Isso é necessário para que os alertas sonoros funcionem corretamente com o Tone.js.

---

## 📁 Estrutura do Projeto

```
├── index.html        # Estrutura principal da interface
├── style.css         # Estilos personalizados (complementares ao Tailwind)
├── script.js         # Lógica completa do temporizador
```

---

## ✨ Personalização

- Você pode alterar os tons das notificações modificando as notas em `script.js`:
  ```js
  synth.triggerAttackRelease('C5', '8n', now);
  synth.triggerAttackRelease('G5', '8n', now + 0.2);
  ```
- Para mudar o visual (ex: cores dos modos), edite as classes do Tailwind diretamente no `index.html`.

---

## 📌 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 🙌 Créditos

Desenvolvido por **[felipe](https://github.com/FelipeCJ07)**.  
Inspirado pela técnica Pomodoro para gestão de tempo e foco pessoal.

---
````


