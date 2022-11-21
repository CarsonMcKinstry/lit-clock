#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use rusqlite::{Connection, Result};
use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;
use serde_json;

#[derive(Serialize, Deserialize, Clone)]
struct Quote {
  time: String,
  time_string: String,
  quote: String,
  title: String,
  author: String
}

#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}!", name)
}

#[tauri::command]
fn get_time(time: &str) -> Quote {
  let mut conn = Connection::open("../quotes.db").expect("Unable to open connection");

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

  quotes.choose(&mut rand::thread_rng()).unwrap().clone()
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet])
      .invoke_handler(tauri::generate_handler![get_time])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}