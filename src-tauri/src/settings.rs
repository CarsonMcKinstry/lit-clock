use rusqlite::{Connection, Result};
use serde::{Serialize, Deserialize};

const SETTINGS_DB: &str = "../settings.db";

const DB_OPEN: &str = "
    CREATE TABLE IF NOT EXISTS settings (
        dark_mode INTEGER DEFAULT FALSE
    );
";

#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    dark_mode: bool
}

pub fn open_settings() -> Result<()> {
    let conn = Connection::open(SETTINGS_DB).expect("Unable to open settings");

    conn.execute(
        DB_OPEN,
        (),
    )?;

    let mut stmt = conn.prepare("SELECT * FROM settings;")?;

    let mut settings_iter = stmt.query_map([], |row| {
        Ok(
            Settings {
                dark_mode: !!row.get(0)?
            }
        )
    })?.take(1);

    match settings_iter.next() {
        None => {
            conn.execute(
                "INSERT INTO settings (dark_mode) VALUES (FALSE);",
                ()
            ).expect("Unable to create settings");
        }
        _ => {}
    };

    Ok(())
}

#[tauri::command]
pub fn get_settings() -> Settings {
    let conn = Connection::open(SETTINGS_DB).expect("Unable to open settings");

    let mut stmt = conn.prepare("SELECT * FROM settings;").unwrap();

    let mut settings_iter = stmt.query_map([], |row| {
        Ok(
            Settings {
                dark_mode: row.get::<usize, i32>(0).map(|i| match i {
                    0 => false,
                    _ => true
                }).unwrap()
            }
        )
    }).unwrap().take(1);

    settings_iter.next().unwrap().unwrap_or(Settings {
        dark_mode: false
    })
}