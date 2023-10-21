const functions = require('@google-cloud/functions-framework');
const md5 = require('md5');

exports.matchFinanceiroAPI = (req, res) => {
  const httpCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ERROR: 500,
  };
  
  const httpMessage = {
    ERROR: 'Aconteceu algum erro inesperado, tente novamente mais tarde',
    UNAUTHORIZED: 'Sessão inválida',
  };

  async function convertStringToMD5 ({string}) {
    return md5({string});
  };

  const routes = {
    GET: {
      '/api/ping': (req, res) => {
        res.status(200).send({
          message: 'pong!',
        });
      }
    },
    POST: {
      '/api/register': async (req, res) => {
        const { name, email, password } = req.body;

        async function selectUserByEmailDAO ({ email }) {
          const response = await db.query('SELECT * FROM users WHERE email = $1', [email]);
          return !response.rows.length;
        };

        async function insertUserDAO ({ name, email, password }) {
          const response = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
          return response;
        };

        async function createUserModel ({ name, email, password }) {
          let code = httpCode.ERROR;
          let message = httpMessage.ERROR;
        
          const verifyEmail = await selectUserByEmailDAO({ email });
          if (!verifyEmail) {
            code = httpCode.BAD_REQUEST;
            message = 'Já existe um cadastro com o email informado';
            return { code, message };
          }
        
          if (!name) {
            code = httpCode.BAD_REQUEST;
            message = 'É necessário informar o nome';
            return { code, message };
          }
          if (!email) {
            code = httpCode.BAD_REQUEST;
            message = 'É necessário informar o email';
            return { code, message };
          }
        
          const createUser = await insertUserDAO({
            name,
            email,
            password: await convertStringToMD5({ string: password }),
          });
          if (createUser) {
            code = httpCode.CREATED;
            message = 'Cadastro efetuado com sucesso!';
            return { code, message };
          }
        
          return { code, message };
        };

        try {
          const { code, message } = await createUserModel({
            name,
            email,
            password,
          });
          res.status(code).send({ code, message });
        } catch (error) {
          res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
        }
      }
    },
    PUT: {

    },
    DELETE: {

    }
  }
  if (routes[req.method] && routes[req.method][req.path]) { // req.baseUrl
    return routes[req.method][req.path](req, res);
  }

  res.status(404).send({
    error: `${req.method}: '${req.path}' not found`
  });
}