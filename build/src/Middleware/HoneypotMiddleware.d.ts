/// <reference types="@adonisjs/application/build/adonis-typings" />
/// <reference types="@adonisjs/http-server/build/adonis-typings" />
/// <reference types="@adonisjs/session" />
/// <reference types="@adonisjs/view" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export declare class HoneypotMiddleware {
    private app;
    private config;
    private states;
    constructor(app: ApplicationContract);
    private validateFields;
    handle({ request, response, session }: HttpContextContract, next: () => Promise<void>): Promise<void>;
}
