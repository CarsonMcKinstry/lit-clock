export interface Settings {
    id: string;
    dark_mode: boolean;
    updateSettings: (
        settings: Omit<Settings, 'updateSettings'>
    ) => Promise<void>;
}
