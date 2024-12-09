## Descrição

## Run tests

```bash
# unit tests
npm run test
```


## Configuração do projeto usando docker: 

1. Clonar projeto [FrontEnd](https://github.com/nalberthy/manage-vehicle-app).
2. Clonar projeto [BackEnd](https://github.com/nalberthy/manage-vehicle-api).
3. Instalar dependencias em ambos projetos: ```npm install```.
4. Organize as pastas conforme a estrutura representada abaixo:

![image](https://github.com/user-attachments/assets/99e3f867-1960-4bd8-9df5-87a2c160d706).

5. Faça download do arquivo docker-compose e adicione na pasta dos projetos, conforme representado na imagem acima: <a href="https://github.com/nalberthy/manage-vehicle-api/blob/master/docker/docker-compose.yml" download>Click to Download</a>.
6. Executar ```docker-compose up``` para criar os containers.

Projeto criado com as versões abaixo:
* Node Version: 20.18.0
* Docker Engine Version: 27.2.0


## Configuração do projeto Local (API):
Comentar uso da variável de ambiente DATABASE_URL usando docker e descomentar variavel de uso local.
1. Executar comando para aplicar migração de criação da base de dados usando prisma:
```npx prisma migrate deploy```

2. Gerar client atualizado para uso:
```npx prisma generate```

3. Executar aplicação:
```npm run start:dev```


## Collection usada para testes da api usando Insomnia
<a href="https://github.com/nalberthy/manage-vehicle-api/blob/master/collection/manage-vehicle-insominia.json" download>Click to Download</a>.
