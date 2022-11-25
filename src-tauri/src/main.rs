#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod quote;
mod settings;

use quote::{get_time};
use settings::{get_settings, update_settings};

fn main() {



  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
        get_time,
        get_settings,
        update_settings
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}