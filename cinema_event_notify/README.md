# CinemaEventNotify
This is a CEN(Cinema Event Notify) service crawling project.

## Used Skill
### cen_crawler_js
- JavaScript
```
selenium
ChromeDriver
mongodb
```

-----------------

### cec_crawler_py
- Python
```
selenium
ChromeDriverManager
tkinter
```

-----------------

### cen_db_pg
- MongoDB
```
mongodb
```

### cec_db_pg
- PostgreSQL
```
id INTEGER NOT NULL PRIMARY KEY,
cinema VARCHAR(15) NOT NULL,
groups VARCHAR(30) NOT NULL,
title TEXT NOT NULL,
dates DATE[],
dday INTEGER NOT NULL,
urls TEXT NOT NULL
```

****************************
#### Developer
* Deeklming