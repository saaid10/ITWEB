import dotenv from 'dotenv';


// Set the env file
const result2 = dotenv.config({
    path: `./env/.env`,
});

if (result2.error) {
    throw result2.error;
}
