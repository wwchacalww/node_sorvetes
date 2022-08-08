# NODE_BACKEND

Repositório para fins de estudo e suporte para o repositório wwchacalww/next_sorvetes

## Começo
- [X] Instalação do Express
- [X] Instalação do typescript
- [X] Instalação do JEST com SWC
  
## User
- [X] Criação da entidade user
- [x] Hash do password com bcrypt
- [X] uuid com a lib uuid
- [X] Tests unitário da entidade
- [X] Rotas para users

  ### Infra do user
  - [X] Criação da interface dos repositórios
  - [X] Criar repositórios
  - [X] Instalar o sequelize e o Sqlite3
  - [X] Testar tudo
  - [X] Criar rota
  - [X] Criar Controller
  - [X] Criar Injeção de dependência
  
## Notificação de errors
  - [X] Notificação de errors no rest

## Autenticação e Autorização
- [X] Criação do middleware de autenticação
- [X] Refatorar routa com middleare
- [X] Criação do middleware de autorização
- [X] Criação do refreshToken - rotas, controller e usecase

## Docker - Postgres
- [X] Criar Dockerfile e dockercompose.yaml
- [X] Desinstalar o sequelize e trocar pelo prisma
- [X] Instalar o Prisma
- [X] Criar migrations do DB

## Produtos
- [X] Criar entidade
- [X] Testes unitários
- [X] Criar interface do repositório
- [X] Criar migration e tabela product
- [X] Criar repositório
- [X] Criar usecase
- [X] Criar Controllhers
- [X] Criar rotas

## Valor
- [X] Criar entidade Prices
- [X] Refatorar entidade Product
- [X] Testes unitários
- [X] Criar tabela e relacionamento no DB
- [X] Criar interface do repositório
- [X] Refatorar ProductRepository para listar os valores
- [X] Criar repositório
- [X] Criar usecase
- [X] Criar Controllhers
- [X] Criar rotas

## Fluxo de Produtos
  - ## Itens
    - [X] Criar entidade Itens
    - [X] Testes unitários
    - [X] Criar o migration
    - [ ] Criar o usecase
  - ## Estoque
    - [X] Criar entidade Itens
    - [X] Testes unitários
    - [X] Criar o migration
    - [ ] Criar o usecase
  - ## Fluxo do Estoque
    - [X] Criar entidate Order-Itens
    - [X] Testes unitários
    - [X] Criar o migration
    - [ ] Criar o usecase
      - [X] Buy-items-order.usecase - comprar de items add items no stock
        - [X] Verifica se já existe order de comprar na mesma data
        - [X] Atualizar status do stock do dia anterior
        - [X] Somente administrador poder fazer essa operação
        - [X] Pode fazer várias compras no mesmo dia
        - [X] Só existe 1 registro de stock no mesmo dia
      - [ ] 