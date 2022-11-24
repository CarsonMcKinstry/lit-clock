use rusqlite::{Connection, Result, params};
use serde::{Serialize, Deserialize};

const SETTINGS_DB: &str = "../settings.db";

const DB_OPEN: &str = "
    CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        dark_mode INTEGER DEFAULT 0
    );
";

#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    pub dark_mode: bool,
}

pub fn open_settings() -> Result<()> {
    let conn = Connection::open(SETTINGS_DB).expect("Unable to open settings");

    conn.execute(
        DB_OPEN,
        (),
    )?;

    let mut stmt = conn.prepare("SELECT * FROM settings WHERE id = 1;")?;

    let mut settings_iter = stmt.query_map([], |row| {
        Ok(
            Settings {
                dark_mode: row.get::<usize, bool>(1)?
            }
        )
    })?.take(1);

    match settings_iter.next() {
        None => {
            conn.execute(
                "INSERT INTO settings (dark_mode) VALUES (0);",
                (),
            ).expect("Unable to create settings");
        }
        Some(s) => {
            println!("Settings already exist {:?}", s);
        }
    };

    Ok(())
}

#[tauri::command]
pub fn get_settings() -> Settings {
    let conn = Connection::open(SETTINGS_DB).expect("Unable to open settings");

    let mut stmt = conn.prepare("SELECT * FROM settings WHERE id = 1;").unwrap();

    let mut settings_iter = stmt.query_map([], |row| {
        Ok(
            Settings {
                dark_mode: row.get::<usize, bool>(1).unwrap()
            }
        )
    }).unwrap().take(1);

    let s = settings_iter.next().unwrap().unwrap_or(Settings {
        dark_mode: false
    });

    s
}

#[tauri::command]
pub fn update_settings(settings: Settings) -> Settings {
    let conn = Connection::open(SETTINGS_DB).expect("Unable to open settings");

    let mut stmt = conn.prepare("
     UPDATE settings
        SET dark_mode = ?
     WHERE id = 1;
    ").unwrap();

    println!("Before update {:?}", settings);

    let new_value: i32 = match settings.dark_mode {
        true => 1,
        false => 0
    };

    let updated = stmt.execute(
        params![
            new_value
        ]
    );

    match updated {
        Ok(n) => {
            println!("Updated {:?}", n);

            let s = get_settings();

            println!("Updated {:?}", s);
        }
        Err(err) => println!("Upsala {}", err)
    }

    settings
}