# firestore-backup-restore
Firestore Cloud simple tool for backup / restore

## Installation
`npm install`

## Usage
Start with:
```node index [options]```

** Note: In restore mode, selected collection will be emptied first **

Options:
* `backup` or `b` - Backup mode
* `restore` or `r` - Restore mode
* `--collection` or `-c` - Name of collection to backup / restore
* `--file` or `-f` - Name of the file to save / read json data

Example:

`node index backup -c col1 -f col1.json` will backup col1 into col1.json

`node index restore -c col1 -f col1.json` will restore col1 from col1.json
