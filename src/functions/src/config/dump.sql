/********** TABLES **********/

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    email_confirmation BOOLEAN,
    password VARCHAR(32),
    plan varchar(10),
    payment BOOLEAN,
    CONSTRAINT users_pk PRIMARY KEY (id)
);
 
CREATE TABLE cards (
    id SERIAL,
    users_fk INT,
    "name" varchar(20) UNIQUE,
    expiration_day INT,
    payment_day INT,
    "type" varchar(10),
    "status" VARCHAR(10),
    CONSTRAINT cards_pk PRIMARY KEY (id)
);

CREATE TABLE tokens (
    id SERIAL,
    users_fk INT,
    token_type varchar(10),
    date TIMESTAMP,
    token VARCHAR(36) UNIQUE,
    CONSTRAINT tokens_pk PRIMARY KEY (id)
);

CREATE TABLE categories (
    id SERIAL,
    users_fk INT,
    transaction_type varchar(20),
    name VARCHAR(100),
    CONSTRAINT categories_pk PRIMARY KEY (id),
    UNIQUE (users_fk, transaction_type, name)
);

CREATE TABLE subcategories (
    id SERIAL,
    categories_fk INT,
    costing varchar(10),
    name VARCHAR(100),
    CONSTRAINT subcategories_pk PRIMARY KEY (id),
    UNIQUE (categories_fk, name)
);

CREATE TABLE assets (
    id SERIAL,
    subcategories_fk INT,
    "name" VARCHAR(100),
    quantifiable BOOLEAN,
    CONSTRAINT assets_pk PRIMARY KEY (id),
    UNIQUE (subcategories_fk, name)
);

CREATE TABLE expenses (
    id SERIAL,
    subcategories_fk INT,
    value FLOAT,
    payment VARCHAR(10),
    installments INT,
    installment INT,
    cards_fk INT, 
    expense_root INT,
    expense_date TIMESTAMP,
    observation VARCHAR(100),
    date TIMESTAMP,
    CONSTRAINT expenses_pk PRIMARY KEY (id)
);

CREATE TABLE incomes (
    id SERIAL,
    subcategories_fk INT,
    "value" FLOAT,
    income_date TIMESTAMP,
    observation VARCHAR(100),
    "date" TIMESTAMP,
    CONSTRAINT incomes_pk PRIMARY KEY (id)
);

CREATE TABLE investiments (
    id SERIAL,
    assets_fk INT,
    quantity FLOAT,
    unitary_value FLOAT,
    total FLOAT,
    investiment_date TIMESTAMP,    
    observation VARCHAR(100),
    "date" TIMESTAMP,
    CONSTRAINT investiments_pk PRIMARY KEY (id)
);

CREATE TABLE redemptions (
    id SERIAL,
    assets_fk INT,
    quantity FLOAT,
    unitary_value FLOAT,
    total FLOAT,
    result FLOAT,
    redemption_date TIMESTAMP,
    observation VARCHAR(100),
    "date" TIMESTAMP,
    CONSTRAINT redemptions_pk PRIMARY KEY (id)
);

CREATE TABLE dividends (
    id SERIAL,
    assets_fk INT,
    "value" FLOAT,
    dividend_date TIMESTAMP,
    observation VARCHAR(100),
    "date" TIMESTAMP,
    CONSTRAINT dividends_pk PRIMARY KEY (id)
);

CREATE TABLE portfolios (
    id SERIAL,
    assets_fk INT,
    "value" FLOAT,
    updated_at TIMESTAMP,
    CONSTRAINT portfolios_pk PRIMARY KEY (id)
);

CREATE TABLE summary (
    id SERIAL,
    assets_fk INT,
    quantity FLOAT,
    average_price FLOAT,
    total FLOAT,
    last_update TIMESTAMP,
    CONSTRAINT summary_pk PRIMARY KEY (id)
);

CREATE TABLE settings (
    id SERIAL,
    users_fk INT,
    "name" VARCHAR(32),
    "value" BOOLEAN,
    CONSTRAINT settings_pk PRIMARY KEY (id)
);

