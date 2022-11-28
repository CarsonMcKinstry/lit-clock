use rusqlite;
use rusqlite::params;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Settings {
    pub dark_mode: bool,
}

struct SettingsConnection {
    conn: rusqlite::Connection
}

impl <'a> SettingsConnection {

    const DB_LOCATION : &'a str = "../settings.db";

    const CREATE_TABLE: &'a str = "
        CREATE TABLE IF NOT EXISTS settings (
            id        INTEGER PRIMARY KEY DEFAULT 1,
            dark_mode INTEGER DEFAULT FALSE
        );
    ";

    const GET_SETTINGS: &'a str = "
        SELECT * FROM settings WHERE id = 1;
    ";

    const INIT_SETTINGS: &'a str = "
        INSERT INTO settings (dark_mode) values (FALSE);
    ";

    const UPDATE_SETTINGS: &'a str = "
        UPDATE settings
            SET dark_mode = ?
        WHERE id = 1;
    ";

    pub fn open() -> Self {
        let conn = rusqlite::Connection::open(Self::DB_LOCATION).expect("Failed to open settings database connection");

        let mut s = Self {
            conn
        };

        s.init_settings().expect("Failed to initialize database");

        return s;
    }

    fn init_settings(&mut self) -> rusqlite::Result<()> {
        self.conn.execute(
            Self::CREATE_TABLE,
            ()
        )?;

        let mut stmt = self.conn.prepare(Self::GET_SETTINGS)?;

        let exists = stmt.exists(())?;

        match exists {
            true => Ok(()),
            false => {
                self.conn.execute(Self::INIT_SETTINGS, ()).map(|_| ())
            }
        }
    }


    pub fn get_settings(&mut self) -> Settings {
        let mut stmt = self.conn.prepare(Self::GET_SETTINGS).unwrap();

        let mut rows = stmt.query(())
            .unwrap();

        let settings = rows
            .next()
            .unwrap()
            .unwrap();

        let dark_mode: bool = settings.get(1).unwrap();

        Settings {
            dark_mode,
        }
    }


    pub fn update_settings(&mut self, settings: Settings) -> bool {
        let mut stmt = self.conn.prepare(Self::UPDATE_SETTINGS).unwrap();

        let updated = stmt.execute(
            params![
                settings.dark_mode
            ]
        );

        match updated {
            Ok(n) => {
                println!("Update {} rows", n);
                true
            },
            Err(err) => {
                println!("Failed to update settings {:?}", err);
                false
            }
        }
    }
}

#[tauri::command]
pub fn get_settings() -> Settings {
    let mut settings_connection = SettingsConnection::open();

    settings_connection.get_settings()
}

#[tauri::command]
pub fn update_settings(settings: Settings) -> Settings {
    let mut settings_connection = SettingsConnection::open();

    settings_connection.update_settings(settings);
    settings_connection.get_settings()
}