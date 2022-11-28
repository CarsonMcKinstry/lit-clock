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

struct QuotesConnection {
    conn: rusqlite::Connection
}

impl<'a> QuotesConnection {
    const DB_LOCATION: &'a str = "../quotes.db";

    const GET_TIME: &'a str = "
        SELECT * FROM quotes
        WHERE time = ?1;
    ";

    pub fn open() -> Self {
        let conn = rusqlite::Connection::open(Self::DB_LOCATION).expect("Failed to open quotes database connection");

        Self {
            conn
        }
    }

    pub fn get_time(&mut self, time: &str) -> Quote {
        let mut stmt = self.conn.prepare(Self::GET_TIME).expect("Failed to prepare get time statement");

        let quotes = stmt.query_map(&[time], |row| {
            Ok(
                Quote {
                    time: row.get(0)?,
                    time_string: row.get(1)?,
                    quote: row.get(2)?,
                    title: row.get(3)?,
                    author: row.get(4)?,
                }
            )
        }).unwrap();

        let quotes = quotes
            .into_iter()
            .filter_map(|q| q.ok())
            .collect::<Vec<Quote>>();

        let quote = quotes.choose(&mut rand::thread_rng());

        match quote {
            Some(q) => q.clone(),
            None => Quote::from_missing(time)
        }
    }
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
    let mut quotes_connection = QuotesConnection::open();

    quotes_connection.get_time(time)
}