CREATE TABLE logs (
    id SERIAL,
    users_fk INT,
    cards_fk INT,
    categories_fk INT,
    subcategories_fk INT,
    assets_fk INT,
    expenses_fk INT,
    incomes_fk INT,
    investiments_fk INT,
    redemptions_fk INT,
    dividends_fk INT,
    portfolios_fk INT,
    settings_fk INT,
    budgets_fk INT,
    "action" VARCHAR(10),
    previous_value VARCHAR(256),
    "value" VARCHAR(256),
    "date" TIMESTAMP,
    CONSTRAINT logs_pk PRIMARY KEY (id)
);

CREATE TABLE budgets (
    id SERIAL,
    users_fk INT,
    "type" VARCHAR(10),
    "value" FLOAT,
    CONSTRAINT budgets_pk PRIMARY KEY (id)
);

/********** FOREIGN KEY CONSTRAINTS **********/

ALTER TABLE cards ADD CONSTRAINT cards_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE tokens ADD CONSTRAINT tokens_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE categories ADD CONSTRAINT categories_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE subcategories ADD CONSTRAINT subcategories_categories_fk FOREIGN KEY (categories_fk) REFERENCES categories(id);

ALTER TABLE assets ADD CONSTRAINT assets_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);

ALTER TABLE expenses ADD CONSTRAINT expenses_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);
ALTER TABLE expenses ADD CONSTRAINT expenses_cards_fk FOREIGN KEY (cards_fk) REFERENCES cards(id);

ALTER TABLE incomes ADD CONSTRAINT incomes_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);

ALTER TABLE investiments ADD CONSTRAINT investiments_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);

ALTER TABLE redemptions ADD CONSTRAINT redemptions_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);

ALTER TABLE dividends ADD CONSTRAINT dividends_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);

ALTER TABLE portfolios ADD CONSTRAINT portfolios_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);

ALTER TABLE summary ADD CONSTRAINT summary_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);

ALTER TABLE settings ADD CONSTRAINT settings_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE budgets ADD CONSTRAINT budgets_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);

ALTER TABLE logs ADD CONSTRAINT logs_users_fk FOREIGN KEY (users_fk) REFERENCES users(id);
ALTER TABLE logs ADD CONSTRAINT logs_cards_fk FOREIGN KEY (cards_fk) REFERENCES cards(id);
ALTER TABLE logs ADD CONSTRAINT logs_categories_fk FOREIGN KEY (categories_fk) REFERENCES categories(id);
ALTER TABLE logs ADD CONSTRAINT logs_subcategories_fk FOREIGN KEY (subcategories_fk) REFERENCES subcategories(id);
ALTER TABLE logs ADD CONSTRAINT logs_assets_fk FOREIGN KEY (assets_fk) REFERENCES assets(id);
ALTER TABLE logs ADD CONSTRAINT logs_expenses_fk FOREIGN KEY (expenses_fk) REFERENCES expenses(id);
ALTER TABLE logs ADD CONSTRAINT logs_incomes_fk FOREIGN KEY (incomes_fk) REFERENCES incomes(id);
ALTER TABLE logs ADD CONSTRAINT logs_investiments_fk FOREIGN KEY (investiments_fk) REFERENCES investiments(id);
ALTER TABLE logs ADD CONSTRAINT logs_redemptions_fk FOREIGN KEY (redemptions_fk) REFERENCES redemptions(id);
ALTER TABLE logs ADD CONSTRAINT logs_dividends_fk FOREIGN KEY (dividends_fk) REFERENCES dividends(id);
ALTER TABLE logs ADD CONSTRAINT logs_portfolios_fk FOREIGN KEY (portfolios_fk) REFERENCES portfolios(id);
ALTER TABLE logs ADD CONSTRAINT logs_settings_fk FOREIGN KEY (settings_fk) REFERENCES settings(id);
ALTER TABLE logs ADD CONSTRAINT logs_budgets_fk FOREIGN KEY (budgets_fk) REFERENCES budgets(id);
