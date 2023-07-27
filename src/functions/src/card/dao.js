const db = require('../config/database');

exports.selectCardByNameDAO = async ({ id, name, user_id }) => {
  const response = await db.query(
    `
      SELECT 
        name
      FROM
        cards
      WHERE 
        name = $1 and 
        users_fk = $2
        ${id ? `and id != ${id}` : ''}
    `,
    [name, user_id]
  );
  return !response.rows.length;
};

exports.selectCardByIdDAO = async ({ id, user_id }) => {
  const response = await db.query(
    `
      SELECT 
        *
      FROM
        cards
      WHERE 
        id = $1 and 
        users_fk = $2
    `,
    [id, user_id]
  );
  return response;
};

exports.selectCardsDAO = async ({ user_id }) => {
  const response = await db.query('SELECT id, name, expiration_day, payment_day, type FROM cards WHERE users_fk = $1 ORDER BY id', [user_id]);
  return response.rows;
};

exports.insertCardDAO = async ({ name, expiration_day, payment_day, type, user_id, status }) => {
  const response = await db.query('INSERT INTO cards (name, expiration_day, payment_day, type, users_fk, status) VALUES ($1, $2, $3, $4, $5, $6)', [
    name,
    expiration_day,
    payment_day,
    type,
    user_id,
    status,
  ]);
  return response;
};

exports.updateCardDAO = async ({ id, card, user_id }) => {
  const response = await db.query(
    `UPDATE cards
    SET name = $1,
      expiration_day = $2,
      payment_day = $3,
      type = $4,
      status = $5
    WHERE users_fk = $6
      and id = $7`,
    [card.name, card.expirationDay, card.paymentDay, card.type, card.status, user_id, id]
  );
  return response;
};

exports.deleteCardDAO = async ({ id, user_id }) => {
  const response = await db.query(
    `
      DELETE FROM cards
      WHERE users_fk = $1
        and id = $2
    `,
    [user_id, id]
  );
  return response;
};
