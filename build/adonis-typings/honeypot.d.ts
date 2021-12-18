declare module 'Jagr/Honeypot' {
    type HoneypotConfig = {
        fields: string[];
        flashOnFailure: boolean;
        flashMessage: string | null;
        flashKey: string | null;
        redirectOnFailure: boolean;
        redirectTo: string | null;
    };
}
