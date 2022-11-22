#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod quote;

use rusqlite::Connection;
use rand::seq::SliceRandom;
use quote::Quote;

#[tauri::command]
fn get_time(time: &str) -> Quote {
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

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![get_time])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}