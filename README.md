💡 **Projeto Aula+ – Sistema de Gestão Acadêmica** 🎓

🧾 **Descrição**
O **Aula+** foi desenvolvido com o objetivo de **aprimorar minhas habilidades em desenvolvimento web fullstack**, aplicando conceitos de **arquitetura baseada em API REST**, **componentes dinâmicos** e **integração entre frontend e backend**.

O sistema é voltado para **professores**, oferecendo uma interface completa para **gerenciamento de turmas, alunos e controle de frequência**, promovendo uma experiência fluida e profissional no ambiente acadêmico.

---

🧩 **Funcionalidades**

🔧 **Backend (API REST)**
Criação de uma API RESTful com **Node.js** e **Express** para realizar operações CRUD e integrações com o banco de dados **MySQL**.

Operações e rotas disponíveis:

* **/auth** → Autenticação de professores credênciados.
* **/enrollclass** → Criação de turma.
* **/fetchclass** → Consulta de turmas.
* **/removeclass/:id_classe** → Remoção de turma específica.
* **/togglestatus** → Alternância de status de turma.
* **/fetchinfoclass** → Consulta de informações de classe.
* **/editclass/:id** → Edição de informações de classe específica.
* **/frequency** → Registro e ajuste em formato JSON de frequência.
* **/getfrequency** → Consulta detalhada de frequência por data.
* **/addstudentclass** → Adição de aluno em classe.
* **/removestudentclass** → Remoção de aluno de classe.
* **/fetchstudents** → Consulta de todos os alunos da instituição.
* **/searchstudents** → Consulta por pesquisa.
* **/studentsinclass** → Consulta de alunos em classe.


Destaques:

* Armazenamento de dados em formato **JSON** para organização de informações por **dia da semana** e **data**.
* Controle de **autenticação**, permitindo acesso apenas a **professores credenciados**.

💻 **Frontend**
Ambiente do Professor:

* Criação e gerenciamento completo de **turmas e alunos**.
* Definição do **formato da aula** (EAD, Presencial ou Híbrido).
* Interface reativa com **atualização automática** após alterações nas turmas.
* Exibição dinâmica de alunos com **frequência registrada ou pendente**.

Ambiente de Frequência:

* Registro detalhado com horário, presença (true/false) e justificativas.
* Leitura e manipulação dos dados armazenados em JSON conforme o dia consultado.

---

🛠️ **Tecnologias Utilizadas**

**Backend:**

* Node.js
* Express.js
* MySQL
* XAMPP (ambiente local)

**Frontend:**

* JavaScript
* Axios
* HTML5
* CSS3 + Sass

**Arquitetura:**

* API REST
* Componentes Dinâmicos

---

🚀 **Diferenciais do Projeto**
🔄 Comunicação em tempo real entre **frontend e backend** via Axios.
🗄️ Banco de dados **relacional e seguro**, garantindo integridade dos dados acadêmicos.
📱 Interface **responsiva e intuitiva**, com foco na usabilidade do professor.
⚙️ Sistema **modular e escalável**, preparado para futuras implementações como notas, relatórios e dashboards.

---

💬 Este projeto representa minha capacidade de **desenvolver soluções web completas**, integrando **backend e frontend** com foco em **performance, organização e experiência do usuário** no ambiente educacional.

#FullstackDeveloper #NodeJS #Express #MySQL #JavaScript #Axios #Sass #APIREST #GestãoAcadêmica #AulaPlus #DevJourney
