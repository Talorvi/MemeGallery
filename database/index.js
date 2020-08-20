import sequelize from 'sequelize';
const { Sequelize } = sequelize;
import Meme, {fields as memeFields} from './models/Meme.js'

export default class Database {
    constructor() {
        this.init();
    }

    connection = undefined;

    init() {
        this.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mariadb'
        });

        try {
            this.connection.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        this.initModels();
    }

    initModels() {
        try {
            this.initMemeModel();
        }
        catch (error) {
            console.error("There was a problem loading models:", error);
        }
    }

    initMemeModel() {
        Meme.init(memeFields, {
            sequelize: this.connection,
            modelName: 'Meme'
        });
        Meme.sync({ alter: true });
    }
}