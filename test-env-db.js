// Fake what Hyperdrive might put in process.env
process.env.DB = { connectionString: 'postgres://something' };
const connStr = process.env.DB || "fallback";
console.log(typeof connStr, connStr);
