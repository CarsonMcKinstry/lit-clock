use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;

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