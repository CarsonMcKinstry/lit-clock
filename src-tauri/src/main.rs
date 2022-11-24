#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod quote;
mod settings;

use quote::{get_time};
use settings::{Settings, open_settings, get_settings, update_settings};

fn main() {
  open_settings().unwrap();

  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![get_time, get_settings, update_settings])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}