const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Winston logger config

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to log all incoming requests

app.use((req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url} from IP ${req.ip}`);
    next();
});

// Middleware to validate and parse input

function validateInput(req, res, next) {
    const { num1, num2 } = req.query;

    if (num1 === undefined || num2 === undefined) {
        logger.error('Missing query parameters', { num1, num2 });
        return res.status(400).json({ error: 'Both num1 and num2 parameters are required' });
    }

    req.num1 = parseFloat(num1);
    req.num2 = parseFloat(num2);

    if (isNaN(req.num1) || isNaN(req.num2)) {
        logger.error('Invalid number format', { num1, num2 });
        return res.status(400).json({ error: 'Both num1 and num2 must be valid numbers' });
    }

    next();
}
// url - http://localhost:port/routename?num1=value&num2=value

// Routes

//Addition

app.get('/add', validateInput, (req, res) => {
    const result = req.num1 + req.num2;
    logger.info(`Addition: ${req.num1} + ${req.num2} = ${result}`);
    res.json({ result });
});

//Subtraction

app.get('/subtract', validateInput, (req, res) => {
    if (req.num1 < req.num2) {
        logger.error(`Subtraction error: num1 (${req.num1}) is less than num2 (${req.num2})`);
        return res.status(400).json({ error: 'Subtraction would result in a negative number. num1 must be greater than or equal to num2.' });
    }

    const result = req.num1 - req.num2;
    logger.info(`Subtraction: ${req.num1} - ${req.num2} = ${result}`);
    res.json({ result });
});

//Multiplication

app.get('/multiply', validateInput, (req, res) => {
    const result = req.num1 * req.num2;
    logger.info(`Multiplication: ${req.num1} * ${req.num2} = ${result}`);
    res.json({ result });
});

//Division

app.get('/divide', validateInput, (req, res) => {
    if (req.num2 === 0) {
        logger.error('Attempted division by zero');
        return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    const result = req.num1 / req.num2;
    logger.info(`Division: ${req.num1} / ${req.num2} = ${result}`);
    res.json({ result });
});

// 404 error handler
app.use((req, res) => {
    logger.warn(`Invalid endpoint accessed: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Invalid endpoint. Use /add, /subtract, /multiply, or /divide with num1 and num2 query parameters.' });
});

// Start server
app.listen(port, () => {
    logger.info(`Calculator microservice running on http://localhost:${port}`);
});

