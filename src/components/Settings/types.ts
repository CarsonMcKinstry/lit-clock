export interface Settings {
    dark_mode: boolean;
    updateSettings: (
        settings: Omit<Settings, 'updateSettings'>
    ) => Promise<void>;
}
