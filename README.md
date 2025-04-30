# **Meu App de Agenda e Feriados**

Este aplicativo foi desenvolvido para ajudar os usuários a organizar suas tarefas e visualizar os próximos feriados no Brasil. O aplicativo consiste em três telas principais: **Home**, **Agenda** e **Feriados**. Abaixo, você encontrará a descrição de cada página, suas funcionalidades e as APIs utilizadas.

## **Índice**
1. [Home](#home)
2. [Agenda](#agenda)
3. [Feriados](#feriados)

---

## **Home**
A tela **Home** é a tela inicial do aplicativo. Nela, o usuário pode visualizar informações gerais sobre sua conta, como o nome do usuário (caso esteja autenticado). Caso o usuário não esteja logado, ele será redirecionado para a tela de login.

### **Funcionalidades:**
- Exibe o nome do usuário que está logado (se autenticado).
- Se o usuário não estiver logado, uma mensagem será exibida pedindo para fazer login.
- O design da página é simples, com fundo escuro e texto branco.

### **API/Serviços Utilizados:**
- **AsyncStorage**: Para salvar e recuperar informações do usuário (como o token de autenticação) entre sessões.

---

## **Agenda**
A tela **Agenda** permite ao usuário ver suas tarefas para um dia específico e adicionar novas tarefas à medida que são planejadas. Esta página usa o calendário interativo para selecionar um dia e exibir as tarefas atribuídas a essa data.

### **Funcionalidades:**
- O usuário pode visualizar suas tarefas de um dia específico.
- O calendário é interativo, permitindo a seleção de uma data.
- O usuário pode adicionar tarefas para o dia selecionado.
- Exibe as tarefas para o dia atual por padrão, mas permite selecionar outras datas.
- As tarefas são listadas com a descrição do que precisa ser feito e se foram ou não completadas.

### **Componentes Utilizados:**
- **react-native-calendars**: Para implementar o calendário interativo.
- **AsyncStorage**: Para salvar as tarefas em cada dia.
  
### **API/Serviços Utilizados:**
- **AsyncStorage**: Utilizado para armazenar as tarefas dos usuários localmente. Quando o usuário adiciona uma tarefa para um dia, ela é salva no armazenamento local.
  
### **Fluxo:**
- O usuário seleciona uma data no calendário.
- As tarefas relacionadas àquela data são exibidas.
- O usuário pode adicionar novas tarefas, que são salvas localmente.

---

## **Feriados**
A tela **Feriados** mostra os próximos feriados públicos no Brasil para o ano atual. A informação é obtida de uma API externa que fornece dados sobre feriados nacionais.

### **Funcionalidades:**
- Exibe uma lista de feriados futuros no Brasil.
- A API é chamada para obter os feriados do ano atual.
- Cada item na lista mostra a data do feriado e o nome local.
- Caso não haja feriados disponíveis, uma mensagem informativa é exibida.
  
### **API/Serviços Utilizados:**
- **Nager.Date API**: A API `https://date.nager.at/api/v3/PublicHolidays` é utilizada para obter os feriados públicos no Brasil do ano atual. A resposta contém o nome do feriado e sua data.
  
### **Fluxo:**
- A API é chamada para obter todos os feriados do ano atual.
- Feriados passados são filtrados para mostrar apenas os próximos feriados.
- Caso a API não retorne feriados ou haja erro, uma mensagem de erro é exibida.

---

## **Tecnologias Utilizadas:**

- **React Native**: Framework principal para desenvolvimento mobile.
- **Expo Router**: Usado para navegação entre as páginas.
- **AsyncStorage**: Usado para armazenar dados do usuário e tarefas localmente.
- **Ionicons**: Biblioteca de ícones usada na navegação e interface.
- **react-native-calendars**: Para a implementação do calendário interativo na tela de agenda.
- **Nager.Date API**: API externa para consultar os feriados públicos do Brasil.

---

## **Fluxo do App**:
1. **Login (não implementado neste README)**: O usuário deve estar autenticado para acessar as funcionalidades.
2. **Home**: Tela inicial com informações sobre o usuário.
3. **Agenda**: O usuário pode visualizar e adicionar tarefas para um dia específico.
4. **Feriados**: A página exibe os próximos feriados no Brasil, com uma integração externa via API.

---

### **Conclusão**
Este aplicativo fornece uma interface simples e funcional para gerenciar tarefas diárias e visualizar os próximos feriados. Ele usa **React Native** e diversas bibliotecas populares para facilitar a navegação e melhorar a experiência do usuário. O armazenamento local (via **AsyncStorage**) é utilizado para salvar as informações, tornando o uso do aplicativo eficiente e sem depender de uma conexão constante com a internet.
