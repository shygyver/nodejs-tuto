export { };

declare global {
    namespace AppTypes {
        interface User {
            email: string;
            username: string;
            password: string;
        }
        interface Session {
            token?: string;
            user?: Partial<User>;
        }
    }

    namespace Express {
        interface Request {
            session?: AppTypes.Session;

            /**
             * Decoded jwt
             */
            auth?: unknown;
        }
    }
}