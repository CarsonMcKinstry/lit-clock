use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;
use rusqlite::Connection;

const MISSING_QUOTE_TEMPLATES: &'static [&'static str] = &[
    "It's said that we didn't have a quote for {}.",
    "Oops! Looks like it's {}, but we don't have quote for that.",
    "{}. Nuff said.",
    "It's {}.",
    "Shit! It's {}. Are you sure we aren't late for something?"
];

#[derive(Serialize, Deserialize, Clone)]
pub struct Quote {
    pub time: String,
    pub time_string: String,
    pub quote: String,
    pub title: String,
    pub author: String
}

impl Quote {
    pub fn from_missing(time: &str) -> Self {
        let template = MISSING_QUOTE_TEMPLATES.choose(&mut rand::thread_rng()).unwrap();

        Self {
            time: String::from(time),
            time_string: String::from(time),
            quote: template.replace("{}", time),
            title: String::from("My Brain"),
            author: String::from("Carson")
        }
    }
}

#[tauri::command]
pub fn get_time(time: &str) -> Quote {
    let conn = Connection::open("../quotes.db").expect("Unable to open connection");

    let mut stmt = conn.prepare(
        "SELECT * FROM quotes WHERE time = ?1"
    ).expect("Failed to prepare statement");

    let quotes = stmt.query_map(&[time], |row| {
        Ok(
            Quote {
                time: row.get(0)?,
                time_string: row.get(1)?,
                quote: row.get(2)?,
                title: row.get(3)?,
                author: row.get(4)?
            }
        )
    }).unwrap();

    let quotes = quotes
        .into_iter()
        .filter_map(|q| q.ok())
        .collect::<Vec<Quote>>();

    quotes.choose(&mut rand::thread_rng()).unwrap_or(&Quote::from_missing(time)).clone()
}
